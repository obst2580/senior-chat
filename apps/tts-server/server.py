"""Qwen3 TTS Server for Senior Chat - serves audio on POST /tts"""

import io
import re
import time
import numpy as np
import torch
import soundfile as sf
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI()

device = "mps" if torch.backends.mps.is_available() else "cpu"
print(f"Using device: {device}")

print("Loading Qwen3 TTS model...")
start = time.time()

from qwen_tts import Qwen3TTSModel

model = Qwen3TTSModel.from_pretrained(
    "Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign",
    device_map=device,
    dtype=torch.float16,
)
print(f"Model loaded in {time.time() - start:.1f}s")

VOICE_INSTRUCT = (
    "A warm, gentle Korean female voice in her 20s, "
    "speaking slowly and clearly with a caring tone"
)

# Split on sentence-ending punctuation (Korean/English)
SENTENCE_SPLIT = re.compile(r'(?<=[.!?。~])\s*|(?<=요[.!?\s])|(?<=요\s)|(?<=다[.!?\s])|(?<=다\s)')


def pick_first_sentences(text: str, max_sentences: int = 2, max_chars: int = 80) -> str:
    """Extract first N sentences, capped at max_chars."""
    sentences = [s.strip() for s in SENTENCE_SPLIT.split(text) if s.strip()]
    result = ""
    for i, s in enumerate(sentences):
        if i >= max_sentences:
            break
        candidate = (result + " " + s).strip() if result else s
        if len(candidate) > max_chars:
            break
        result = candidate
    return result or text[:max_chars]


def normalize_audio(wav: np.ndarray) -> np.ndarray:
    """Normalize audio to prevent volume decay."""
    peak = np.max(np.abs(wav))
    if peak > 0:
        return (wav / peak * 0.9).astype(wav.dtype)
    return wav


class TtsRequest(BaseModel):
    text: str


@app.post("/tts")
async def generate_tts(req: TtsRequest):
    text = req.text.strip()
    if not text:
        return {"error": "text is required"}

    # Keep only first 2 sentences for speed
    text = pick_first_sentences(text, max_sentences=2, max_chars=80)

    t0 = time.time()
    wavs, sr = model.generate_voice_design(
        text=text,
        language="Korean",
        instruct=VOICE_INSTRUCT,
    )
    elapsed = time.time() - t0

    audio = normalize_audio(wavs[0])
    duration = len(audio) / sr
    print(f"TTS: '{text[:40]}...' | {duration:.1f}s audio in {elapsed:.1f}s")

    buf = io.BytesIO()
    sf.write(buf, audio, sr, format="WAV")
    buf.seek(0)

    return StreamingResponse(buf, media_type="audio/wav")


@app.get("/health")
async def health():
    return {"status": "ok", "device": device}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8090)

"""Qwen3-TTS FastAPI server for Senior Chat app."""

import io
import time

import soundfile as sf
import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI(title="Senior Chat TTS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None


class TTSRequest(BaseModel):
    text: str
    language: str = "Korean"
    speaker: str = "Sohee"
    instruct: str = "Speak warmly and gently, like talking to a grandparent"


@app.on_event("startup")
def load_model():
    global model
    from qwen_tts import Qwen3TTSModel

    device = "mps" if torch.backends.mps.is_available() else "cpu"
    print(f"Loading Qwen3-TTS on {device}...")
    start = time.time()

    model = Qwen3TTSModel.from_pretrained(
        "Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice",
        device_map=device,
        dtype=torch.float32,
    )
    print(f"Model loaded in {time.time() - start:.1f}s")


@app.post("/tts")
def generate_speech(req: TTSRequest):
    start = time.time()

    wavs, sr = model.generate_custom_voice(
        text=req.text,
        language=req.language,
        speaker=req.speaker,
        instruct=req.instruct,
    )

    buf = io.BytesIO()
    sf.write(buf, wavs[0], sr, format="WAV")
    buf.seek(0)

    elapsed = time.time() - start
    duration = len(wavs[0]) / sr
    print(f"TTS: {duration:.1f}s audio in {elapsed:.1f}s (RTF {elapsed/duration:.2f}x)")

    return StreamingResponse(
        buf,
        media_type="audio/wav",
        headers={
            "X-Audio-Duration": str(round(duration, 2)),
            "X-Generation-Time": str(round(elapsed, 2)),
        },
    )


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None}

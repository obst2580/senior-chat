package com.senior.tts;

import com.senior.ai.AiModelConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Slf4j
@Service
public class TtsService {

    private final RestClient restClient;
    private final AiModelConfig aiModelConfig;

    public TtsService(@Value("${spring.ai.openai.api-key}") String apiKey,
                      AiModelConfig aiModelConfig) {
        this.aiModelConfig = aiModelConfig;
        this.restClient = RestClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    public byte[] synthesize(String text) {
        String input = (text == null || text.isBlank()) ? "" : text.trim();
        log.debug("TTS request: model={}, voice={}, text length={}",
                aiModelConfig.getTts().getModel(), aiModelConfig.getTts().getVoice(), input.length());

        return restClient.post()
                .uri("/audio/speech")
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of(
                        "model", aiModelConfig.getTts().getModel(),
                        "input", input,
                        "voice", aiModelConfig.getTts().getVoice(),
                        "response_format", "mp3"
                ))
                .retrieve()
                .body(byte[].class);
    }
}

package com.seniar.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AiOrchestrator {

    private final ChatClient.Builder chatClientBuilder;
    private final PersonaConfig personaConfig;

    public String generateReply(Long userId, String userMessage) {
        ChatClient chatClient = chatClientBuilder
                .defaultSystem(personaConfig.getSystemPrompt())
                .build();

        return chatClient.prompt()
                .user(userMessage)
                .call()
                .content();
    }
}

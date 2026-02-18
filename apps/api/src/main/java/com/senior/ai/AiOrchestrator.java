package com.senior.ai;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AiOrchestrator {

    private final ChatClient.Builder chatClientBuilder;
    private final PersonaConfig personaConfig;

    public String generateReply(Long userId, String userMessage) {
        return generateReply(userId, userMessage, personaConfig.getSystemPrompt());
    }

    public String generateReply(Long userId, String userMessage,
                                String name, int age, String dialect) {
        String systemPrompt = personaConfig.getSystemPrompt(name, age, dialect);
        return generateReply(userId, userMessage, systemPrompt);
    }

    private String generateReply(Long userId, String userMessage, String systemPrompt) {
        try {
            ChatClient chatClient = chatClientBuilder
                    .defaultSystem(systemPrompt)
                    .build();

            return chatClient.prompt()
                    .user(userMessage)
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("AI call failed, returning fallback response: {}", e.getMessage());
            return generateFallbackReply(userMessage);
        }
    }

    private String generateFallbackReply(String userMessage) {
        if (userMessage.contains("안녕")) {
            return "안녕하세요! 다솜이예요. 오늘 하루는 어떠셨어요? 궁금한 거 있으시면 편하게 말씀해 주세요~";
        }
        if (userMessage.contains("날씨")) {
            return "할머니, 오늘 날씨가 궁금하시군요! 외출하실 때 따뜻하게 입고 나가세요~";
        }
        return "네, 말씀하신 내용 잘 들었어요! 지금은 다솜이가 잠깐 쉬고 있어서, 조금 뒤에 더 자세히 알려드릴게요~";
    }
}

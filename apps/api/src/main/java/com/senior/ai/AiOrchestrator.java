package com.senior.ai;

import com.senior.chat.ChatMessage;
import com.senior.user.User.SubscriptionTier;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class AiOrchestrator {

    private final ChatClient.Builder chatClientBuilder;
    private final PersonaConfig personaConfig;
    private final AiModelConfig aiModelConfig;
    private final List<ToolCallbackProvider> toolCallbackProviders;

    private volatile ChatClient toolAwareChatClient;

    public String generateReply(Long userId, String userMessage) {
        return generateReply(userId, userMessage, List.of(), personaConfig.getSystemPrompt(), SubscriptionTier.FREE);
    }

    public String generateReply(Long userId, String userMessage, List<ChatMessage> history,
                                String name, int age, String dialect, SubscriptionTier tier) {
        String systemPrompt = personaConfig.getSystemPrompt(name, age, dialect);
        return generateReply(userId, userMessage, history, systemPrompt, tier);
    }

    private String generateReply(Long userId, String userMessage,
                                 List<ChatMessage> history, String systemPrompt,
                                 SubscriptionTier tier) {
        try {
            String model = aiModelConfig.getModelForTier(tier);
            log.debug("Using model {} for tier {}", model, tier);

            List<Message> messages = new ArrayList<>();
            for (ChatMessage msg : history) {
                if ("user".equals(msg.getRole())) {
                    messages.add(new UserMessage(msg.getContent()));
                } else if ("assistant".equals(msg.getRole())) {
                    messages.add(new AssistantMessage(msg.getContent()));
                }
            }
            messages.add(new UserMessage(userMessage));

            OpenAiChatOptions options = OpenAiChatOptions.builder()
                    .model(model)
                    .build();

            return getToolAwareClient()
                    .prompt()
                    .system(systemPrompt)
                    .messages(messages)
                    .options(options)
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("AI call failed, returning fallback response: {}", e.getMessage());
            return generateFallbackReply(userMessage);
        }
    }

    private ChatClient getToolAwareClient() {
        if (toolAwareChatClient == null) {
            synchronized (this) {
                if (toolAwareChatClient == null) {
                    ChatClient.Builder builder = chatClientBuilder;
                    for (ToolCallbackProvider provider : toolCallbackProviders) {
                        builder = builder.defaultToolCallbacks(provider);
                    }
                    toolAwareChatClient = builder.build();
                }
            }
        }
        return toolAwareChatClient;
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

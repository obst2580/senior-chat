package com.senior.chat;

import com.senior.ai.AiOrchestrator;
import com.senior.companion.CompanionProfile;
import com.senior.companion.CompanionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final AiOrchestrator aiOrchestrator;
    private final CompanionService companionService;

    @Transactional
    public ChatMessage chat(Long userId, String userMessage, String city, String district) {
        ChatMessage userMsg = ChatMessage.builder()
                .userId(userId)
                .role("user")
                .content(userMessage)
                .createdAt(LocalDateTime.now())
                .build();
        chatRepository.save(userMsg);

        CompanionProfile profile = companionService.getProfile(userId);

        String locationContext = buildLocationContext(city, district);
        String fullMessage = locationContext.isEmpty()
                ? userMessage
                : userMessage + "\n\n[사용자 위치: " + locationContext + "]";

        String aiReply = aiOrchestrator.generateReply(
                userId, fullMessage,
                profile.getName(), profile.getAge(), profile.getDialect());

        ChatMessage assistantMsg = ChatMessage.builder()
                .userId(userId)
                .role("assistant")
                .content(aiReply)
                .createdAt(LocalDateTime.now())
                .build();
        return chatRepository.save(assistantMsg);
    }

    @Transactional(readOnly = true)
    public List<ChatMessage> getHistory(Long userId) {
        return chatRepository.findByUserIdOrderByCreatedAtAsc(userId);
    }

    private String buildLocationContext(String city, String district) {
        if (city == null && district == null) return "";
        StringBuilder sb = new StringBuilder();
        if (city != null) sb.append(city);
        if (district != null) {
            if (!sb.isEmpty()) sb.append(" ");
            sb.append(district);
        }
        return sb.toString();
    }
}

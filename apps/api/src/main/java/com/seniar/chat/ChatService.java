package com.seniar.chat;

import com.seniar.ai.AiOrchestrator;
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

    @Transactional
    public String chat(Long userId, String userMessage) {
        ChatMessage userMsg = ChatMessage.builder()
                .userId(userId)
                .role("user")
                .content(userMessage)
                .createdAt(LocalDateTime.now())
                .build();
        chatRepository.save(userMsg);

        String aiReply = aiOrchestrator.generateReply(userId, userMessage);

        ChatMessage assistantMsg = ChatMessage.builder()
                .userId(userId)
                .role("assistant")
                .content(aiReply)
                .createdAt(LocalDateTime.now())
                .build();
        chatRepository.save(assistantMsg);

        return aiReply;
    }

    @Transactional(readOnly = true)
    public List<ChatMessage> getHistory(Long userId) {
        return chatRepository.findByUserIdOrderByCreatedAtAsc(userId);
    }
}

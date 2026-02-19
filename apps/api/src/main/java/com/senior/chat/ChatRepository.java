package com.senior.chat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByUserIdOrderByCreatedAtAsc(Long userId);

    List<ChatMessage> findTop20ByUserIdOrderByCreatedAtDesc(Long userId);
}

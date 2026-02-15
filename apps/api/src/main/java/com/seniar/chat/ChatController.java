package com.seniar.chat;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendMessage(
            @Valid @RequestBody ChatRequest request) {
        String reply = chatService.chat(request.userId(), request.message());
        return ResponseEntity.ok(Map.of("reply", reply));
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<ChatMessage>> getHistory(
            @PathVariable Long userId) {
        List<ChatMessage> history = chatService.getHistory(userId);
        return ResponseEntity.ok(history);
    }

    public record ChatRequest(
            Long userId,
            String message
    ) {}
}

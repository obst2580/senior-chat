package com.seniar.chat;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendMessage(
            @Valid @RequestBody ChatRequest request) {
        ChatMessage assistantMessage = chatService.chat(request.userId(), request.message());
        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", new SendMessageResponse(toDto(assistantMessage))
        ));
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<Map<String, Object>> getHistory(
            @PathVariable Long userId) {
        List<MessageDto> history = chatService.getHistory(userId)
                .stream()
                .map(ChatController::toDto)
                .toList();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", history
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleError(Exception e) {
        return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", Map.of(
                        "code", "INTERNAL_ERROR",
                        "message", "서버에 문제가 생겼어요. 잠시 후 다시 시도해 주세요."
                )
        ));
    }

    public record ChatRequest(
            Long userId,
            String message
    ) {}

    public record MessageDto(
            String id,
            String role,
            String content,
            String createdAt
    ) {}

    public record SendMessageResponse(
            MessageDto message
    ) {}

    private static final DateTimeFormatter CREATED_AT_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    private static MessageDto toDto(ChatMessage message) {
        return new MessageDto(
                String.valueOf(message.getId()),
                message.getRole(),
                message.getContent(),
                message.getCreatedAt().format(CREATED_AT_FORMATTER)
        );
    }
}

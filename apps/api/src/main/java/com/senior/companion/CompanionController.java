package com.senior.companion;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/companion")
@RequiredArgsConstructor
public class CompanionController {

    private final CompanionService companionService;

    @GetMapping("/{userId}/profile")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable Long userId) {
        CompanionProfile profile = companionService.getProfile(userId);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", toDto(profile)
        ));
    }

    @PutMapping("/{userId}/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @PathVariable Long userId,
            @Valid @RequestBody ProfileRequest request) {
        CompanionProfile profile = companionService.saveProfile(
                userId, request.name(), request.age(), request.dialect());
        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", toDto(profile)
        ));
    }

    public record ProfileRequest(
            @NotBlank @Size(max = 50) String name,
            @Min(1) @Max(100) Integer age,
            @NotBlank @Size(max = 20) String dialect
    ) {}

    public record ProfileDto(
            String id,
            Long userId,
            String name,
            Integer age,
            String dialect,
            String createdAt,
            String updatedAt
    ) {}

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    private static ProfileDto toDto(CompanionProfile profile) {
        return new ProfileDto(
                profile.getId() != null ? String.valueOf(profile.getId()) : "0",
                profile.getUserId(),
                profile.getName(),
                profile.getAge(),
                profile.getDialect(),
                profile.getCreatedAt() != null ? profile.getCreatedAt().format(FORMATTER) : null,
                profile.getUpdatedAt() != null ? profile.getUpdatedAt().format(FORMATTER) : null
        );
    }
}

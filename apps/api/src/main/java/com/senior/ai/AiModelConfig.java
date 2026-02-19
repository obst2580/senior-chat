package com.senior.ai;

import com.senior.user.User.SubscriptionTier;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "app.ai")
public class AiModelConfig {

    private Map<String, String> models = Map.of();
    private Tts tts = new Tts();

    public String getModelForTier(SubscriptionTier tier) {
        return switch (tier) {
            case PREMIUM -> models.getOrDefault("premium", "gpt-4o");
            case FREE -> models.getOrDefault("free", "gpt-4o-mini");
        };
    }

    @Getter
    @Setter
    public static class Tts {
        private String model = "tts-1";
        private String voice = "nova";
    }
}

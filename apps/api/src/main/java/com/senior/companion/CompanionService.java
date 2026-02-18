package com.senior.companion;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CompanionService {

    private final CompanionProfileRepository profileRepository;

    @Transactional(readOnly = true)
    public CompanionProfile getProfile(Long userId) {
        return profileRepository.findByUserId(userId)
                .orElse(defaultProfile(userId));
    }

    @Transactional
    public CompanionProfile saveProfile(Long userId, String name, Integer age, String dialect) {
        CompanionProfile profile = profileRepository.findByUserId(userId)
                .orElse(CompanionProfile.builder().userId(userId).build());

        profile.updateProfile(name, age, dialect);
        return profileRepository.save(profile);
    }

    private CompanionProfile defaultProfile(Long userId) {
        return CompanionProfile.builder()
                .userId(userId)
                .name("다솜이")
                .age(25)
                .dialect("표준어")
                .build();
    }
}

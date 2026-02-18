package com.senior.companion;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanionProfileRepository extends JpaRepository<CompanionProfile, Long> {

    Optional<CompanionProfile> findByUserId(Long userId);
}

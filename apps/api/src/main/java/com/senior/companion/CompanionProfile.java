package com.senior.companion;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "companion_profiles")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanionProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false, length = 50)
    @Builder.Default
    private String name = "다솜이";

    @Column(nullable = false)
    @Builder.Default
    private Integer age = 25;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String dialect = "표준어";

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    public void updateProfile(String name, Integer age, String dialect) {
        this.name = name;
        this.age = age;
        this.dialect = dialect;
        this.updatedAt = LocalDateTime.now();
    }
}

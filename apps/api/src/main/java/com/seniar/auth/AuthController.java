package com.seniar.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @PostMapping("/verify-phone")
    public ResponseEntity<Map<String, String>> verifyPhone(
            @RequestBody Map<String, String> request) {
        // TODO: Implement phone verification (SMS OTP)
        String phoneNumber = request.get("phoneNumber");
        return ResponseEntity.ok(Map.of(
                "status", "pending",
                "message", "인증번호가 발송되었습니다."
        ));
    }

    @PostMapping("/confirm")
    public ResponseEntity<Map<String, Object>> confirmCode(
            @RequestBody Map<String, String> request) {
        // TODO: Implement OTP confirmation and JWT token issuance
        return ResponseEntity.ok(Map.of(
                "status", "verified",
                "token", "placeholder-jwt-token"
        ));
    }
}

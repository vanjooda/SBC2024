package com.sbcamping.common.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class APIRefreshController {

    // 리프레쉬 토큰 발급 메소드
    @GetMapping("/api/auth/refresh")
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader,
                                       @RequestHeader("X-Refresh-Token") String refreshToken) {

        log.info("Authorization Header: {}", authHeader);
        log.info("Refresh Token Header: {}", refreshToken);

        if(refreshToken == null){
            throw new CustomJWTException("NULL_REFRESH_TOKEN");
        }
        if(authHeader == null || !authHeader.startsWith("Bearer ") || authHeader.length() < 7) {
            throw new CustomJWTException("INVALID_REFRESH_TOKEN");
        }

        String accessToken = authHeader.substring(7);
        log.info("------------1번" + accessToken);

        // Access 토큰이 만료되지 않았다면 PASS, 기존 값 반환
        if(checkExpiredToken(accessToken) == false){
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        }
        log.info("-----------2번");

        // 만료됐다면 Refresh 토큰 검증 후 새로운 토큰 발급
        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);
        log.info("----------------refresh 토큰 발급 claims : {}", claims);
        String newAccessToken = JWTUtil.generateToken(claims, 10);
        String newRefreshToken = checkTime((Integer) claims.get("exp")) == true?
                JWTUtil.generateToken(claims, 60 * 24) : refreshToken;
        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }

    // 남은 유효 시간 확인하는 메소드 (1시간 미만인지)
    private boolean checkTime(Integer exp){
        Date expDate = new Date(exp * 1000); // 밀리초로 변환
        long gap = expDate.getTime() - System.currentTimeMillis(); // 만료시간 - 현재시간
        long leftMin = gap / (1000 * 60); // 분 단위로 변환
        return leftMin < 60;
    }

    // 토큰 만료되었는지 검증하는 메소드 (만료되었으면 true, 아직 시간남았으면 false)
    private boolean checkExpiredToken(String accessToken) {
        log.info("만료되었으면 true, 아직 시간남았으면 false");
        try {
            JWTUtil.validateToken(accessToken);
            log.info("token 검증");
            return false;
        } catch (CustomJWTException e) {
            if (e.getMessage().equals("Expired")){
                return true;
            } else{
                log.info(e.getMessage());
                throw e;
            }
        }
    }
}

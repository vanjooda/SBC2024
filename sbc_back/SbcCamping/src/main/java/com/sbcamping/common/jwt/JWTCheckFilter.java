package com.sbcamping.common.jwt;

import com.google.gson.Gson;
import com.sbcamping.user.member.dto.MemberDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;

@Slf4j
public class JWTCheckFilter extends OncePerRequestFilter {


    // 적용 범위 : 마이페이지, 각 게시판 게시글 작성 페이지 (?)

    // 유효한 JWT 토큰인지 확인하는 필터 클래스
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("------------------------JWT 체크 필터");
        String authHeaderStr = request.getHeader("Authorization");
        try {
            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken); // 토큰 검증
            log.info("--------JWT Claims : {}", claims);

            // 사용자 정보
            String memberEmail = (String) claims.get("memberEmail");
            String memberPw = (String) claims.get("memberPw");
            String memberName = (String) claims.get("memberName");
            String memberPhone = (String) claims.get("memberPhone");
            char memberGender = (char) claims.get("memberGender");
            String memberBirth = (String) claims.get("memberBirth");
            String memberLocal = (String) claims.get("memberLocal");
            String memberRole = (String) claims.get("memberRole");
            Long memberId = (Long) claims.get("memberId");
            MemberDTO memberDTO = new MemberDTO(memberEmail, memberPw, memberName, memberPhone, memberGender, memberBirth, memberLocal, memberRole, memberId);
            log.info("memberDTO.getMemberEmail : {}", memberDTO.getMemberEmail());

            // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ getAuthorities() 동작 확인하세요
            // 인증 객체 생성(사용자 정보와 권한)
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberDTO, memberPw, memberDTO.getAuthorities());
            // 사용자의 인증 상태 저장 (인증 완료)
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        } catch (Exception e){
            log.info("------------------JWT 체크 오류 : {}", e.getMessage());
            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
            response.setContentType("application/json");
            response.getWriter().write(msg);
        }
    }

    // 토큰 체크 예외 설정
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // preflight 요청은 체크하지 않음
        // preflight란 CORS상황에서 보안을 확인하기 위해 브라우저가 제공하는 기능
        if(request.getMethod().equals("OPTIONS")){
            return true;
        }
        String path = request.getRequestURI();
        log.info("URL CHECK : {}", path);

        // api/auth/ 경로의 호출은 체크하지 않음 (로그인할 때는 JWT 토큰이 없는 상태이기에 하는 설정)
        if(path.startsWith("/api/auth/")){
            return true;
        }

        // 회원가입 경로 예외
        if(path.startsWith("/api/member")){
            return true;
        }

        if(path.startsWith("/api/campers")){
            return true;
        }

        if(path.startsWith("/admin")){
            return true;
        }

        if(path.equals("/api/res")){
            return true;
        }

        // 이미지 조회 경로는 체크하지 않음
        // ◆◆◆◆◆◆◆◆◆이미지 경로는 다른 분들꺼 보고 추가 수정◆◆◆◆◆◆◆◆◆◆◆◆◆
        if (path.startsWith("/api/cboard") || path.startsWith("/api/qboard/")){
            return true;
        }

        return false;
    }
}

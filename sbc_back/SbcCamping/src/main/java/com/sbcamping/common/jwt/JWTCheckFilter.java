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
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@Slf4j
public class JWTCheckFilter extends OncePerRequestFilter {


    // 적용 범위 : 마이페이지, 각 게시판 게시글 작성 페이지 (?)

    // 유효한 JWT 토큰인지 확인하는 필터 클래스
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("------------------------JWT 체크 필터");
        String authHeaderStr = request.getHeader("Authorization");
        if (authHeaderStr == null) {
            log.info("-------요청이 jwtAxios인지 확인해보세요");
        }
        try {
            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken); // 토큰 검증
            //log.info("--------JWT Claims : {}", claims);

            // 사용자 정보 추출 (member 내부의 정보)
            Map<String, Object> memberClaims = (Map<String, Object>) claims.get("member");
            String memberEmail = (String) memberClaims.get("memberEmail");
            String memberPw = (String) memberClaims.get("memberPw");
            String memberName = (String) memberClaims.get("memberName");
            String memberPhone = (String) memberClaims.get("memberPhone");
            char memberGender = memberClaims.get("memberGender").toString().charAt(0);
            String memberBirth = (String) memberClaims.get("memberBirth");
            String memberLocal = (String) memberClaims.get("memberLocal");
            // authorities 필드가 List<Map<String, Object>> 형태인 경우 처리
            String memberRole = "";
            List<Map<String, Object>> authorities = (List<Map<String, Object>>) memberClaims.get("authorities");
            String role = (String) memberClaims.get("memberRole");
            if (authorities != null && !authorities.isEmpty()) {
                // 첫 번째 권한의 authority 값 추출
                memberRole = (String) authorities.get(0).get("authority");
            } else if(role != null){
                memberRole = role;
            }
            else {
                throw new RuntimeException("권한 정보가 없습니다.");
            }
            Long memberId = (Long) claims.get("memberId");
            String memberStatus = (String) claims.get("memberStatus");
            MemberDTO memberDTO = new MemberDTO(memberEmail, memberPw, memberName, memberPhone, memberGender, memberBirth, memberLocal, memberRole, memberId, memberStatus);
            log.info("memberDTO.GetAuthorities() : {}", memberDTO.getAuthorities());

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
            PrintWriter out = response.getWriter();
            out.println(msg);
            out.close();
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
        if(path.startsWith("/api/auth")){
            return true;
        }

        // 회원가입 경로 예외
        if(path.equals("/api/member/") || path.equals("/api/member/kakao/")){
            return true;
        }

        if(path.equals("/api/campers/list") || path.startsWith("/api/campers/view")){
            return true;
        }

        if (path.startsWith("/api/res/")) {
            return true;
        }

        if (path.startsWith("/admin/site")) {
            return true;
        }

        if(path.equals("/api/res/siteList")){
            return true;
        }

        //상호 노티스 예외
        if(path.startsWith("/notice")){
            return true;
        }
        //상호 노티스 예외
        if(path.startsWith("/site")){
            return true;
        }

        // 이미지 요청의 경우 필터를 적용하지 않음
        if (path.startsWith("/admin/qnas/view")) {
            return true;
        }

        return false;
    }
}

package com.sbcamping.user.member.dto;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@ToString
public class MemberDTO extends User {

    private String memberEmail; // 회원 이메일 (수정불가)
    private String memberPw;
    private String memberName;
    private String memberPhone;
    private char memberGender;
    private String memberBirth;
    private String memberLocal;
    private String memberRole;
    private Long memberId;

    // 생성자
    public MemberDTO(String email, String memberPw, String memberName, String memberPhone, char memberGender, String memberBirth, String memberLocal, String memberRole, Long memberId) {
        super(email, memberPw, convertRoleToCollection(memberRole));
        this.memberEmail = email;
        this.memberPw = memberPw;
        this.memberName = memberName;
        this.memberPhone = memberPhone;
        this.memberGender = memberGender;
        this.memberBirth = memberBirth;
        this.memberLocal = memberLocal;
        this.memberRole = memberRole;
        this.memberId = memberId;
    }

    // 문자열을 Collection으로 변환하는 메서드
    private static Collection<? extends GrantedAuthority> convertRoleToCollection(String memberRole) {
        return Arrays.stream(memberRole.split(","))
                .map(role -> (GrantedAuthority) () -> role) // 각 역할을 GrantedAuthority로 변환
                .collect(Collectors.toList());
    }

    // JWT 인증용 클레임(claim)
    // 클레임(claim)은 인증 및 인가 시스템에서 사용자의 신원이나 권한에 대한 정보를 담고 있는 데이터 조각
    public Map<String, Object> getClaims(){
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberEmail", memberEmail);
        claims.put("memberPw", memberPw);
        claims.put("memberName", memberName);
        claims.put("memberPhone", memberPhone);
        claims.put("memberGender", memberGender);
        claims.put("memberBirth", memberBirth);
        claims.put("memberLocal", memberLocal);
        claims.put("memberRole", memberRole);
        claims.put("memberId", memberId);
        return claims;
    }

}

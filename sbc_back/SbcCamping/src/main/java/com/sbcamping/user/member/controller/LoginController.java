package com.sbcamping.user.member.controller;

import com.sbcamping.domain.Member;
import com.sbcamping.user.member.dto.MemberDTO;
import com.sbcamping.user.member.repository.MemberRepository;
import com.sbcamping.user.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private MemberService memberService;
    @Autowired
    private MemberRepository memberRepository;

    // 카카오
    @GetMapping("/kakao")
    public String[] getMemberFromKakao(String accessToken){
        Map<String, String> result = memberService.getKakaoMember(accessToken);
        String res = result.get("result");
        String memberEmail = result.get("memberEmail"); // 기존 회원일 경우 존재하는 값
        String kakaoEmail = result.get("kakaoEmail");
        return new String[] { res, kakaoEmail, memberEmail };
    }

    // 이메일 중복체크 (구조명세서 변경하기)
    @GetMapping("/emailcheck")
    public Map<String,String> emailCheck(@RequestParam String email){
        String msg = memberService.emailCheck(email);
        Map<String,String> map = new HashMap<>();
        map.put("msg",msg);
        return map;
    }

    // 이메일 찾기 (회원명 + 회원 핸드폰번호)
    @PostMapping("/findemail")
    public Map<String,String> findEmailByNameAndPhone(@RequestBody Member member){
        log.info("-----------------이메일 찾기 메소드");
        String email = memberService.findEmail(member.getMemberName(), member.getMemberPhone());
        Map<String,String> map = new HashMap<>();
        map.put("memberEmail",email);
        return map;
    }

    // 비밀번호 찾기 - 회원 확인 메소드 (회원명 + 회원이메일)
    // 일치하는 회원이 있는 경우 modify 문자열을 전송해서 비밀번호 변경할 수 있게 하기
    // 회원정보 front에서도 저장하여 비밀번호 변경 때 회원정보 전송할 수 있게 하기
    @PostMapping("/findpw")
    public ResponseEntity<Member> findMemberByNameAndEmail(@RequestBody Member member){
        log.info("--------------비밀번호 찾기 메소드");
        Member memResult = memberService.findMemberByNameAndEmail(member);
        return ResponseEntity.ok(memResult);
    }

    // 비밀번호 변경
    @PostMapping("/modpw")
    public Map<String, String> modifyPw(@RequestBody Member member){
        log.info("----------------비밀번호 변경 메소드", member);
        String msg = memberService.updatePw(member);
        HashMap<String,String> map = new HashMap<>();
        map.put("msg",msg);
        return map;
    }
}

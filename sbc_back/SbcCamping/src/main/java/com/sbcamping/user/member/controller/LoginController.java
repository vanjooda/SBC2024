package com.sbcamping.user.member.controller;

import com.sbcamping.domain.Member;
import com.sbcamping.user.member.dto.MemberDTO;
import com.sbcamping.user.member.service.MemberServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private MemberServiceImpl memberService;

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
    public Map<String,String> findMemberByNameAndEmail(@RequestBody Member member){
        log.info("--------------비밀번호 찾기 메소드");
        Member memResult = memberService.findMemberByNameAndEmail(member);
        Map<String,String> map = new HashMap<>();
        if(memResult != null){
            map.put("memberID",memResult.getMemberID().toString());
            map.put("result", "exist");
        } else {
            map.put("result", "not_exist");
        }
        return map;
    }

    // 비밀번호 변경
    @PostMapping("/modifypw")
    public Map<String, String> modifyPw(@RequestBody MemberDTO memberDTO){
        log.info("----------------비밀번호 변경 메소드");
        String msg = memberService.updatePw(memberDTO);
        HashMap<String,String> map = new HashMap<>();
        map.put("msg",msg);
        return map;
    }
}

package com.sbcamping.user.member.controller;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.user.member.dto.MemberDTO;
import com.sbcamping.user.member.service.MemberService;
import com.sbcamping.user.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    // 회원가입
    @PostMapping("/")
    public void join(@RequestBody Member member){
        memberService.addMember(member);
    }


    // 나의 예약내역 조회
    @PostMapping("/memberRes")
    public List<Reservation> getMemberReservations(@RequestBody Long memberId){
        log.info("온건지 만건지", memberId);
        List<Reservation> list = memberService.getMemberRes(memberId);
        return list;
    }

    // 예약 상세 내역 조회
    @GetMapping("/{resID}")
    public void getDetailMyRes(@PathVariable(name = "resID") Long resID){

    }

    // 회원개인정보 조회
    @GetMapping("/{memberID}")
    public void GetMemberInfo(@PathVariable(name = "memberID") Long memberID){
        Member member = memberService.getMember(memberID);
    }

    // 비밀번호 인증
    @PostMapping("/pwAuth")
    public Map<String, String> memberPwAuth(@RequestBody Member member){
        String msg = memberService.authPw(member);
        Map<String, String> map = new HashMap<>();
        map.put("msg", msg);
        return map;
    }

    // 회원정보 수정
    @PutMapping("/{memberID}")
    public Map<String, String> modifyMember(@PathVariable(name = "memberID") Long memberID, @RequestBody MemberDTO memberDTO){
        String msg = memberService.updateMember(memberID, memberDTO);
        Map<String, String> map = new HashMap<>();
        map.put("msg", msg);
        return map;
   }

    // 회원 탈퇴(삭제)
    @DeleteMapping("/{memberID}")
    public void deleteMember(@PathVariable(name = "memberID") Long memberID){
        memberService.deleteMember(memberID);
    }


}

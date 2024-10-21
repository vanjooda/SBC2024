package com.sbcamping.user.member.controller;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.user.member.dto.MemberDTO;
import com.sbcamping.user.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController("userMemberController") //사용자 관련 멤버 컨트롤러
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    // 회원가입
    @PostMapping("/")
    public void join(@RequestBody Member member){
        memberService.addMember(member);
    }

    // 카카오 회원가입
    @PostMapping("/kakao/")
    public void kakaoJoin(@RequestBody Member member){
        log.info("----------카카오 회원가입 요청 : " + member);
        memberService.kakaoAddMember(member);
    }


    // 예약 상태 변경
    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/{resID}/cancel")
    public void cancelReservation(@PathVariable Long resID, @RequestBody Map<String,String> reason){
        log.info("에약 상태 변경 메소드 도착 ID : "+ resID + " 이유 : " + reason);
        memberService.cancelRes(resID, reason.get("reason"));
        log.info("예약 상태 변경 메소드 끝");
    }

    // 나의 예약내역 조회
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/memberRes")
    public List<Reservation> getMemberReservations(@RequestBody Long memberId){
        List<Reservation> list = memberService.getMemberRes(memberId);
        return list;
    }

    // 예약 상세 내역 조회
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/{resID}")
    public Reservation getDetailMyRes(@PathVariable(name = "resID") Long resID){
        return memberService.getResDetail(resID);
    }

    // 비밀번호 인증 241014 17:09
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/pwauth")
    public Map<String, String> memberPwAuth(@RequestBody Map<String, Object> member){
        Long memberId = Long.parseLong(member.get("memberId").toString());
        String memberPw = member.get("memberPw").toString();
        //log.info("------비밀번호 인증 메소드 : " + memberId, memberPw);
        String msg = memberService.authPw(memberId, memberPw);
        Map<String, String> map = new HashMap<>();
        map.put("msg", msg);
        return map;
    }

    // 회원정보 조회
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/{memberId}")
    public Map<String, Member> getMember(@PathVariable Long memberId){
        //log.info("---------회원 조회 메서드 : {}", memberId);
        Member member = memberService.getMember(memberId);
        Map<String, Member> map = new HashMap<>();
        map.put("member", member);
        return map;
    }

    // 회원정보 수정
    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/mod")
    public Map<String, Member> modifyMember(@RequestBody Member member){
        //log.info("---------- 회원정보 수정 : " + member);
        Member memResult = memberService.updateMember(member);
        Map<String, Member> map = new HashMap<>();
        map.put("member", memResult);
        return map;
    }

    // 회원 탈퇴(삭제)
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/withdraw")
    public Map<String, String> withdraw(@RequestBody Map<String, Object> member){
        Long memberId = Long.parseLong(member.get("memberId").toString());
        String memberPw = member.get("memberPw").toString();
        String result = memberService.withdraw(memberId, memberPw);
        Map<String, String> map = new HashMap<>();
        map.put("msg", result); // 회원 상태 바뀌면 success 아니면 fail
        return map;
    }


}

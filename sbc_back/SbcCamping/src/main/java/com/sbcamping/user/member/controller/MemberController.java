package com.sbcamping.user.member.controller;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.user.member.dto.MemberDTO;
import com.sbcamping.user.member.service.MemberService;
import com.sbcamping.user.member.service.MemberServiceImpl;
import com.sbcamping.user.reservation.dto.ReservationDTO;
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


    // 예약 상태 변경
    @PutMapping("/{resID}")
    public void cancleReservation(@PathVariable Long resID){
        log.info("에약 상태 변경 메소드 도착");
        memberService.cancleRes(resID);
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

    // 회원개인정보 조회
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/{memberID}")
    public void GetMemberInfo(@PathVariable(name = "memberID") Long memberID){
        Member member = memberService.getMember(memberID);
    }

    // 비밀번호 인증 241014 17:09
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/pwauth")
    public Map<String, String> memberPwAuth(@RequestBody Map<String, Object> member){
        Long memberId = Long.parseLong(member.get("memberId").toString());  // 키 값은 문자열로 사용
        String memberPw = member.get("memberPw").toString();
        log.info("비밀번호 인증 : " + memberId, memberPw);
        Member mem = new Member();

        String msg = memberService.authPw(memberId, memberPw);
        Map<String, String> map = new HashMap<>();
        map.put("msg", msg);
        return map;
    }

    // 회원정보 수정
    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/{memberID}")
    public Map<String, String> modifyMember(@PathVariable(name = "memberID") Long memberID, @RequestBody MemberDTO memberDTO){
        String msg = memberService.updateMember(memberID, memberDTO);
        Map<String, String> map = new HashMap<>();
        map.put("msg", msg);
        return map;
    }

    // 회원 탈퇴(삭제)
    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/{memberID}")
    public void deleteMember(@PathVariable(name = "memberID") Long memberID){
        memberService.deleteMember(memberID);
    }


}

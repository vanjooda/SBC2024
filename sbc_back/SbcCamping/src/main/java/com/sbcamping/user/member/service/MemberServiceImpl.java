package com.sbcamping.user.member.service;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.user.member.dto.MemberDTO;
import com.sbcamping.user.member.repository.MemberRepository;
import com.sbcamping.user.reservation.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    private final ReservationRepository reservationRepository;

    private final PasswordEncoder passwordEncoder;

    // 예약 상태 변경
    @Override
    public void cancleRes(Long resId) {
        Reservation res = reservationRepository.findById(resId).orElse(null);
        res.setResStatus("예약취소");
        res.setResCancelDate(LocalDate.now());
        // 예약 취소 사유도 추가
        res.setResCancelReason("그냥");
        reservationRepository.save(res);
    }

    // 예약 내역 상세 조회
    @Override
    public Reservation getResDetail(Long resId) {
        Reservation res = reservationRepository.findById(resId).orElse(null);
        log.info("res : " + res);
        return res;
    }

    @Override
    public List<Reservation> getMemberRes(Long memberId) {
        List list = reservationRepository.findByMemberId(memberId);
        log.info("예약내역 : " + list);
        if(list == null){
            list.add("예약내역이 없습니다.");
        }
        return list;
    }

    // 비밀번호 인증 (회원정보수정 들어갈 때 사용)
    @Override
    public String authPw(Long memberId, String memberPw) {
        log.info("memberId : " + memberId + " memberPw : " + memberPw);
        Member memResult = memberRepository.findById(memberId).orElse(null);
        boolean result = passwordEncoder.matches(memResult.getMemberPw(), memberPw);
        String msg = null;
        if(result == false || memResult == null) {
            msg = "fail";
        } else{
            msg = "success";
        }
        return msg;
    }

    // 회원명 + 이메일로 회원 찾기
    @Override
    public Member findMemberByNameAndEmail(Member member) {
        Member memResult = memberRepository.findByMemberNameAndMemberEmail(member.getMemberName(), member.getMemberEmail());
        return memResult;
    }

    // 회원 비밀번호 변경
    @Override
    public String updatePw(MemberDTO memberDTO) {
        // ID로 member 조회
        Member member = memberRepository.findById(memberDTO.getMemberId()).orElse(null);
        String msg = null;
        if(memberDTO.getMemberPw() != null && memberDTO.getMemberId() != null){
            // 비밀번호 변경
            member.changePw(passwordEncoder.encode(memberDTO.getMemberPw()));
            msg = "success";
        } else{
            msg = "fail";
        }
        return msg;
    }

    // 이메일 찾기 (회원명 + 회원 핸드폰번호)
    @Override
    public String findEmail(String memberName, String memberPhone) {
        Member member = memberRepository.findByMemberNameAndMemberPhone(memberName, memberPhone);
        log.info("이메일찾기 : " + member.toString());
        String email;
        if(member == null) {
            email = "이메일을 찾을 수 없습니다.";
        } else{
            email = member.getMemberEmail();
        }
        return email;
    }

    // 회원 등록
    @Override
    public void addMember(Member member) {
        String pw = passwordEncoder.encode(member.getMemberPw());
        member.changePw(pw);
        memberRepository.save(member);
    }

    // 회원가입시 이메일 중복 체크
    @Override
    public String emailCheck(String memberEmail) {
        Integer count = memberRepository.countByMemberEmail(memberEmail);
        String msg = "";
        if(count == 0){
            msg = "enable";
        } else{
            msg = "disable";
        }
        return msg;
    }

    // 회원 정보 수정
    @Override
    public String updateMember(Long memberID, MemberDTO memberDTO) {

        // 회원번호로 회원 조회
        Member member = memberRepository.findById(memberID).get();

        // 수정할 값이 있으면 수정
        if(memberDTO.getMemberPhone() != null) {
            member.changePhone(memberDTO.getMemberPhone());
        }
        if(memberDTO.getMemberBirth() != null) {
            member.changeBirth(memberDTO.getMemberBirth());
        }
        Character gender = memberDTO.getMemberGender();
        if(gender != null) {
            member.changeGender(memberDTO.getMemberGender());
        }
        if(memberDTO.getMemberLocal() != null) {
            member.changeLocal(memberDTO.getMemberLocal());
        }
        if(memberDTO.getMemberName() != null) {
            member.changeName(memberDTO.getMemberName());
        }
        if(memberDTO.getPassword() != null){
            member.changePw(memberDTO.getPassword()
            );
        }

        // 회원정보 수정
        memberRepository.save(member);
        String msg = "success";
        return msg;
    }

    // 회원 삭제
    @Override
    public void deleteMember(Long memberID) {
        memberRepository.deleteById(memberID);
    }

    // 회원 조회
    @Override
    public Member getMember(Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        return member.orElse(null);
    }

}

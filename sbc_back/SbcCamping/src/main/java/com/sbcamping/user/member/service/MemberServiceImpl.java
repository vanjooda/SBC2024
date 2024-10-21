package com.sbcamping.user.member.service;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.user.member.repository.MemberRepository;
import com.sbcamping.user.reservation.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    private final ReservationRepository reservationRepository;

    private final PasswordEncoder passwordEncoder;

    // 카카오 이메일 가져오는 메소드
    @Override
    public Map<String, String> getKakaoMember(String accessToken) {
        String email = getEmailFromKakaoAceessToken(accessToken);
        log.info("----------kakao email : " + email);
        String result = "none";
        Member member = memberRepository.findByMemberEmail(email);
        Map<String, String> map = new LinkedHashMap<>();
        if (member == null) {
            result = "fail";
            map.put("result", result);
            map.put("kakaoEmail", email);
        } else{
            result = "success";
            String memberEmail = member.getMemberEmail();
            map.put("member", memberEmail);
            map.put("memberEmail", memberEmail);
        }
        return map;
    }

    // 카카오 로그인 액세스 토큰
    private String getEmailFromKakaoAceessToken(String accessToken) {
        String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";
        if(accessToken == null){
            throw new RuntimeException("KAKAO ACCESS TOKEN IS NULL");
        }
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();

        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);
        log.info("--------getEmailFromKakaoAccessToken() response : " + response);

        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();
        LinkedHashMap<String, String> kakaoAccount = bodyMap.get("kakao_account");
        log.info("kakao Account : " + kakaoAccount);
        return kakaoAccount.get("email");
    }

    @Override
    public String withdraw(Long memberId, String memberPw) {
        log.info("------- withdraw memberId : " + memberId + " memberPw : " + memberPw.substring(7));
        Member member = memberRepository.findById(memberId).orElse(null);
        String password = member.getMemberPw();
        boolean result = passwordEncoder.matches(memberPw, password);
        String msg = null;

        // member를 찾을 수 없거나 비밀번호가 일치하지 않으면 fail
        if(result == false || member == null) {
            msg = "fail";
            return msg;
        }

        // 비밀번호가 일치하는 경우
        if (result) {
            List<Reservation> resList = reservationRepository.findByMemberId(memberId);
            LocalDate today = LocalDate.now();
            // 예약정보가 "예약완료"인 경우(예약취소는 제외)
            for(int i=0; i<resList.size(); i++) {
                Reservation reservation = resList.get(i);
                String status = reservation.getResStatus();
                if(status == "예약완료"){
                    LocalDate checkoutDate = reservation.getCheckoutDate();
                    // 퇴실일 날짜가 오늘보다 이후 날짜면 탈퇴 불가능
                    if(checkoutDate.isAfter(today)) {
                        msg = "fail";
                        return msg;
                    }
                }
            }
            member.changeStatus("OFF");
            memberRepository.save(member);
            msg = "success";
        }
        return msg;
    }

    // 예약 상태 변경
    @Override
    public void cancelRes(Long resId, String reason) {
        Reservation res = reservationRepository.findById(resId).orElse(null);
        res.setResStatus("예약취소");
        res.setResCancelDate(LocalDate.now());
        // 예약 취소 사유도 추가
        res.setResCancelReason(reason);
        reservationRepository.save(res);
    }

    // 예약 내역 상세 조회
    @Override
    public Reservation getResDetail(Long resId) {
        Reservation res = reservationRepository.findById(resId).orElse(null);
        log.info("res : " + res);
        return res;
    }

    // 예약내역 가져오기
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
        Member member = memberRepository.findById(memberId).orElse(null);
        String password = member.getMemberPw();
        boolean result = passwordEncoder.matches(memberPw, password);
        String msg = null;
        if(result == false || member == null) {
            msg = "fail";
        } else if(result){
            msg = "success";
        }
        return msg;
    }

    // 회원명 + 이메일로 회원 찾기 (비밀번호 찾기 1)
    @Override
    public Member findMemberByNameAndEmail(Member member) {
        Member memResult = memberRepository.findByMemberNameAndMemberEmail(member.getMemberName(), member.getMemberEmail());
        return memResult;
    }

    // 회원 비밀번호 변경 (비밀번호 찾기 2)
    @Override
    public String updatePw(Member mem) {
        // ID로 member 조회
        Member member = memberRepository.findById(mem.getMemberID()).orElse(null);
        String msg = null;
        if(member.getMemberPw() != null && member.getMemberEmail() != null){
            // 비밀번호 변경
            member.changePw(passwordEncoder.encode(member.getMemberPw()));
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

    // 카카오 회원 등록
    @Override
    public void kakaoAddMember(Member member) {
        String tempPw = makeTempPassword();
        member.changePw(passwordEncoder.encode(tempPw));
        Member mem = memberRepository.save(member);
        if(mem != null) {
            Long memID = mem.getMemberID();
            log.info("memID : " + memID);
        }
    }

    // 카카오 임시 회원번호(카카오는 비밀번호 알 수 없음)
    private String makeTempPassword(){
        StringBuffer buffer = new StringBuffer();
        for(int i = 0; i < 10; i++){
            buffer.append((char)((int)(Math.random()*55)+65));
        }
        return buffer.toString();
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
    public Member updateMember(Member newMember) {

        // 회원번호로 회원 조회
        Member member = memberRepository.findById(newMember.getMemberID()).get();

        // 수정할 값이 있으면 수정
        if(newMember.getMemberPhone() != null && (!newMember.getMemberPhone().equals(member.getMemberPhone()))) {
            member.changePhone(newMember.getMemberPhone());
            log.info("핸드폰 번호 수정");
        }
        if(newMember.getMemberBirth() != null && (!newMember.getMemberBirth().equals(member.getMemberBirth()))) {
            member.changeBirth(newMember.getMemberBirth());
            log.info("생년월일 수정");
        }
        Character gender = newMember.getMemberGender();
        if(gender != null && (!gender.equals(member.getMemberGender()))) {
            member.changeGender(newMember.getMemberGender());
            log.info("성별 수정");
        }
        if(newMember.getMemberLocal() != null && (!newMember.getMemberLocal().equals(member.getMemberLocal()))) {
            member.changeLocal(newMember.getMemberLocal());
            log.info("지역 수정");
        }
        if(newMember.getMemberName() != null && (!newMember.getMemberName().equals(member.getMemberName()))) {
            member.changeName(newMember.getMemberName());
            log.info("이름 수정");
        }
        if(newMember.getMemberPw() != null && newMember.getMemberPw() != "none" && (!passwordEncoder.matches(newMember.getMemberPw(), member.getMemberPw()))) {
            member.changePw(passwordEncoder.encode(newMember.getMemberPw()));
            log.info("비밀번호 수정");
        }

        // 회원정보 수정
        Member memResult = memberRepository.save(member);
        return memResult;
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

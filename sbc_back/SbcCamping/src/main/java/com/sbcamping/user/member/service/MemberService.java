package com.sbcamping.user.member.service;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.user.member.dto.MemberDTO;

import java.util.List;
import java.util.Map;

public interface MemberService {
    public void addMember(Member member);
    public Member updateMember(Member member);
    public void deleteMember(Long memberID);
    public Member getMember(Long memberId);
    public String emailCheck(String memberEmail);
    public String findEmail(String memberName, String memberPhone);
    public Member findMemberByNameAndEmail(Member member);
    public String updatePw(Member member);
    public String authPw(Long memberId, String memberPw);
    public List<Reservation> getMemberRes(Long memberId);
    public Reservation getResDetail(Long resId);
    public void cancelRes(Long resId, String reason);
    public String withdraw(Long memberId, String memberPw);
    public Map<String, String> getKakaoMember(String accessToken);
    public void kakaoAddMember(Member member);
}

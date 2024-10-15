package com.sbcamping.user.member.repository;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByMemberEmail(String email);

    // 이메일 중복체크
    Integer countByMemberEmail(String memberEmail);

    // 이름 & 핸드폰 번호로 회원 확인
    Member findByMemberNameAndMemberPhone(String memberName, String memberPhone);

    // 이름 & 이메일로 회원 확인
    Member findByMemberNameAndMemberEmail (String memberName, String memberEmail);

    // 예약 내역 가져오는 메소드
    Reservation findResulvationIDByMemberID(Long memberID);
}

package com.sbcamping.user.reservation.repository;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository <Reservation, Long> {
    
    // memberId를 사용하여 예약 내역 조회
    @Query("SELECT r FROM Reservation r WHERE r.member.memberID = :memberId")
    List<Reservation> findByMemberId(@Param("memberId") Long memberId);

}

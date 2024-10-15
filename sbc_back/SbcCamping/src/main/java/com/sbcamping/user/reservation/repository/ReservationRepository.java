package com.sbcamping.user.reservation.repository;

import com.sbcamping.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository <Reservation, Long> {

    @Query(value = """
            with date_range as (
                select res_id, checkin_date, checkout_date, site_id, 
                        checkin_date + (level - 1) as date_seq
                from reservation
                where site_id = :siteId
                connect by level <= checkout_date - checkin_date + 1
                        AND prior res_id = res_id
                        AND prior dbms_random.value is not null
            )
            select checkin_date, checkout_date, date_seq,
                    case
                        when date_seq < checkout_date then 'true'
                        else 'false'
                        END as result
            from date_range
            where date_seq = to_date(:date, 'YYYY-MM-DD')
        """, nativeQuery = true)
    public List<Object[]> getReservations(@Param("siteId") Long siteId, @Param("date")String setDate);

    // memberId를 사용하여 예약 내역 조회 (마이페이지 - 나의 예약내역)
    @Query("SELECT r FROM Reservation r WHERE r.member.memberID = :memberId")
    List<Reservation> findByMemberId(@Param("memberId") Long memberId);

}

package com.sbcamping.user.reservation.service;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.domain.Site;
import com.sbcamping.user.reservation.dto.ReservationDTO;
import lombok.With;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationService {

    Reservation register(ReservationDTO ReservationDTO);
    List<Site> getSite();
    List<Member> getMember();

}

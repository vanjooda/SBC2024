package com.sbcamping.user.camper.repository;

import com.sbcamping.domain.CamperBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CamperRepository extends JpaRepository<CamperBoard, Long> {
    @Query("SELECT c FROM CamperBoard c WHERE c.cBoardTitle LIKE %:keyword% OR c.cBoardContent LIKE %:keyword%")
    List<CamperBoard> findByKeyword(@Param("keyword") String keyword);
}

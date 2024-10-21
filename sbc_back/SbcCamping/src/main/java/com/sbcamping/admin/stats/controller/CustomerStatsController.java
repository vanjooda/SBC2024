package com.sbcamping.admin.stats.controller;

import com.sbcamping.admin.stats.dto.CustomerStatsReqDTO;
import com.sbcamping.admin.stats.service.CustomerStatsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/admin/stats/customer")
public class CustomerStatsController {

    @Autowired
    private final CustomerStatsService service;

    // 고객 통계 : 기간별 조회 - 성별 /gender, 연령별 /age, 지역별 / local
    @GetMapping("/all")
    public ResponseEntity<?> getAllCustomerStats(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam String dateType,
            @RequestParam(required = false) Long siteId
    ) {
        try {
            log.info("Received request - dateType: {}, startDate: {}, endDate: {}, siteId: {}",
                    dateType, startDate, endDate, siteId);

            LocalDate start = startDate;
            LocalDate end;

            switch (dateType) {
                case "day":
                    end = endDate != null ? endDate : start;
                    break;
                case "month":
                    YearMonth yearMonth = YearMonth.from(start);
                    end = yearMonth.atEndOfMonth();
                    break;
                case "year":
                    end = start.withMonth(12).withDayOfMonth(31);
                    break;
                default:
                    return ResponseEntity.badRequest().body("Invalid date type");
            }

            Map<String, Object> allStats = service.getAllCustomerStats(startDate, endDate, dateType, siteId);
            log.info(allStats);
            return ResponseEntity.ok(allStats);

        } catch (Exception e) {
            log.error("Error processing customer stats", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing customer stats: " + e.getMessage());
        }
    }

    // 2-1 누적 예약 고객수, 일 평균 예약 고객수, 재예약 고객 비율
    // 2-4 최다 예약 & 최다 취소 고객 명단 /performance

    // 2-5 고객 리뷰 현황
    @GetMapping("/reviews")
    public ResponseEntity<?> getReviewStats(
            @RequestParam String dateType,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long siteId
    ) {
        try {
            log.info("Received request - dateType: {}, startDate: {}, endDate: {}, siteId: {}",
                    dateType, startDate, endDate, siteId);

            LocalDate start = startDate;
            LocalDate end;

            switch (dateType) {
                case "day":
                    end = endDate != null ? endDate : start;
                    break;
                case "month":
                    YearMonth yearMonth = YearMonth.from(start);
                    end = yearMonth.atEndOfMonth();
                    break;
                case "year":
                    end = start.withMonth(12).withDayOfMonth(31);
                    break;
                default:
                    return ResponseEntity.badRequest().body("Invalid date type");
            }

            List<CustomerStatsReqDTO> result = service.reviews(start, end, siteId, dateType);

            log.info("Processed {} review stats", result.size());

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Error processing review stats", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing review stats: " + e.getMessage());
        }
    }

}

package com.sbcamping.user.camper.controller;

import com.sbcamping.admin.qna.dto.QnaDTO;
import com.sbcamping.common.util.CustomFileUtil;
import com.sbcamping.domain.CamperBoard;
import com.sbcamping.user.camper.dto.CamperBoardDTO;
import com.sbcamping.user.camper.dto.PageRequestDTO;
import com.sbcamping.user.camper.dto.PageResponseDTO;
import com.sbcamping.user.camper.service.CamperService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/campers")
public class CamperController {
    private final CamperService camperService;
    private final CustomFileUtil fileUtil;

    // 게시글 목록
    @GetMapping("/list")
    public PageResponseDTO<CamperBoardDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("list campers");
        log.info(pageRequestDTO.toString());
        return camperService.list(pageRequestDTO);
    }

    // 게시글 상세 (model.mapper없이 구현)
    @GetMapping("/{cBoardId}")
    public CamperBoard get(@PathVariable Long cBoardId) {
        CamperBoard article = camperService.get(cBoardId);
        log.info("상세정보" + article);
        return article;
    }

    // 게시글 수정
    @PutMapping("/{cBoardId}")
    public ResponseEntity<CamperBoardDTO> modify(@PathVariable Long cBoardId, @RequestBody CamperBoardDTO camperBoardDTO) {
        // URL로 전달된 cBoardId를 DTO에 설정
        camperBoardDTO.setCBoardID(cBoardId);
        // 서비스 호출하여 수정 작업 수행
        camperService.modify(camperBoardDTO);
        // 수정된 DTO 반환
        return ResponseEntity.ok(camperBoardDTO);
    }

    // 등록
//    @PreAuthorize("ROLE_USER")
    @PostMapping("/")
    public Map<String, Long> register(CamperBoardDTO camperBoardDTO) {
        log.info("register............." + camperBoardDTO);
        MultipartFile file = camperBoardDTO.getFile();
        String uploadFileName = fileUtil.saveFile(file);
        camperBoardDTO.setCBoardAttachment(uploadFileName);
        log.info(uploadFileName);

        Long cBoardId = camperService.register(camperBoardDTO);
        return Map.of("RESULT", cBoardId);
    }

    // 게시글 삭제
    @DeleteMapping("/{cBoardId}")
    public void remove(@PathVariable Long cBoardId) {
        camperService.remove(cBoardId);
    }
    // 이미지 파일 보여주기
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
        log.info("파일 요청: " + fileName);
        return fileUtil.getFile(fileName);
    }
}
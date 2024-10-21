package com.sbcamping.user.camper.service;


import com.sbcamping.domain.CamperBoard;
import com.sbcamping.user.camper.dto.CamperBoardDTO;
import com.sbcamping.user.camper.dto.PageRequestDTO;
import com.sbcamping.user.camper.dto.PageResponseDTO;
import com.sbcamping.user.camper.dto.SearchDTO;

import java.util.List;

public interface CamperService {
    Long register(CamperBoardDTO camperBoardDTO); //등록
    CamperBoard get(Long cBoardId); //? 상세보기
    void modify(CamperBoardDTO camperBoardDTO); //수정
    void remove(Long cBoardId); //삭제
    PageResponseDTO<CamperBoardDTO> list(PageRequestDTO pageRequestDTO); //목록
    List<CamperBoardDTO> search(SearchDTO searchDTO); //검색
}

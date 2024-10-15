package com.sbcamping.user.camper.service;

import com.sbcamping.domain.CamperBoard;
import com.sbcamping.exception.NoResultsFoundException;
import com.sbcamping.user.camper.dto.CamperBoardDTO;
import com.sbcamping.user.camper.dto.PageRequestDTO;
import com.sbcamping.user.camper.dto.PageResponseDTO;
import com.sbcamping.user.camper.dto.SearchDTO;
import com.sbcamping.user.camper.repository.CamperRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
// 생성자 자동 주입
@RequiredArgsConstructor
public class CamperServiceImpl implements CamperService {

    //자동 주입 대상은 final
    private final ModelMapper modelMapper;
    private final CamperRepository camperRepository;

    //생성
    @Override
    public Long register(CamperBoardDTO camperBoardDTO) {
        log.info(".........");

        CamperBoard camperBoard = modelMapper.map(camperBoardDTO, CamperBoard.class);
        CamperBoard savedCamperBoard = camperRepository.save(camperBoard);

        return savedCamperBoard.getCBoardID();
    }

    @Override
    public CamperBoard get(Long cBoardId) {
        CamperBoard camperBoard = camperRepository.findById(cBoardId)
                .orElseThrow(() -> new NoResultsFoundException("해당 캠퍼 보드를 찾을 수 없습니다."));

        CamperBoardDTO camperBoardDTO = modelMapper.map(camperBoard, CamperBoardDTO.class);

        return camperBoard;
    }
    //model.mapper없이 구현
//    @Override
//    public CamperBoard get(Long cBoardId) {
//        CamperBoard camperBoard = camperRepository.findById(cBoardId).orElseThrow();
//        return camperBoard;
//    }

    @Override
    public void modify(CamperBoardDTO camperBoardDTO) {
        Optional<CamperBoard> result = camperRepository.findById(camperBoardDTO.getCBoardID());

        CamperBoard camperBoard = result.orElseThrow(null);

        if (camperBoardDTO.getCBoardCategory() != null) {
            camperBoard.changeCategory(camperBoardDTO.getCBoardCategory());
        }

        if (camperBoardDTO.getCBoardTitle() != null) {
            camperBoard.changeTitle(camperBoardDTO.getCBoardTitle());
        }

        if (camperBoardDTO.getCBoardContent() != null) {
            camperBoard.changeContent(camperBoardDTO.getCBoardContent());
        }




        camperRepository.save(camperBoard);
    }

    @Override
    public void remove(Long cBoardId) {
        camperRepository.deleteById(cBoardId);
    }

    @Override
    public PageResponseDTO<CamperBoardDTO> list(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() -1, //1페이지가 0이므로 주의
                pageRequestDTO.getSize(), Sort.by("cBoardID").descending());

        Page<CamperBoard> result = camperRepository.findAll(pageable);

        List<CamperBoardDTO> dtoList = result.getContent().stream().map(camperBoard ->
                modelMapper.map(camperBoard, CamperBoardDTO.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<CamperBoardDTO> responseDTO = PageResponseDTO.<CamperBoardDTO>withAll()
                .dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

        return responseDTO;
    }

    @Override
    public List<CamperBoardDTO> search(SearchDTO searchDTO) {
        List<CamperBoard> camperBoards = camperRepository.findByKeyword(searchDTO.getKeyword());
        //검색 결과가 비어있을 때 예외 설정
        if (camperBoards.isEmpty()) {
            throw new NoResultsFoundException("검색 결과가 없습니다.");
        }

        return camperBoards.stream()
                .map(camperBoard -> CamperBoardDTO.builder()
                        .cBoardID(camperBoard.getCBoardID())
                        .member(camperBoard.getMember())
                        .cBoardCategory(camperBoard.getCBoardCategory())
                        .cBoardTitle(camperBoard.getCBoardTitle())
                        .cBoardContent(camperBoard.getCBoardContent())
                        .cBoardViews(camperBoard.getCBoardViews())
                        .cBoardDate(camperBoard.getCBoardDate())
                        .cBoardAttachment(camperBoard.getCBoardAttachment())
                        .build())
                .collect(Collectors.toList());
    }

}
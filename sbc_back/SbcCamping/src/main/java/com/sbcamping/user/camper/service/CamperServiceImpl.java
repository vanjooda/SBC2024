package com.sbcamping.user.camper.service;

import com.sbcamping.common.jwt.JWTUtil;
import com.sbcamping.domain.CamperBoard;
import com.sbcamping.domain.CamperBoardComment;
import com.sbcamping.domain.Member;
import com.sbcamping.exception.NoResultsFoundException;
import com.sbcamping.user.camper.dto.*;
import com.sbcamping.user.camper.repository.CamperCommentRepository;
import com.sbcamping.user.camper.repository.CamperRepository;
import com.sbcamping.user.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CamperServiceImpl implements CamperService {

    private final ModelMapper modelMapper;
    private final CamperRepository camperRepository;
    private final CamperCommentRepository commentRepository;
    private final MemberRepository memberRepository;

    private final String ROLE_ADMIN = "ROLE_ADMIN";
    private final String TITLE = "title";
    private final String CONTENT = "content";

    @Override
    public Long register(CamperBoardDTO camperBoardDTO) {
        CamperBoard camperBoard = modelMapper.map(camperBoardDTO, CamperBoard.class);
        log.info(camperBoard.toString());
        CamperBoard savedCamperBoard = camperRepository.save(camperBoard);

        return savedCamperBoard.getCBoardID();
    }

    @Override
    public CamperBoard get(Long cBoardId) {
        CamperBoard camperBoard = camperRepository.findById(cBoardId)
                .orElseThrow(() -> new NoResultsFoundException("해당 캠퍼 보드를 찾을 수 없습니다."));

        camperBoard.changeViews(camperBoard.getCBoardViews() + 1);

        camperRepository.save(camperBoard);

        return camperBoard;
    }

    @Override
    public void modify(CamperBoardDTO camperBoardDTO) {
        // 2. change : category,title, content, file
        String updatedCategory = camperBoardDTO.getCBoardCategory();
        String updatedTitle = camperBoardDTO.getCBoardTitle();
        String updatedContent = camperBoardDTO.getCBoardContent();
        String updatedAttachment = camperBoardDTO.getCBoardAttachment();


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

        if (camperBoardDTO.getCBoardAttachment() != null) {
            camperBoard.changeAttachment(camperBoardDTO.getCBoardAttachment());
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
                pageRequestDTO.getPage() - 1, //1페이지가 0이므로 주의
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
    public PageResponseDTO<CamperBoardDTO> search(
            PageRequestDTO requestDTO, String type, String keyword
    ) {
        Pageable pageable;
        Page<CamperBoard> res;

        if (keyword != null) {
            pageable = PageRequest.of(
                    requestDTO.getPage() - 1,
                    requestDTO.getSize(), Sort.by("cBoardID").descending());

            res = switch (type) {
                case TITLE -> camperRepository.findBycBoardTitleContaining(keyword, pageable);
                case CONTENT -> camperRepository.findBycBoardContentContaining(keyword, pageable);
                default -> null;
            };

        } else {
            pageable = PageRequest.of(
                    requestDTO.getPage() - 1,
                    requestDTO.getSize(),
                    Sort.by("cBoardID").descending()
            );
            res = camperRepository.orderdList(pageable);
        }

        long totalCount = res.getTotalElements();

        List<CamperBoardDTO> dtoList = res.getContent().stream().map(qna -> modelMapper.map(qna, CamperBoardDTO.class)).collect(Collectors.toList());

        return PageResponseDTO.<CamperBoardDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(requestDTO)
                .build();
    }

    @Override
    public List<CamperBoardCommentResDTO> getCommentList(Long boardId) {
        List<CamperBoardComment> getList = commentRepository.getCommentList(boardId);
        List<CamperBoardCommentResDTO> result = getList.stream()
                .map(c -> modelMapper.map(c, CamperBoardCommentResDTO.class))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public Long registerComment(
            String auth,
            String refreshToken,
            CamperBoardCommentDTO dto
    ) {
        Member member = this.getMemberInfo(auth, refreshToken);
        String memberRole = member.getMemberRole();

        Optional<CamperBoard> camperBoardOpt = camperRepository.findById(dto.getBoardId());
        if (camperBoardOpt.isPresent()) {
            CamperBoard camperBoard = camperBoardOpt.get();


            return commentRepository.save(
                    CamperBoardComment.builder()
                            .member(member)
                            .cBoard(camperBoard)
                            .cCommentContent(dto.getCCommentContent())
                            .cCommentDate(LocalDate.now())
                            .build()
            ).getCCommentID();
        } else {
            return 0L;
        }
    }

    @Override
    public void modifyComment(CamperBoardCommentDTO dto) {
        Optional<CamperBoardComment> result = commentRepository.findById(dto.getCommentId());
        CamperBoardComment camperBoardComment = result.orElseThrow();

        String updatedContent = dto.getCCommentContent();
        if (StringUtils.hasText(updatedContent)) {
            camperBoardComment.setCCommentContent(updatedContent);
        }

        camperBoardComment.setCCommentDate(LocalDate.now());

        commentRepository.save(camperBoardComment);
    }

    @Override
    public void removeComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    private Member getMemberInfo(String auth, String refreshToken) {
        String accessToken = auth.substring(7);
        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);
        Map<String, Object> memberClaims = (Map<String, Object>) claims.get("member");
        String memberEmail = (String) memberClaims.get("memberEmail");
        return memberRepository.findByMemberEmail(memberEmail);
    }
}

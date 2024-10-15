package com.sbcamping.user.camper.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sbcamping.domain.Member;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CamperBoardDTO {
    private Long cBoardID; // 필드 이름 변경
    private Member member; //회원번호 fk

    // 수정가능한 내용
    private String cBoardCategory; //캠퍼 게시글 말머리
    private String cBoardTitle;    //캠퍼 게시판 글 제목
    private String cBoardContent;  //캠퍼 게시판 글 내용
    private Long cBoardViews; //게시글 조회수
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate cBoardDate; //캠퍼게시판 게시글 작성일자
    private String cBoardAttachment; //파일 첨부여부(url,링크)
    MultipartFile file;
}
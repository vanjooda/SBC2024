package com.sbcamping.user.camper.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CamperBoardCommentDTO {
    private Long boardId;
    private Long commentId;

    @JsonProperty("cCommentContent")
    private String cCommentContent;

    private LocalDate cCommentDate;
    private char qBoardIsAdmin;
}

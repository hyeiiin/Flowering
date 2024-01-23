package com.sail.back.community.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CommunityErrorCode {
    DEFAULT("F", HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}

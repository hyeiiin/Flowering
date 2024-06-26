package com.sail.back.report.model.dto.request.analysis;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CoordinateDto {
    @JsonProperty("y")
    int y;
    @JsonProperty("x")
    int x;
}

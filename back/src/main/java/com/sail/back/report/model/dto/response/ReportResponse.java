package com.sail.back.report.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sail.back.consulting.model.dto.response.ConsultingResponse;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@Builder
public class ReportResponse {

    private Long reportId;

    private ReportClearStepResponse clearStep;

    private ConsultingResponse consultingData;

    private SurveyResponse surveyData;

    private AnalysisResponse analysisData;

    private ExpertOpinionResponse expertOpinionData;

}

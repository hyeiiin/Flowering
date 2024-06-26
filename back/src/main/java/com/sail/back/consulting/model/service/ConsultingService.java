package com.sail.back.consulting.model.service;

import com.sail.back.consultant.exception.ConsultantErrorCode;
import com.sail.back.consultant.exception.ConsultantException;
import com.sail.back.consultant.model.entity.*;
import com.sail.back.consultant.model.repository.ConsultantRepository;
import com.sail.back.consulting.exception.ConsultingErrorCode;
import com.sail.back.consulting.exception.ConsultingException;
import com.sail.back.consulting.model.dto.request.ConsultingCreateRequest;
import com.sail.back.consulting.model.dto.request.ConsultingUpdateRequest;
import com.sail.back.consulting.model.dto.response.ConsultingCreateResponse;
import com.sail.back.consulting.model.dto.response.ConsultingIsActiveResponse;
import com.sail.back.consulting.model.dto.response.ConsultingResponse;
import com.sail.back.consulting.model.entity.Consulting;
//import com.sail.back.consulting.model.repository.ConsultingRepository;
import com.sail.back.consulting.model.repository.ConsultingRepository;
import com.sail.back.global.exception.base.*;
import com.sail.back.global.utils.MessageUtils;
import com.sail.back.report.model.entity.Report;
import com.sail.back.report.model.repository.ReportRepository;
import com.sail.back.report.model.service.ReportService;
import com.sail.back.user.exception.UserErrorCode;
import com.sail.back.user.exception.UserException;
import com.sail.back.user.model.entity.User;
import com.sail.back.user.model.entity.enums.UserRole;
import com.sail.back.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConsultingService {

    private static final String CUSTOMER_NOT_FOUND = "해당 고객을 찾을 수 없습니다.";
    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";
    private static final String RESERVATION_NOT_FOUND = "해당 예약을 찾을 수 없습니다.";
    private static final String WRONG_ACCESS = "잘못된 접근입니다.";
    private static final String RESERVATION_DELETED = "이미 취소된 예약입니다.";
    private static final String RESERVATION_DUPLICATED = "해당 시간에 이미 예약이 존재합니다.";

    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;
    private final ConsultingRepository consultingRepository;
    private final ReportRepository reportRepository;

    public ConsultingResponse createReservation(String role, Long userId, Long consultantId, ConsultingCreateRequest consultingCreateRequest) {

        if (UserRole.CONSULTANT.equals(role)) {
            throw new ConsultingException(ConsultingErrorCode.IS_CONSULTANT);
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        //자기가 자신과 상담잡는 경우 예외처리
        if (user.getId() == consultant.getUser().getId()) {
            throw new ConsultingException(ConsultingErrorCode.MYSELF);
        }

        //
//        Consulting consulting = consultingRepository.
//                findByConsultantAndTime(consultant, consultingCreateRequest.getTime()).ifPresent(() ->value
//                        new ConsultantException(ConsultantErrorCode.NOT_EXISTS_TIME));
        //이미 전문가가 이시간에 일정이 있는경우
        Optional<Consulting> consultingOptional = consultingRepository.findByConsultantAndDateAndTime(consultant, consultingCreateRequest.getDate(), consultingCreateRequest.getTime());
        if (consultingOptional.isPresent()) {
            throw new ConsultingException(ConsultingErrorCode.CONSULTANT_HAVE_CONSULTING);
        }


        Optional<List<Consulting>> consultingListOptional = consultingRepository.findAllByUserIdAndDateAndTime(userId, consultingCreateRequest.getDate(), consultingCreateRequest.getTime());

        if (consultingListOptional.isPresent() && !consultingListOptional.get().isEmpty()) {
            throw new ConsultingException(ConsultingErrorCode.HAVE_CONSULTING);
        }
//
//        List<Consulting> consultingList = consultingRepository.
//                findAllByUserIdAndTime(userId, consultingCreateRequest.getTime()).ifPresent((value -> {
//                    throw new ConsultingException(ConsultingErrorCode.HAVE_CONSULTING);
//                }));


        Consulting consulting = consultingCreateRequest.toEntity();

        consulting.create(user, consultant, consultingCreateRequest);

        Consulting savedConsulting = consultingRepository.save(consulting);


        reportRepository.save(Report.builder()
                .consulting(savedConsulting)

                .build());

        return savedConsulting.toResponse();
    }


    @Transactional
    public MessageUtils deleteReservation(Long customerId, Long reservationId) {

        Consulting reservation = consultingRepository.findById(reservationId)
                .orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));

        User user = userRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        if (!user.equals(reservation.getUser())) {
            throw new WrongAccessException(WRONG_ACCESS);
        }

        consultingRepository.delete(reservation);

        return MessageUtils.success(reservation, "200", "success");
    }

    public ConsultingResponse getReservation(Long consultingId) {
        Consulting consulting = consultingRepository.findById(consultingId).orElseThrow(() -> new ConsultingException(ConsultingErrorCode.NOT_EXISTS_CONSULTING));
        ConsultingResponse consultingResponse = consulting.toResponse();
        return consultingResponse;
    }

    public MessageUtils activateReservation(User user, Long consultingId) {
        Consultant consultant = consultantRepository.findByUser(user).orElseThrow(() -> new ConsultantException(ConsultantErrorCode.NOT_EXISTS_CONSULTANT));

        Consulting consulting = consultingRepository.findById(consultingId).orElseThrow(() -> new ConsultingException(ConsultingErrorCode.NOT_EXISTS_CONSULTING));

        consulting.setActive(true);

        consultingRepository.save(consulting);

        return MessageUtils.success("activated", "200", "success");
    }

    public MessageUtils deactivateReservation(User user, Long consultingId) {

        Consulting consulting = consultingRepository.findById(consultingId).orElseThrow(() -> new ConsultingException(ConsultingErrorCode.NOT_EXISTS_CONSULTING));

        consulting.setActive(false);

        consultingRepository.save(consulting);

        return MessageUtils.success("deactivated", "200", "success");

    }

    public MessageUtils modifyReservation(Long consultingId, LocalDate date, LocalTime time) {
        Consulting consulting = consultingRepository.findById(consultingId).orElseThrow(() -> new ConsultingException(ConsultingErrorCode.NOT_EXISTS_CONSULTING));

        consulting.setdate(date);
        consulting.settime(time);
        consultingRepository.save(consulting);
        return MessageUtils.success("modifyReservation", "200", "success");

    }

    public List<Consulting> getReservationbydate(LocalDate date) {
        List<Consulting> consulting = consultingRepository.findAllByDate(date).orElseThrow(() -> new ConsultingException(ConsultingErrorCode.NOT_EXISTS_TIME));

        return consulting;

    }

//
//    public List<Consulting> getcustomerreservations(Long userid) {
//        List<Consulting> consultings = consultingRepository.
//                findAllByUserId(userid).orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));
//
//        consultings.stream()
//                .sorted(Comparator.comparing(Consulting::getTime).reversed());
//
//        return consultings;
//    }
//
//
//    public ResponseEntity<MessageUtils> updateconsulting(Long consultingid, ConsultingUpdateRequest consultingUpdateRequest) {
//        Consulting consulting = consultingRepository.
//                findById(consultingid).orElseThrow(() -> new NotFoundException("컨설팅 정보가없습니다"));
//
//        consultingRepository.save(consulting);
//
//        return ResponseEntity.ok(MessageUtils.success());
//    }

}

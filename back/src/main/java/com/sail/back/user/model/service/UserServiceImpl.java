package com.sail.back.user.model.service;

import com.sail.back.consulting.model.entity.Consulting;
import com.sail.back.consulting.model.repository.ConsultingRepository;
import com.sail.back.user.exception.UserErrorCode;
import com.sail.back.user.exception.UserException;
import com.sail.back.user.model.dto.request.FindRequest;
import com.sail.back.user.model.dto.request.UserRegistRequest;
import com.sail.back.user.model.dto.request.UserUpdateRequest;
import com.sail.back.user.model.dto.response.MyConsultinglistResponse;
import com.sail.back.user.model.dto.response.UserResponse;
import com.sail.back.user.model.entity.User;
import com.sail.back.user.model.entity.enums.AuthProvider;
import com.sail.back.user.model.entity.enums.UserRole;
import com.sail.back.user.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service("userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ConsultingRepository consultingRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void registUser(UserRegistRequest request, UserRole role, AuthProvider provider) {
        userRepository.findByEmail(request.getEmail()).ifPresent(value -> {
            throw new UserException(UserErrorCode.ALREADY_IN_EMAIL);
        });
        userRepository.save(request.createUser(passwordEncoder, role, provider));
    }

    @Override
    public UserResponse infoUser(FindRequest findRequest, User user) {
        return findRequest.toResponse(user);
    }

    @Override
    public void withdrawUser(User user) {
        userRepository.delete(user);
    }

    @Override
    @Transactional
    public void updateUser(UserUpdateRequest request, User user) {
        if (request.getBirthdateYear() != null) user.setBirthdateYear(request.getBirthdateYear());
        if (request.getBirthdateMonth() != null) user.setBirthdateMonth(request.getBirthdateMonth());
        if (request.getGender() != null) user.setGender(request.getGender());
        if (request.getName() != null) user.setName(request.getName());
        if (request.getRole() != null) user.setRole(request.getRole());
        if (request.getNickName() != null) user.setNickname(request.getNickName());
        if (request.getStatus() != null) user.setStatus(request.getStatus());
        if (request.getProfileImgUrl() != null) user.setProfileImgUrl(request.getProfileImgUrl());
        if (request.getPassword() != null) user.setPassword(passwordEncoder.encode(request.getPassword()));
        System.out.println("user"+user);

        userRepository.save(user);
    }

    @Override
    public List<MyConsultinglistResponse> myconsultinglist(Long id, LocalDateTime localDateTime) {

        StringBuilder sb=new StringBuilder();
        sb.append(localDateTime);

        String []str=sb.toString().split("T");
        List<Consulting> consultings = consultingRepository.findAllByUserIdAndDateAndTime(id, LocalDate.parse(str[0]) , LocalTime.parse(str[1]) ).orElseThrow(() -> new UserException(UserErrorCode.NO_CONSULTING_AVAILABLE));


        return consultings.stream().map(Consulting::from).collect(Collectors.toList());

    }

    @Override
    public List<MyConsultinglistResponse> myallconsultinglist(Long id) {

        List<Consulting> consultings = consultingRepository.findAllByUserId(id).orElseThrow(() -> new UserException(UserErrorCode.NO_CONSULTING_AVAILABLE));

        return consultings.stream().map(Consulting::from).collect(Collectors.toList());
    }

}

package com.sail.back.consultant.model.entity;

import com.sail.back.consultant.model.dto.response.ConsultantDetailResponse;
import com.sail.back.consultant.model.dto.response.ConsultantListResponse;
import com.sail.back.consultant.model.dto.response.ConsultantResponse;
import com.sail.back.hashtag.model.dto.response.HashTagResponse;
import com.sail.back.hashtag.model.entity.HashTag;
import com.sail.back.review.model.entity.Review;
import com.sail.back.user.model.dto.request.FindRequest;
import com.sail.back.user.model.dto.response.UserResponse;
import com.sail.back.user.model.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "consultants")
@Builder
@AllArgsConstructor

public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consultant_id;

    private String self_introduce;

    private String simple_introduce;

    @OneToMany(mappedBy = "consultant", cascade = CascadeType.ALL)
    private List<HashTag> hashTags = new ArrayList<>();


    private double starAverage;
    private int reviewnum;


    @OneToMany(mappedBy = "consultant")
    private List<Review> reviews;


    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // HashTag을 Consultant에 추가하는 메서드
    public void addHashTag(HashTag hashTag) {
        hashTags.add(hashTag);
        hashTag.setConsultant(this);
    }

//
//    public double getStarAverage() {
//
//        if (reviews == null || reviews.isEmpty()) {
//            return 0;
//        }
//
//        int sum = 0;
//        for (Review review : reviews) {
//            sum += review.getStar();
//        }
//        return (double) sum / reviews.size();
//    }
//
//
//    public int getReviewnum() {
//
//        if (reviews == null || reviews.isEmpty()) {
//            return 0;
//        }
//
//        return reviews.size();
//    }

    public void setStarAverage(double starAverage) {
        this.starAverage = starAverage;
    }

    public void setReviewnum(int reviewnum) {
        this.reviewnum = reviewnum;
    }

    public void update(User user, String self_introduce, String simple_introduce, List<HashTag> hashtag) {
        this.user = user;
        this.self_introduce = self_introduce;
        this.simple_introduce = simple_introduce;
        this.hashTags = hashtag;
    }

    public static ConsultantDetailResponse toConsultantDetailResponse(Consultant consultant) {
        ConsultantDetailResponse consultantDetailResponse = ConsultantDetailResponse.builder()
                .consultant_id(consultant.getConsultant_id())
                .self_introduce(consultant.getSelf_introduce())
                .simple_introduce(consultant.getSimple_introduce())
                .userResponse(consultant.getUser().toResponse())
                .star(consultant.getStarAverage())
                .num(consultant.getReviewnum())
                .build();

//        consultantDetailResponse.setProfileImgUrl(consultant.getUser().getProfileImgUrl());
        return consultantDetailResponse;
    }

    public ConsultantListResponse from(Consultant consultant) {
        return ConsultantListResponse.builder()
                .consultant_id(consultant.consultant_id)
                .self_introduce(consultant.self_introduce)
                .simple_introduce(consultant.simple_introduce)
                .userResponse(consultant.user.toResponse())
                .star(consultant.getStarAverage())
                .reviewnum(consultant.getReviewnum())
                .hashTagResponses(consultant.getHashTags().stream().map(HashTag::toHashTagResponse).collect(Collectors.toList()))
                .build();

    }

    public ConsultantResponse toResponse() {
        FindRequest findRequest = FindRequest.builder().
                id(true)
                .role(true)
                .gender(true)
                .nickname(true)
                .email(true)
                .birthdate_month(true)
                .birthdate_year(true)
                .status(true)
                .profile_img_url(true)

                .build();

        return ConsultantResponse.builder()
                .consultantId(this.consultant_id)
                .userResponse(this.user.toResponse())
                .selfIntroduce(this.self_introduce)
                .simpleIntroduce(this.simple_introduce)
                .star(this.getStarAverage())
                .reviewnum(this.getReviewnum())
                .build();
    }

}

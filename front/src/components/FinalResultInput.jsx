import React, { useState } from "react";
import Input from "./common/Input";
import { IoMdSearch } from "react-icons/io";
import styled from "styled-components";
import { ButtonBox } from "./common/Button";
import Search from "./modals/Search";
import axios from "axios";
import ProductList from "./FinalResultInput/ProductList";
import { useSelector } from "react-redux";

const MyButton = styled(ButtonBox)`
  border-radius: 300px;
  margin: 80px;
  width: 230.145px;
  height: 59.143px;
`;

const MyButton1 = styled(ButtonBox)`
  background-color: gray;
  border-color: gray;
  border-radius: 300px;
  margin: 80px;
  width: 230.145px;
  height: 59.143px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 100px;
`;

const Consulting1stepresultpage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 5%;
`;

const ConsultingContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Margin = styled.div`
  margin: 10px;
`;
const Margin2 = styled.div`
  margin-top: 50px;
`;

const H3 = styled.h3`
  text-align: justify;
  font-family: "Noto Sans KR";
`;

const H2 = styled.h2`
  text-align: justify;
  font-family: "Noto Sans KR";
  font-size: 35px;
`;

const Put = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const InputSet = styled.div`
  display: flex;
`;

const ModalBox = styled.div`
  display: flex;
  align-items: center;
  border-color: "#B1B1B1";
  border-width: 1px;
  border-radius: 5px;
  border-style: groove;
`;

const ReviewInput = styled.textarea`
  width: 1290px;
  height: 120px;
  padding: 10px;
  /* margin-left: 180px; */
  font-family: "Noto Sans KR";
  font-size: 16px;
  border: 1px solid #8e8c8c;
  border-radius: 5px;
  resize: none;
  font-size: 14px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #b7b5b5;
  }
`;

const FinalresultInput = () => {
  // 각 Input에 대한 상태(state) 정의
  const [skinCondition, setSkinCondition] = useState("");
  const [morningSkincareRoutine, setMorningSkincareRoutine] = useState("");
  const [eveningSkincareRoutine, setEveningSkincareRoutine] = useState("");

  // 메이크업에 대한 상태(state) 정의
  const [faceType, setFaceType] = useState("");
  const [faceMood, setFaceMood] = useState("");
  const [faceMakeup, setFaceMakeup] = useState("");
  const [eyeMakeup, setEyeMakeup] = useState("");
  const [lipMakeup, setLipMakeup] = useState("");
  const [blusher, setBlusher] = useState("");
  const [shading, setShading] = useState("");
  const [highlighting, setHighlighting] = useState("");

  // 헤어스타일에 대한 상태(state) 정의
  const [hairColor, setHairColor] = useState("");
  const [hairStyle, setHairStyle] = useState("");

  // ReviewInput에 대한 상태(state) 정의
  const [skincareSolution, setSkincareSolution] = useState("");
  const [makeupSolution, setMakeupSolution] = useState("");
  const [hairstyleSolution, setHairstyleSolution] = useState("");

  const [productList, setProductList] = useState(null);

  const Token = useSelector((state) => state.auth.logonUser);

  // 값이 변경될 때마다 호출되는 함수
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // axios를 사용하여 서버로 데이터 전송
      const response = await axios.post("http://i10c106.p.ssafy.io/api/v1/expert-opinion/save/1", {
        data: {
          skincare_skin_state: `${skinCondition}`,
          skincare_solution: `${skincareSolution}`,
          skincare_morning: `${morningSkincareRoutine}`,
          skincare_night: `${eveningSkincareRoutine}`,
          makeup_facetype: `${faceType}`,
          makeup_facialexpression: `${faceMood}`,
          makeup_solution: `${makeupSolution}`,
          makeup_shading: `${shading}`,
          makeup_blusher: `${blusher}`,
          makeup_highlighting: `${highlighting}`,
          makeup_lipmakeup: `${lipMakeup}`,
          makeup_eyemakeup: `${eyeMakeup}`,
          makeup_skinmakeup: `${faceMakeup}`,
          hairstyle_haircolor: `${hairColor}`,
          hairstyle_hairstyle: `${hairStyle}`,
          hairstyle_solution: `${hairstyleSolution}`,
          product_list: productList,
        },
        headers: {
          Authorization: `Bearer ${Token.access_token}`,
        },
      });
      console.log(response.data); // 성공적으로 데이터를 보낸 후 서버의 응답을 로그에 기록
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Consulting1stepresultpage>
      <ConsultingContent>
        <Margin />
        <H2>스킨케어</H2>
        <InputSet>
          <H3>피부 상태 |</H3>
          <Put>
            <Input width={"1175px"} value={skinCondition} onChange={(e) => handleInputChange(e, setSkinCondition)} placeholder="피부상태를 입력하세요" />
          </Put>
        </InputSet>
        <Margin2 />
        {/* <hr /> */}
        <H3>전문가 솔루션</H3>
        <ReviewInput placeholder="솔루션을 입력해주세요" value={skincareSolution} onChange={(e) => handleInputChange(e, setSkincareSolution)} />
        <InputSet>
          <H3>아침 :</H3>
          <Put>
            <Input
              width={"1215px"}
              value={morningSkincareRoutine}
              onChange={(e) => handleInputChange(e, setMorningSkincareRoutine)}
              placeholder="아침 스킨케어 루틴을 입력하세요"
            />
          </Put>
        </InputSet>
        <InputSet>
          <H3>저녁 :</H3>
          <Put>
            <Input
              width={"1215px"}
              value={eveningSkincareRoutine}
              onChange={(e) => handleInputChange(e, setEveningSkincareRoutine)}
              placeholder="저녁 스킨케어 루틴을 입력하세요"
            />
          </Put>
        </InputSet>
        <Margin2 />
        <ModalBox>
          <H3>
            <IoMdSearch />
          </H3>
          <Put>
            <Search title={"스킨케어"} />
          </Put>
        </ModalBox>
        <Margin2 />
        <Margin />
        <H2>메이크업</H2>
        <InputSet>
          <H3>얼굴 유형 |</H3>
          <Put>
            <Input width={"1175px"} value={faceType} onChange={(e) => handleInputChange(e, setFaceType)} placeholder="얼굴 유형을 입력하세요" />
          </Put>
        </InputSet>
        <InputSet>
          <H3>얼굴 분위기 |</H3>
          <Put>
            <Input width={"1160px"} value={faceMood} onChange={(e) => handleInputChange(e, setFaceMood)} placeholder="얼굴 분위기를 입력하세요" />
          </Put>
        </InputSet>
        <H3>전문가 솔루션</H3>
        <ReviewInput placeholder="솔루션을 입력해주세요" value={makeupSolution} onChange={(e) => handleInputChange(e, setMakeupSolution)} />
        <InputSet>
          <H3>피부 메이크업 :</H3>
          <Put>
            <Input width={"1140px"} value={faceMakeup} onChange={(e) => handleInputChange(e, setFaceMakeup)} placeholder="방법을 입력하세요" />
          </Put>
        </InputSet>
        <InputSet>
          <H3>아이 메이크업 :</H3>
          <Put>
            <Input width={"1140px"} value={eyeMakeup} onChange={(e) => handleInputChange(e, setEyeMakeup)} placeholder="방법을 입력하세요" />
          </Put>
        </InputSet>
        <InputSet>
          <H3>립 메이크업 :</H3>
          <Put>
            <Input width={"1160px"} value={lipMakeup} onChange={(e) => handleInputChange(e, setLipMakeup)} placeholder="방법을 입력하세요" />
          </Put>
        </InputSet>
        <InputSet>
          <H3>블러셔 :</H3>
          <Put>
            <Input width={"1200px"} value={blusher} onChange={(e) => handleInputChange(e, setBlusher)} placeholder="방법을 입력하세요" />
          </Put>
        </InputSet>
        <InputSet>
          <H3>쉐이딩 :</H3>
          <Put>
            <Input width={"1200px"} value={shading} onChange={(e) => handleInputChange(e, setShading)} placeholder="방법을 입력하세요" />
          </Put>
        </InputSet>
        <InputSet>
          <H3>하이라이팅 :</H3>
          <Put>
            <Input width={"1165px"} value={highlighting} onChange={(e) => handleInputChange(e, setHighlighting)} placeholder="방법을 입력하세요" />
          </Put>
        </InputSet>
        <Margin2 />
        <ModalBox>
          <H3>
            <IoMdSearch />
          </H3>
          <Put>
            <Search title={"메이크업"}></Search>
          </Put>
        </ModalBox>
        {/* <ProductList></ProductList> */}
        <Margin2 />
        <Margin />
        <H2>헤어스타일</H2>
        <InputSet>
          <H3>헤어 컬러 |</H3>
          <Put>
            <Input width={"1175px"} value={hairColor} onChange={(e) => handleInputChange(e, setHairColor)} placeholder="헤어 컬러를 입력하세요" />
          </Put>
        </InputSet>
        <InputSet>
          <H3>헤어 스타일 |</H3>
          <Put>
            <Input width={"1160px"} value={hairStyle} onChange={(e) => handleInputChange(e, setHairStyle)} placeholder="헤어 스타일을 입력하세요" />
          </Put>
        </InputSet>
        <H3>전문가 솔루션</H3>
        <ReviewInput placeholder="솔루션을 입력해주세요" value={hairstyleSolution} onChange={(e) => handleInputChange(e, setHairstyleSolution)} />
        <Margin2 />
        <ButtonContainer>
          <MyButton1>임시저장</MyButton1>
          <MyButton>제출하기</MyButton>
        </ButtonContainer>
        <Margin2 />
      </ConsultingContent>
    </Consulting1stepresultpage>
  );
};

export default FinalresultInput;

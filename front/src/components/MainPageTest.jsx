import styled, {css} from "styled-components";
import { Page } from "./store/Page";
import { ButtonBox } from "./store/Button";
import { useState } from "react";
const FirstPage = styled(Page)`
  background-color: #ffc8b9;
`;
const SecondPage = styled(Page)`
  background-color: #f8e4a9;
`;
const ThirdPage = styled(Page)`
  height: 120vh;
`;
const FourthPage = styled(Page)``;
const SixthPage = styled(Page)``;
// 1페이지녀
const ImageWrapper = styled.div`
  position: absolute;
  width: 55%; //60%
  height: 80%; //80%
  bottom: 0;
  right: 70px;
  overflow-y: hidden;
`;
// 2페이지녀
const ImageWrapper2 = styled(ImageWrapper)`
  width: 90%;
  height: 95%;
  right: 30%;
`;

const PinkCreamWrapper = styled(ImageWrapper)`
  width: 35%;
  height: 80%;
  bottom: -38%;
  right: 32%;
  z-index: 1;
`;

const YellowCreamWrapper = styled(PinkCreamWrapper)`
  bottom: -155%;
  width: 100%;
  height: 100%;
  right: -25%;
`;
// 기본 이미지 component
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
// N페이지_n번째 글
const TextDiv1_1 = styled.div`
  color: #fff;
  font-family: Roboto;
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 100px;
  margin-top: 130px;
`;

const TextDiv1_2 = styled(TextDiv1_1)`
  font-family: Lexend Deca;
  font-size: 38px;
  font-weight: 400;
  line-height: 48px;
  letter-spacing: -1.5px;
  margin-top: 40px;
`;

const TextDiv2_1 = styled(TextDiv1_2)`
  position: absolute;
  right: 80px;
  margin-top: 100px;
`;

const TextDiv2_2 = styled(TextDiv2_1)`
  margin-top: 120px;
  font-size: 60px;
  right: 35%;
  top: 30%;
  letter-spacing: -2.25px;
  line-height: 66px; /* 133.333% */
`;
const TextDiv3_1 = styled(TextDiv2_2)`
  font-family: "Unica One";
  color: black;
  right: 30%;
  top: 5%;
`;
const TextDiv4_1 = styled(TextDiv3_1)`
  left: 0%;
  top: -10%;
`;

const MyButton = styled(ButtonBox)`
  width: 232px;
  border-radius: 30px;
  margin-left: 150px;
  margin-top: 60px;
`;
// 3페이지 이미지 카드
const Card = styled.div`
  width: 400px;
  height: 300px;
  position: absolute;
`;

const BeautyCard = styled(Card)`
  right: 38%;
  top: 40%;
  z-index: 1;
`;

const CommunityCard = styled(Card)`
  right: 21%;
  top: 67%;
  z-index: 0;
`;
const hoverEffect = css`
  transform: scale(1.1);
`;
const SkinCard = styled(Card)`
  right: 50%;
  top: 70%;
  z-index: 2;
  transition: transform 0.2s ease-in-out;
  ${({ isHovered }) => isHovered && hoverEffect};
`;
// 3페이지 텍스트 섹션
const SkinSolution = styled.div`
  margin-left: 100px;
  top: 68%;
  width: 250px;
  position: absolute;
  transition: transform 0.2s ease-in-out;
  ${({ isHovered }) => isHovered && hoverEffect};
  /* &:hover {
    transform: scale(1.1);
  } */
`;


const BeautySolution = styled(SkinSolution)`
  top: 35%;
  width: 400px;
`;
const Community = styled(SkinSolution)`
  text-align: end;
  top: 53%;
  right: 100px;
  width: 300px;
`;
// 3페이지 텍스트 제목
const SolutionText = styled.p`
  font-family: Roboto;
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
// 3페이지 설명 부분
const DescrText = styled(SolutionText)`
  color: #6d6d6d;
  font-size: 16px;
  line-height: 145%;
`;
// 화살표 반대 방향
const ReverseImage = styled(Image)`
  transform: scaleX(-1);
  width: 200px;
`;
const ConsultantDiv = styled.div`
  display: flex;
  margin-top: 15%;
  height: 68vh;
`;
const ConsultantNameDiv = styled(ConsultantDiv)`
  margin-top: 3%;
`;
const ConsultantCard = styled.div`
  margin-top: 5%;
  margin-left: 4%;
  width: 29vw;
  height: 100%;
  background: #f6f6f6;
`;
const ConsultantNameCard = styled(ConsultantCard)`
  background-color: white;
  height: 0vh;
  font-family: Roboto;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const BIBICard = styled(ConsultantCard)`
  border-radius: 50px 0px 0px 50px;
  text-align: center;
`;
const BIBIIMage = styled(Image)`
  width: 80%;
`;

const MainPage = () => {
  return (
    <>
      <FirstPage>
        <TextDiv1_1>
          <span>
            MY COLOR <br />
            ONLY MINE.
          </span>
        </TextDiv1_1>
        <TextDiv1_2>
          <span>
            Hi, we are Flowering. <br />
            Ready to create an art <br />
            form on your color.
          </span>
        </TextDiv1_2>
        <MyButton>컨설팅 신청하기</MyButton>
        <ImageWrapper>
          <Image src="src/assets/page1girl.png" alt="girl1" />
        </ImageWrapper>
      </FirstPage>
      <PinkCreamWrapper>
        <Image src="src/assets/pinkcream.svg" alt="pinkcream" />
      </PinkCreamWrapper>
      <SecondPage>
        <TextDiv2_1>
          <span>
            Discover your unique
            <br /> beauty with Flowering,
            <br /> your personal stylist.
          </span>
        </TextDiv2_1>
        <TextDiv2_2>
          <span>
            We love what <br /> we do. We are <br />
            up to the task.
          </span>
        </TextDiv2_2>

        <ImageWrapper2>
          <Image src="src/assets/page2girl.svg" alt="girl2" />
        </ImageWrapper2>
      </SecondPage>
      <YellowCreamWrapper>
        <Image src="src/assets/yellowcream.svg" alt="yellowcream" />
      </YellowCreamWrapper>

      <ThirdPage>
        <TextDiv3_1>
          <p>SHARE BEAUTY BY VIDEO</p>
        </TextDiv3_1>

        <CommunityCard>
          <Image src="src/assets/community.png" alt="community" />
        </CommunityCard>
        <BeautyCard>
          <Image src="src/assets/beautysolution.png" alt="beautySolution" />
        </BeautyCard>
        <SkinCard>
          <Image src="src/assets/skinsolution.png" alt="skinSolution" />
        </SkinCard>
        <SkinSolution>
          <SolutionText>피부 솔루션 컨설팅</SolutionText>
          <DescrText>피부 스킨케어 루틴을 상담</DescrText>
          <Image src="src/assets/RedLine.png" alt="RedLine" />
        </SkinSolution>
        <BeautySolution>
          <SolutionText>뷰티 솔루션 컨설팅</SolutionText>
          <DescrText>
            개인별 얼굴형 등에 맞는 헤어스타일,
            <br /> 화장법 등을 추천
          </DescrText>
          <Image src="src/assets/RedLine.png" alt="RedLine" />
        </BeautySolution>
        <Community>
          <SolutionText>화상 커뮤니티</SolutionText>
          <DescrText>
            나만의 뷰티 팁이나 피부 관련 고민을
            <br /> 나눌 수 있는 화상 커뮤니티
          </DescrText>
          <ReverseImage src="src/assets/RedLine.png" alt="RedLine" />
        </Community>
      </ThirdPage>
      <FourthPage>
        <TextDiv4_1>
          <span>
            WE CAN FIND YOUR <br /> PERSONAL STYLE
          </span>
        </TextDiv4_1>
        <ConsultantDiv>
          <BIBICard>
            <BIBIIMage src="src/assets/BIBI.png" alt="BIBI" />
          </BIBICard>
          <ConsultantCard>
            <Image src="src/assets/LEINA.png" alt="BIBI" />
          </ConsultantCard>
          <ConsultantCard>
            <Image src="src/assets/DIANA.png" alt="BIBI" />
          </ConsultantCard>
          <></>
        </ConsultantDiv>
        <ConsultantNameDiv>
          <ConsultantNameCard>BIBI</ConsultantNameCard>
          <ConsultantNameCard>LEINA</ConsultantNameCard>
          <ConsultantNameCard>DIANA</ConsultantNameCard>
        </ConsultantNameDiv>
      </FourthPage>
    </>
  );
};

export default MainPage;

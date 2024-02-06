import SignupPwHeader from "./signup/SignupPwHeader";
import CenterContainer from "./common/CenterContainer";
import Input from "./common/Input";
import Button from "./common/Button";
import Card from "./common/Card";

import { useState } from "react";
import styled from "styled-components";

const StyledCheck = styled.p`
  display: inline-block;
  margin-left: 10px;
  color: ${(props) => (props.isValid ? "#F28482" : "black")};
`;

const SignupPw = () => {
  const [checkEn, setCheckEn] = useState(false)
  const [checkNum, setCheckNum] = useState(false)
  const [checkSp, setCheckSp] = useState(false)
  const [checkLen, setCheckLen] = useState(false)

  const passwordHandler = (e) => {
    // 영문
    let regPassEn = /^(?=.*[a-zA-Z]).{1,}$/;
    if (!regPassEn.test(e.target.value)){
      setCheckEn(false);
      console.log("영문이 없습니다")
    } else {
      setCheckEn(true);
    }

    // 숫자
    let regPassNum = /^(?=.*[0-9]).{1,}$/;
    if (!regPassNum.test(e.target.value)){
      setCheckNum(false);
    } else {
      setCheckNum(true);
    }
    
    // 특수문자
    let regPassSp = /^(?=.*[!@#$%^*+=-]).{1,}$/;
    if (!regPassSp.test(e.target.value)){
      setCheckSp(false);
    } else {
      setCheckSp(true);
    }

    // 8-20자
    let regPassLen = /^.{8,20}$/;
    if (!regPassLen.test(e.target.value)){
      setCheckLen(false);
    } else {
      setCheckLen(true);
    }

  }

  return (
    <Card>
      {/* 회원가입 패스워드 */}
      <SignupPwHeader />
      <Input
        htmlFor="pw1" id="pw1" placeholder="영문, 숫자, 특수문자 포함 8~20자"
        type="password"
        onChange={passwordHandler}
      />
      <StyledCheck isValid={checkEn}>✓ 영문</StyledCheck>
      <StyledCheck isValid={checkNum}>✓ 숫자</StyledCheck>
      <StyledCheck isValid={checkSp}>✓ 특수문자</StyledCheck>
      <StyledCheck isValid={checkLen}>✓ 8~20자</StyledCheck>
      {/* <p>✓ 영문 ✓ 숫자 ✓ 특수문자 ✓ 8~20자</p> */}
      <Input
        htmlFor="pw2" id="pw2" placeholder="비밀번호 재입력"
        tpye="password"
      />
      <p>✓ 비밀번호가 같아요</p>
      <CenterContainer>
        <Button
          width="40%"
          marginTop="50px"
        >
          다음
        </Button>
      </CenterContainer>
    </Card>
  );
};

export default SignupPw;
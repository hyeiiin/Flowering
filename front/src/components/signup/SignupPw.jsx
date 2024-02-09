import SignupPwHeader from "./SignupPwHeader";
import CenterContainer from "../common/CenterContainer";
import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
  const [pwOne , setPwOne] = useState('');
  const [pwTwo , setPwTwo] = useState('');
  const [checkPwOne , setCheckPwOne] = useState(false);
  const [checkPwTwo , setCheckPwTwo] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location;
  const userEmail = state ? state.userEmail : '';

  const passwordHandler = (e) => {
    setPwOne(e.target.value);

    // 영문
    let regPassEn = /^(?=.*[a-zA-Z]).{1,}$/;
    if (!regPassEn.test(e.target.value)){
      setCheckEn(false);
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
  
  useEffect(() => {
    setCheckPwOne(checkEn && checkNum && checkSp && checkLen);
  }, [checkEn, checkNum, checkSp, checkLen, checkPwOne])


  const passwordChecker = (e) => {
    if(pwOne === e.target.value){
      setCheckPwTwo(true);
    } else {
      setCheckPwTwo(false);
    }
  }

  const buttonNavigate = async () => {
    // 여기서 axios로 쏘기, 이렇게 하면 회원가입이 DB에 저장된다.
    // 이메일 : userEmail
    // 패스워드: pwOne
    const response = await axios.post('http://i10c106.p.ssafy.io:8080/v1/users/regist', {
      email: userEmail,
      password: pwOne,
    })
    console.log(response);
    navigate('/signupRequired')
  }

  const alertMessage = () => {
    alert("비밀번호 형식을 다시 확인해주세요!")
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
      <Input
        htmlFor="pw2" id="pw2" placeholder="비밀번호 재입력"
        type="password"
        onChange={passwordChecker}
      />
      <StyledCheck isValid={checkPwTwo}>✓ 비밀번호가 같아요</StyledCheck>
      <CenterContainer>

        {(checkPwOne && checkPwTwo) && (
          <Button
            width="40%"
            marginTop="50px"
            onClick={buttonNavigate}
          >
            다음
          </Button>
        )}
        {(!checkPwOne || !checkPwTwo) && (
          <Button
            width="40%"
            marginTop="50px"
            background-color="#B1B1B1"
            borderColor="#B1B1B1"
            onClick={alertMessage}
          >
            다음
          </Button>
        )}

        {/* <Button
          width="40%"
          marginTop="50px"
        >
          다음
        </Button> */}
      </CenterContainer>
    </Card>
  );
};

export default SignupPw;
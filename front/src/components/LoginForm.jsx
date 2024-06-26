import LoginHeader from "./login/LoginHeader";
import Button from "./common/Button";
import AccountManage from "./login/AccountManage";
import SnsManage from "./login/SnsManage";
import Input from "./common/Input";
import Card from "./common/Card";
import CenterContainer from "./common/CenterContainer";
import { UserInfo, loginUser } from "../store/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//post, email,pw의 파라미터

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const info = 'true'

  useEffect(() => {

    if (isAuthenticated === true) {
      dispatch(UserInfo(info)).then((response) => {
      }).catch((error) => {

      })
      navigate('/');
    }
  }, [isAuthenticated, navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Redux store에 사용자 정보 저장
    dispatch(loginUser({ Email: formData.email, Password: formData.password })).then(() => {


    }).catch((error) => {

      console.error('로그인 요청 실패:', error);
    })

  }

  return (
    <Card>
      <CenterContainer>
        <LoginHeader />
        <form action="#"> {/* onSubmit={loginHandler} */}
          <Input
            htmlFor="email" type="email" id="email"
            placeholder="이메일 입력" width="300px"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            htmlFor="password" type="password" id="password"
            placeholder="비밀번호 입력" width="300px"
            value={formData.password}
            onChange={handleInputChange}
          />
          <CenterContainer>
            <Button
              type="submit"
              width="70%"
              marginTop="20px"
              onClick={handleLogin}
            >
              로그인
            </Button>
          </CenterContainer>          
        </form>
        <AccountManage />
        <SnsManage />
      </CenterContainer>
    </Card>

  );
}

export default LoginForm

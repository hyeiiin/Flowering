import LoginHeader from "./login/LoginHeader";
import Button from "./store/Button";
import AccountManage from "./login/AccountManage";
import SnsManage from "./login/SnsManage";
import Input from "./store/Input";
import Card from "./store/Card";
import ButtonWrapper from "./signup/ButtonWrapper";

const LoginForm = () => {
  return (

    <Card>
      <LoginHeader />
      <form action="#">
        
        <Input htmlFor="loginEmail" type="email" id="loginEmail" placeholder="이메일 입력" width="300px" />
        <Input htmlFor="loginPw" type="password" id="loginPw" placeholder="비밀번호 입력" width="300px" />
        <Button
          width="80%"
          borderRadius="40px"
        >
          로그인
        </Button>
      </form>
      <AccountManage />
      <SnsManage />
    </Card>


  )
}

export default LoginForm

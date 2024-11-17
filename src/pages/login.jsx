import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #000;
`;

const LoginBox = styled.div`
  text-align: center;
  color: #fff;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
`;

const Input = styled.input`
  display: block;
  width: 300px;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 16px;
`;

const Button = styled.button`
  width: 300px;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.disabled ? "#888" : "#ff4a64")};
  color: #fff;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 10px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#888" : "#e04358")};
  }
`;

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required("비밀번호를 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("폼데이터 제출");
    console.log(data);
  };

  return (
    <Container>
      <LoginBox>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            {...register("email")}
            placeholder="이메일을 입력해주세요!"
          />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
          <Input
            type="password"
            {...register("password")}
            placeholder="비밀번호를 입력해주세요!"
          />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
          <Button type="submit" disabled={!isValid}>
            로그인
          </Button>
        </form>
      </LoginBox>
    </Container>
  );
};

export default Login;

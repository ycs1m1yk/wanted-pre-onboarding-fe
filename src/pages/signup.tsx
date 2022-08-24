import {
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import authAPI from "../api/authApi";

const Container = styled.div`
  width: 22rem;
  height: fit-content;
  border: 1px solid;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  padding: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 60;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: bolder;
  border-bottom: 1.5px solid ${({ theme }) => theme.palette.peterRiver};
  padding-bottom: 0.5rem;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div``;

const Label = styled.h2`
  font-weight: bold;
  margin: 1.4rem 0;
`;

const Input = styled.input`
  width: -webkit-fill-available;
  height: 2.5rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.wetAsphalt};
  padding-left: 0.5rem;
`;

const SignUpButton = styled.button`
  width: fit-content;
  display: inline-flex;
  align-self: flex-end;
  margin-top: 1rem;
  padding: 1rem;
  cursor: pointer;
  font-weight: bold;
  border: solid 1px;
  border-radius: 4px;
  color: white;
  background-color: ${({ theme }) => theme.palette.peterRiver};
  :disabled {
    color: ${({ theme }) => theme.palette.black};
    background-color: ${({ theme }) => theme.palette.disabledGray};
    cursor: default;
  }
`;

export default function SignUp() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const handlePreventEnterSubmit = useCallback((e: KeyboardEvent) => {
    if (e.code === "Enter") e.preventDefault();
  }, []);

  const handleEmailChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  };

  const handlePasswordChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  };

  const handlePasswordConfirmChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setPasswordConfirm(target.value);
  };

  const handleSignIn = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();
        await authAPI.signUp({ email, password });
        alert("🎉 환영합니다!");
        navigate("/todo");
      } catch (e: any) {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        window.location.reload();
      }
    },
    [email, password, navigate]
  );

  useEffect(() => {
    setIsValid(false);
    if (password.length >= 8 && password === passwordConfirm) {
      setIsValid(true);
    }
  }, [email, password, passwordConfirm]);

  return (
    <Container>
      <Title>SIGN UP</Title>
      <SignInForm onKeyDown={handlePreventEnterSubmit} onSubmit={handleSignIn}>
        <InputWrapper>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={handleEmailChange} />
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Label>Confirm Password</Label>
          <Input
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
        </InputWrapper>
        <SignUpButton type="submit" disabled={!isValid}>
          Sign up
        </SignUpButton>
      </SignInForm>
    </Container>
  );
}

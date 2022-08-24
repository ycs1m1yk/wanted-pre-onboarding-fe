import {
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import authAPI from "src/api/authApi";

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

const SignInButton = styled.button`
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
`;

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  const handleSignIn = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();
        const { access_token } = await authAPI.signIn({ email, password });
        localStorage.setItem("token", access_token);
        navigate("/todo");
      } catch (e: any) {
        const {
          response: {
            data: { message },
          },
        } = e;
        alert(message);
        window.location.reload();
      }
    },
    [email, password, navigate]
  );

  return (
    <Container>
      <Title>SIGN IN</Title>
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
        </InputWrapper>
        <SignInButton type="submit">Sign in</SignInButton>
      </SignInForm>
    </Container>
  );
}

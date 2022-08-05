import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../features/userSlice";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../api";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 96px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const SubTitle = styled.h2`
  font-size: 16px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  padding: 10px;
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(loginStart());
    try {
      const { data } = await signIn({ username, password });
      localStorage.setItem("profile", JSON.stringify({ ...data }));
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    dispatch(loginStart());
    try {
      const { data } = await signUp({ username, email, password });
      localStorage.setItem("profile", JSON.stringify({ ...data }));
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  // const signInWithGoogle = async () => {
  //   dispatch(loginStart());

  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       axios
  //         .post("/auth/google", {
  //           username: result.user.displayName,
  //           email: result.user.email,
  //           img: result.user.photoURL,
  //         })
  //         .then((res) => {
  //           dispatch(loginSuccess(res.data));
  //         });
  //     })
  //     .catch((error) => {
  //       dispatch(loginFailure());
  //     });
  // };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to GaboTube</SubTitle>
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign In</Button>
        {/* <Title>Or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button> */}
        <Title>Or</Title>
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Sign Up</Button>
      </Wrapper>
    </Container>
  );
};

export default SignIn;

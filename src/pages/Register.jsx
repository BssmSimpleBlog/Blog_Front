import React, { useState } from "react";
import "./style.scss";
import Header from "../components/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();

  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJSZWFsVGVzdCIsImlhdCI6MTY5NjE0ODE2NX0.InlDLaYQGlpRb_bkTxqxDspqBkWork2JYWOks4GNxNk",
    Accept: "application/json",
  };

  const initialFormData = {
    userid: "",
    password: "",
    email: "",
    nickname: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = () =>
    axios
      .post(
        "https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/auth/",
        formData,
        { headers }
      )
      .then(() => {
        alert('정상적으로 회원가입되었습니다.')
        history("/");
      });

  return (
    <div className="register">
      <Header />
      <div className="container">
        <h2>계정 생성</h2>
        <div className="values">
          <div className="value">
            <input
              type="text"
              placeholder="아이디"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  userid: e.target.value,
                });
              }}
            />
          </div>
          <div className="value">
            <input
              type="password"
              placeholder="비밀번호"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="value">
            <input
              type="email"
              placeholder="이메일"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="value">
            <input
              type="text"
              placeholder="닉네임"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  nickname: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="sign">
          <button onClick={handleSubmit} className="up">
            회원가입
          </button>
          <button>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Register;

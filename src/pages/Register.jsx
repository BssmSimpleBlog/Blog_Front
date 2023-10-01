import React from "react";
import "./style.scss";
import Header from "../components/Header/Header";

const Register = () => {
  return (
    <div className="register">
      <Header />
      <div className="container">
        <h2>계정 생성</h2>
        <div className="values">
          <div className="value">
            <input type="text" placeholder="아이디" />
          </div>
          <div className="value">
            <input type="text" placeholder="비밀번호" />
          </div>
          <div className="value">
            <input type="text" placeholder="이메일" />
          </div>
          <div className="value">
            <input type="text" placeholder="이름" />
          </div>
        </div>
        <div className="sign">
          <button className="up">회원가입</button>
          <button>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Register;

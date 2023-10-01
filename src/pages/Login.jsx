import React from "react";
import Header from "../components/Header/Header";

const Login = () => {
  return (
    <div className="login">
      <Header />
      <div className="container">
        <h2>로그인</h2>
        <div className="values">
          <div className="value">
            <input type="text" placeholder="아이디" />
          </div>
          <div className="value">
            <input type="text" placeholder="비밀번호" />
          </div>
        </div>
        <div className="sign">
          <button>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

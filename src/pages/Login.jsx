import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history("/");
    }
  });

  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJSZWFsVGVzdCIsImlhdCI6MTY5NjE0ODE2NX0.InlDLaYQGlpRb_bkTxqxDspqBkWork2JYWOks4GNxNk",
    Accept: "application/json",
  };

  const initialFormData = {
    userid: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    axios
      .post("https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/auth/login", formData, { headers })
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            title: res.data.error,
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } else {
          localStorage.setItem("accessToken", res.data.token);
          localStorage.setItem("userid", res.data.userid);
          localStorage.setItem("nickname", res.data.nickname);
          Swal.fire({
            icon: "success",
            title: "로그인을 성공했습니다!",
            showConfirmButton: false,
            timer: 1500,
          });
          history("/");
        }
      });
  };

  return (
    <div className="login">
      <Header />
      <div className="container">
        <h2>로그인</h2>
        <div className="values">
          <div className="value">
            <input
              onKeyDown={activeEnter}
              type="text"
              placeholder="아이디"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  userid: e.target.value,
                });
              }}
              autoFocus
            />
          </div>
          <div className="value">
            <input
              onKeyDown={activeEnter}
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
        </div>
        <div className="sign">
          <button onClick={handleSubmit}>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

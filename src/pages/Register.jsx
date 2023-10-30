import React, { useState } from "react";
import "./style.scss";
import Header from "../components/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

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

  const [useridError, setUseridError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const validationSchema = Yup.object().shape({
    userid: Yup.string()
      .min(3, "아이디는 최소 3자 이상 입력해야 합니다.")
      .max(25, "아이디는 최대 25자 이하여야 합니다.")
      .matches(
        /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "아이디에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
      )
      .required("아이디를 입력하세요"),
    password: Yup.string()
      .max(25, "비밀번호는 최대 25자리 이하여야 합니다.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
        "알파벳, 숫자, 특수문자를 모두 포함해야 합니다!"
      )
      .required("비밀번호를 입력하세요"),
    email: Yup.string()
      .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "올바른 이메일 형식이 아닙니다.")
      .required("이메일을 입력하세요"),
    nickname: Yup.string()
      .matches(
        /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
      )
      .required("닉네임을 입력하세요"),
  });

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        axios
          .post(
            "https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/auth/",
            formData,
            { headers }
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                title: res.data.error,
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: res.data,
                showConfirmButton: false,
                timer: 1500,
              });
              history("/auth/login");
            }
          })
          .catch((error) => {
            console.error("API request failed:", error);
          });
      })
      .catch((validationErrors) => {
        validationErrors.inner.forEach((error) => {
          switch (error.path) {
            case "userid":
              setUseridError(error.message);
              break;
            case "password":
              setPasswordError(error.message);
              break;
            case "email":
              setEmailError(error.message);
              break;
            case "nickname":
              setNicknameError(error.message);
              break;
            default:
              break;
          }
        });
      });
  };

  return (
    <div className="register">
      <Header />
      <div className="container">
        <h2>계정 생성</h2>
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
                setUseridError("");
              }}
              autoFocus
            />
            {useridError && <div className="error">{useridError}</div>}
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
                setPasswordError("");
              }}
            />
            {passwordError && <div className="error">{passwordError}</div>}
          </div>
          <div className="value">
            <input
              onKeyDown={activeEnter}
              type="email"
              placeholder="이메일"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
                setEmailError("");
              }}
            />
            {emailError && <div className="error">{emailError}</div>}
          </div>
          <div className="value">
            <input
              onKeyDown={activeEnter}
              type="text"
              placeholder="닉네임"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  nickname: e.target.value,
                });
                setNicknameError("");
              }}
            />
            {nicknameError && <div className="error">{nicknameError}</div>}
          </div>
        </div>
        <div className="sign">
          <button onClick={handleSubmit} className="up">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

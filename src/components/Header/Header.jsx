import React from "react";
import "../style.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <h2>성우와 승현이의 블로그</h2>
      </Link>
      <div className="auth">
        <Link to={"/auth/login"}><h4>로그인</h4></Link>
        <Link to={"/auth/register"}><h4>회원가입</h4></Link>
        <h4>프로필</h4>
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import "../style.scss";
import { Link } from "react-router-dom";
import Profile from "../Modals/Profile";

const Header = () => {
  const [isModal, setIsModal] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };
  return (
    <div className="header">
      <Link to="/">
        <h2>성우와 승현이의 블로그</h2>
      </Link>
      <div className="auth">
        {!localStorage.getItem("accessToken") ? (
          <>
            <Link to="/auth/login">
              <h4>로그인</h4>
            </Link>
            <Link to="/auth/register">
              <h4>회원가입</h4>
            </Link>
          </>
        ) : (
          <>
            <h4 onClick={logout}>로그아웃</h4>
            <h4
              onClick={() => {
                setIsModal(true);
              }}
            >
              프로필 수정
            </h4>
          </>
        )}
        <Profile isModal={isModal} setIsModal={setIsModal} />
      </div>
    </div>
  );
};

export default Header;

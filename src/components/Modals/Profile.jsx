import React from "react";
import "../style.scss";

const Profile = ({ isModal, setIsModal }) => {
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModal(false);
    }
  };
  return (
    <div className="modal">
      {isModal ? (
        <div className="profile" onClick={handleModalClick}>
          <div className="container">
            <h2>프로필 수정</h2>
            <div className="all">
              <div className="inputs">
                <h4>비밀번호</h4>
                <input type="password" />
                <h4>닉네임</h4>
                <input type="text" />
              </div>
              <div className="buttons">
                <button className="delete">계정 삭제</button>
                <button className="update">정보 저장</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;

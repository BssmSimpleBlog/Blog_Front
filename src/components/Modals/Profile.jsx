import React, { useId } from "react";
import "../style.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileDelete from "./profileDelete";

const Profile = ({ isModal, setIsModal, logout }) => {
  const history = useNavigate();
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModal(false);
    }
  };
  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJSZWFsVGVzdCIsImlhdCI6MTY5NjE0ODE2NX0.InlDLaYQGlpRb_bkTxqxDspqBkWork2JYWOks4GNxNk",
    Accept: "application/json",
  };

  const userid = localStorage.getItem("userid");

  const initialFormData = {
    userid: userid,
    password: "",
    nickname: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleUpdate = () => {
    axios
      .put(
        `https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/auth/${userid}`,
        formData,
        { headers }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert("프로필 수정 성공");
          setIsModal(false);
          logout();
        }
      });
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
                <input
                  type="password"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                />
                <h4>닉네임</h4>
                <input
                  type="text"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      nickname: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="buttons">
                <button
                  className="delete"
                  onClick={() => {
                    setDeleteModal(true);
                    setIsModal(false);
                  }}
                >
                  계정 삭제
                </button>
                <button className="update" onClick={handleUpdate}>
                  정보 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {deleteModal ? (
        <ProfileDelete
          setDeleteModal={setDeleteModal}
          setIsModal={setIsModal}
          logout={logout}
        />
      ) : null}
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ProfileDelete from "./profileDelete";
import "../style.scss";

const Profile = ({ isModal, setIsModal, logout }) => {
  const history = useNavigate();

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModal(false);
    }
  };

  const headers = {
    Authorization: "Your_Auth_Header_Here",
    Accept: "application/json",
  };

  const userid = localStorage.getItem("userid");

  const initialFormData = {
    userid: userid,
    password: "",
    nickname: "",
  };

  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .max(25, "비밀번호는 최대 25자리 이하여야 합니다.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
        "알파벳, 숫자, 특수문자를 모두 포함해야 합니다!"
      )
      .required("비밀번호를 입력하세요"),
    nickname: Yup.string()
      .matches(
        /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
      )
      .required("닉네임을 입력하세요"),
  });

  const [formData, setFormData] = useState(initialFormData);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleUpdate = () => {
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
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
              Swal.fire({
                icon: "success",
                title: "프로필 수정을 성공했습니다!",
                showConfirmButton: false,
                timer: 1500,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              logout();
            }
          });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "프로필 수정을 실패했습니다!",
          showConfirmButton: false,
          timer: 3000,
        });
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
                  autoFocus
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
                {nicknameError && (
                  <div className="error">{nicknameError}</div>
                )}
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

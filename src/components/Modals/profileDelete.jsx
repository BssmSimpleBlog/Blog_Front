import React, { useState } from "react";
import "../style.scss";
import Swal from "sweetalert2";
import axios from "axios";

const ProfileDelete = ({ setDeleteModal, logout }) => {
  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJSZWFsVGVzdCIsImlhdCI6MTY5NjE0ODE2NX0.InlDLaYQGlpRb_bkTxqxDspqBkWork2JYWOks4GNxNk",
    Accept: "application/json",
  };
  const userid = localStorage.getItem("userid");

  const initialFormData = {
    userid: userid,
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const handleDelete = () => {
    axios
      .delete(
        `https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/auth/${userid}`,
        { headers, data: formData }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          Swal.fire({
            icon: "success",
            title: "계정 삭제를 성공했습니다.",
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
          setDeleteModal(false);
          logout();
        }
      });
  };

  return (
    <div className="deleteModal">
      <div>
        <h3>비밀번호를 입력하세요.</h3>
        <input
          type="password"
          onChange={(e) => {
            setFormData({
              ...formData,
              password: e.target.value,
            });
          }}
        />
        <button className="ok" onClick={handleDelete}>
          확인
        </button>
        <button
          className="no"
          onClick={() => {
            setDeleteModal(false);
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ProfileDelete;

import React, { useState } from "react";
import axios from "axios";
import "../style.scss";

const Create = ({ onClose }) => {
  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJSZWFsVGVzdCIsImlhdCI6MTY5NjE0ODE2NX0.InlDLaYQGlpRb_bkTxqxDspqBkWork2JYWOks4GNxNk",
    Accept: "application/json",
  };

  const initialFormData = {
    title: "",
    desc: "",
    nickname: localStorage.getItem("nickname"),
    userid: localStorage.getItem("userid"),
  };

  const [formData, setFormData] = useState(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (formData.title.length < 3) {
      alert("제목은 3글자 이상이어야 합니다.");
      return;
    }

    if (formData.desc.trim() === "") {
      alert("본문을 입력하세요.");
      return;
    }

    setIsSubmitting(true);
    axios
      .post(
        "https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/post/",
        formData,
        { headers }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          onClose();
          alert(res.data);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="create">
        <div className="container">
          <div className="inputs">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="title"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  title: e.target.value,
                });
              }}
            />
            <textarea
              placeholder="당신의 이야기를 적어보세요..."
              className="description"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  desc: e.target.value,
                });
              }}
            />
          </div>
          <div className="buttons">
            <button className="submit" onClick={handleSubmit}>
              작성하기
            </button>
            <button className="cancel" onClick={onClose}>
              취소하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;

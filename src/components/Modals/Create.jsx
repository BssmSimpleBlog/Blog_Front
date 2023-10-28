import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../style.scss";

const Create = ({ onClose, createModalMode, postId }) => {
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

  useEffect(() => {
    if (!postId) return;
    axios
      .get(
        `https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/post/${postId}`,
        { headers }
      )
      .then((res) => {
        setFormData({
          title: res.data.title,
          desc: res.data.desc,
        });
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }, [postId]);

  const handleEdit = () => {
    if (isSubmitting) return;

    if (formData.title.length < 3) {
      Swal.fire({
        title: "제목은 3글자 이상이어야 합니다.",
        timer: 1000,
      });
      return;
    } else if (formData.title.length > 25) {
      Swal.fire({
        title: "제목은 25글자 이하여야 합니다.",
        timer: 1000,
      });
      return;
    }

    if (formData.desc.trim() === "") {
      Swal.fire({
        title: "본문을 입력해주세요.",
        timer: 1000,
      });
      return;
    }

    setIsSubmitting(true);
    axios
      .put(
        `https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/post/${postId}`,
        {
          id: postId,
          userid: localStorage.getItem("userid"),
          title: formData.title,
          desc: formData.desc,
        },
        { headers }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: res.data,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
        onClose();
      });
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (formData.title.length < 3) {
      Swal.fire({
        title: "제목은 3글자 이상이어야 합니다.",
        timer: 1000,
      });
      return;
    } else if (formData.title.length > 25) {
      Swal.fire({
        title: "제목은 25글자 이하여야 합니다.",
        timer: 1000,
      });
      return;
    }

    if (formData.desc.trim() === "") {
      Swal.fire({
        title: "본문을 입력해주세요.",
        timer: 1000,
      });
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
          Swal.fire({
            icon: "success",
            title: res.data,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
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
              value={formData.title}
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
              value={formData.desc}
            />
          </div>
          <div className="buttons">
            {createModalMode === "edit" ? (
              <button className="submit" onClick={handleEdit}>
                수정하기
              </button>
            ) : (
              <button className="submit" onClick={handleSubmit}>
                작성하기
              </button>
            )}
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

import React from "react";
import { useState } from "react";

const Post = ({ onClose }) => {
  return (
    <>
      <div className="post">
        <div className="container">
          <div className="inputs">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="title"
            />
            <textarea
              placeholder="당신의 이야기를 적어보세요..."
              className="description"
            />
          </div>
          <div className="buttons">
            <button className="submit">작성하기</button>
            <button className="cancel" onClick={onClose}>
              취소하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

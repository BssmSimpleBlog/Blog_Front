import React from "react";
import "./style.scss";
import Header from "../components/Header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Post = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/post/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return (
    <>
      <Header />
      <div className="post">
        <div className="this">
          <p className="title">{post.title}</p>
          <p className="nickname">{post.nickname}</p>
          <p className="date">{post.updatedAt.substring(0, 10)}</p>
          <p className="description">{post.desc}</p>
        </div>
        <div className="others"></div>
      </div>
    </>
  );
};

export default Post;

import React from "react";
import "./style.scss";
import Header from "../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Post = () => {
  const history = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/post/"
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

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
  }, [post]);

  const Rposts = [...posts].reverse();

  return (
    <>
      <Header />
      <div className="post">
        <div className="this">
          <p className="title">{post.title}</p>
          <p className="nickname">{post.nickname}</p>
          <p className="date">{String(post.updatedAt).substring(0, 10)}</p>
          <p className="description">{post.desc}</p>
        </div>
        <div className="others">
          <div className="posts">
            <table className="posts-list">
              <thead>
                <tr>
                  <th className="number">번호</th>
                  <th className="title">제목</th>
                  <th className="author">글쓴이</th>
                  <th className="date">작성일</th>
                </tr>
              </thead>
              <tbody>
                {Rposts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => {
                      history(`/post/${post.id}`);
                    }}
                  >
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.nickname}</td>
                    <td>{post.updatedAt.substring(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

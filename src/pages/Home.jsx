import React, { useEffect, useState } from "react";
import "./style.scss";
import "../components/style.scss";
import Header from "../components/Header/Header";
import Create from "../components/Modals/Create";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const history = useNavigate();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/post/");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const Rposts = [...posts].reverse();

  return (
    <div className="home">
      <Header />
      {localStorage.getItem("accessToken") ? (
        <img
          src="../../img/pen.png"
          className="write"
          onClick={() => {
            setIsPostModalOpen(true);
          }}
        />
      ) : null}
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
                <td>{post.createdAt.substring(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPostModalOpen && (
        <Create
          onClose={() => {
            setIsPostModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;

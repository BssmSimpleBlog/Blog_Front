import React from "react";
import "./style.scss";
import Header from "../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Create from "../components/Modals/Create";

const Post = () => {
  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJSZWFsVGVzdCIsImlhdCI6MTY5NjE0ODE2NX0.InlDLaYQGlpRb_bkTxqxDspqBkWork2JYWOks4GNxNk",
    Accept: "application/json",
  };
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
        Swal.fire({
          title: err,
          timer: 1000,
          type: "error",
        });
      }
    };
    fetchData();
  }, [post]);

  const Rposts = [...posts].reverse();

  const userid = localStorage.getItem("userid");
  const initialFormData = {
    id: postId,
    userid: userid,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleDelete = () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(133, 243, 133)",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/post/${postId}`,
            {
              headers,
              data: formData,
            }
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                title: res.data.error,
                timer: 1000,
                type: "error",
              });
            } else {
              Swal.fire({
                title: "글이 삭제되었습니다.",
                timer: 1000,
                icon: "success",
                showConfirmButton: false,
              });
              history("/");
            }
          });
      }
    });
  };

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [createModalMode, setCreateModalMode] = useState("");
  const [selectedPost, setSelectedPost] = useState({});

  return (
    <>
      <Header />
      <div className="post">
        <div className="this">
          <p className="title">{post.title}</p>
          <p className="nickname">작성자: {post.nickname}</p>
          <p className="date">
            마지막 수정: {String(post.updatedAt).substring(0, 10)}
          </p>
          {localStorage.getItem("userid") == post.userid ? (
            <>
              <button
                className="update"
                onClick={() => {
                  setIsPostModalOpen(true);
                  setCreateModalMode("edit");
                  setSelectedPost(post);
                }}
              >
                수정
              </button>
              {localStorage.getItem("userid") == post.userid ||
              localStorage.getItem("userid") == "admin12345" ? (
                <button className="delete" onClick={handleDelete}>
                  삭제
                </button>
              ) : null}
            </>
          ) : null}
          <p className="description">{post.desc}</p>
        </div>
        {isPostModalOpen && (
          <Create
            onClose={() => {
              setIsPostModalOpen(false);
            }}
            post={post}
            postId={postId}
            createModalMode={createModalMode}
          />
        )}
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
                    <td>{post.createdAt.substring(0, 10)}</td>
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

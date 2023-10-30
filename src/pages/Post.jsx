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
    Authorization: "Your_Auth_Header_Here",
    Accept: "application/json",
  };
  const history = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [createModalMode, setCreateModalMode] = useState("");
  const [selectedPost, setSelectedPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/post`
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
          `https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/comment/${postId}`
        );
        setComments(res.data);
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
  }, [postId]);

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

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  const handleAddComment = () => {
    if (isSubmitting) {
      return; // 이미 요청을 보냈으면 추가 요청을 막음
    }

    if (!commentInput) {
      Swal.fire({
        title: "댓글을 작성해주세요",
        timer: 1000,
        type: "error",
      });
    } else {
      setIsSubmitting(true);

      axios
        .post(
          "https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/comment",
          {
            commentBody: commentInput,
            nickname: localStorage.getItem("nickname"),
            postId: postId,
            userid: localStorage.getItem("userid"),
          },
          { headers }
        )
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              title: res.data.error,
              timer: 1000,
              type: "error",
            });
            history("/auth/login");
          } else {
            Swal.fire({
              title: "댓글이 추가되었습니다.",
              timer: 2000,
              icon: "success",
              showConfirmButton: false,
            });
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("댓글 추가 중 오류 발생:", error);
        })
        .finally(() => {
          setIsSubmitting(false); // 완료 후 상태를 다시 false로 설정
        });
    }
  };

  const handleDeleteComment = (id) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(133, 243, 133)",
      cancelButtonColor: "red",
    }).then(() => {
      setIsSubmitting(true);
      axios
        .delete(
          `https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/comment/${id}`,
          {
            id: id,
          }
        )
        .then((res) => {
          Swal.fire({
            title: "댓글이 삭제되었습니다.",
            timer: 1000,
            icon: "success",
            showConfirmButton: false,
          });
          window.location.reload();
        })
        .catch((error) => {
          console.error("댓글 삭제 중 오류 발생:", error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    });
  };

  return (
    <>
      <Header />
      <div className="post">
        {/* Des */}
        <div className="this">
          <p className="title">{post.title}</p>
          <p className="nickname">작성자: {post.nickname}</p>
          <p className="date">
            마지막 수정: {String(post.updatedAt).substring(0, 10)}
          </p>
          {localStorage.getItem("userid") === post.userid ? (
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
              <button className="delete" onClick={handleDelete}>
                삭제
              </button>
            </>
          ) : null}
          {localStorage.getItem("userid") === "admin12345" &&
          !localStorage.getItem("userid") === post.userid ? (
            <>
              <button className="delete" onClick={handleDelete}>
                삭제
              </button>
            </>
          ) : null}
          <p className="description">{post.desc}</p>
        </div>

        {/* Comment */}
        <div className="Comment_Container">
          <div className="Comment_Inputs">
            <input
              type="text"
              placeholder="댓글을 입력하세요..."
              className="Comment_Input"
              onKeyDown={activeEnter}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
            />
            <button
              className="Comment_Button"
              onClick={handleAddComment}
              disabled={isSubmitting} // isSubmitting 상태에 따라 버튼 활성화/비활성화
            >
              입력
            </button>
          </div>

          <div className="Comments_Container">
            {comments.map((item) => (
              <div className="Comments_Containers" key={item.id}>
                <div className="Comments_Nickname">{item.nickname}</div>
                <div className="Comments_Divider"></div>
                <div className="Comments_CommentBody">{item.commentBody}</div>
                {localStorage.getItem("userid") === item.userid ? (
                  <input
                    type="button"
                    className="Comments_Delete"
                    onClick={() => {
                      handleDeleteComment(item.id);
                    }}
                    value="삭제"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Other Post */}
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
                    <td>{String(post.createdAt).substring(0, 10)}</td>
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

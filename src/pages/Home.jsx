import React, { useEffect } from "react";
import "./style.scss";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Post from "../components/Modals/Post";

const Home = () => {
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history("/");
    }
  }, [history]);

  return (
    <div className="home">
      <Header />
      <img src="../../img/pen.png" className="write" />
    </div>
  );
};

export default Home;

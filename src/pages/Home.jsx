import React, { useEffect } from "react";
import "./style.scss";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history("/");
    }
  });
  return (
    <div className="home">
      <Header />
    </div>
  );
};

export default Home;

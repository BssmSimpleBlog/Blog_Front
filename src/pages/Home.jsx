import React, { useEffect, useState } from "react";
import "./style.scss";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Create from "../components/Modals/Create";
import Articles from "../components/Articles/Articles";

const Home = () => {
  const history = useNavigate();
  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJSZWFsVGVzdCIsImlhdCI6MTY5NjE0ODE2NX0.InlDLaYQGlpRb_bkTxqxDspqBkWork2JYWOks4GNxNk",
    Accept: "application/json",
  };
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history("/");
    }
  }, [history]);

  return (
    <div className="home">
      <Header />
      <img
        src="../../img/pen.png"
        className="write"
        onClick={() => {
          setIsPostModalOpen(true);
        }}
      />

      <Articles />

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

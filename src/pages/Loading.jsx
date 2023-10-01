import React from "react";
import "./style.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div>
        <img src="./img/loading.gif" style={{ width: 250 }} />
        <h3>Loading...</h3>
      </div>
    </div>
  );
};

export default Loading;

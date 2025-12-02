import React from "react";
import "../css/Loader.css"

function Loader({ size = 40, color = "#ffffffff" }) {
  return (
    <div
      className="loader"
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
    ></div>
  );
}

export default Loader;

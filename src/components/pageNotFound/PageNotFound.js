

import React from "react";
import NotFound from "../../assets/images/404.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const containerStyle = {
    position: "absolute",
    zIndex: 1000,
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", // Black background
  };

  const textStyle = {
    color: "white", // White text
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        <img
            src={NotFound}
            alt="Logo"
            width="200"
            height="200"
          />
        <h3>404 Error</h3>
        <h3>Page Not Found</h3>
        <Link to='/'>Go home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
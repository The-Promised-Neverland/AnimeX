import React from "react";

const Synopsis = ({ synopsis }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "xxx-large",
        }}
      >
        Synopsis
      </div>
      <div>{synopsis}</div>
    </>
  );
};

export default Synopsis;

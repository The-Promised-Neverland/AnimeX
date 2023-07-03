import React from "react";

const NoDataFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=2000"
        alt="No Data"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
        }}
      />
    </div>
  );
};

export default NoDataFound;

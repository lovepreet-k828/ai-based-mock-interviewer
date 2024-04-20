import React, { useEffect } from "react";
import { Circles } from "react-loader-spinner";

const Spinner = ({ msg }) => {
  return (
    <div
    style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        height:"full",
        width:"100%",
    }}
    >
      <Circles color="#00BFFF" height={100} width={100} />
      <div style={{
        fontSize:"25px",
        textAlign:"center",
        width:"100%",
        margin:"3% 0",
        padding:"0 2%",
      }}>
        {msg}
      </div>
    </div>
  );
};

export default Spinner;
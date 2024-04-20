import { useDispatch, useSelector } from "react-redux";
import { setaiQA } from "../features/aiQA/aiQASlice";
import { qusAns1, qusAns2 } from "../qusAnsDataset/get_qa";
import { qusAns3, qusAns4 } from "../qusAnsDataset/sde_qa";
import { useEffect, useState } from "react";
import { setJobProfile } from "../features/jobProfile/jobProfile";
const RecordedFilter = () => {
  const totalRI = useSelector(
    (state) => state.totalRecordedInfo.totalRecordedInfo
  );
  const postFullForm = {
    sde: "Software Developer Engineer",
    get: "Graduate Engineer Trainee",
  };
  const expFullForm = {
    0: " 0 ",
    1: " 1-2 ",
  };

  return (
    <div
      style={{
        height: "15%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "fit-content",
          padding: "0 3%",
          boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <span
          style={{
            textAlign: "center",
            border: "none",
            backgroundColor: "white",
            fontWeight: "bold",
            width:"fit-content",
            fontSize: "medium",
          }}
        >
          {postFullForm[totalRI?.post]}
        </span>
      </div>
      <div
        style={{
          // fontWeight: "bold",
          fontSize: "medium",
          height: "100%",
          width: "fit-content",
          padding: "0 3%",
          boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{textAlign: "center",
            border: "none",
            backgroundColor: "white",
            fontWeight: "bold",
            width:"fit-content",
            fontSize: "medium",}}>Years of Experience:</span>
        <span
          style={{
            textAlign: "center",
            border: "none",
            backgroundColor: "white",
            fontWeight: "bold",
            fontSize: "medium",
          }}
        >
          {expFullForm[totalRI?.exp]}
        </span>
      </div>
    </div>
  );
};

export default RecordedFilter;

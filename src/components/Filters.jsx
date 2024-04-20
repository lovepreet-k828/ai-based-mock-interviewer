import { useDispatch } from "react-redux";
import { setaiQA } from "../features/aiQA/aiQASlice";
import { qusAns1, qusAns2 } from "../qusAnsDataset/get_qa";
import { qusAns3, qusAns4 } from "../qusAnsDataset/sde_qa";
import { useEffect, useState } from "react";
import { setJobProfile } from "../features/jobProfile/jobProfile";
const Filters = () => {
  const [post, setPost] = useState("sde");
  const [exp, setExp] = useState("0");
  const dispatch = useDispatch();
  const qusAns = {
    get0: qusAns1,
    get1: qusAns2,
    sde0: qusAns3,
    sde1: qusAns4,
  };
  useEffect(() => {
    dispatch(setaiQA(qusAns[post + exp]));
    dispatch(setJobProfile({ post: post, exp: exp }));
  }, [post, exp]);
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
        <label>
          {/* Select Job Title: */}
          <select
            name="selectedFruit"
            onChange={(e) => {
              setPost(e.target.value);
            }}
            style={{
              textAlign: "center",
              border: "none",
              backgroundColor: "white",
              fontWeight: "bold",
              fontSize: "medium",
              cursor: "pointer",
            }}
          >
            <option value="sde">Software Developer Engineer</option>
            <option value="get">Graduate Engineer Trainee</option>
          </select>
        </label>
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <label>
          Years of Experience:
          <select
            name="selectedFruit"
            onChange={(e) => {
              setExp(e.target.value);
            }}
            style={{
              textAlign: "center",
              border: "none",
              backgroundColor: "white",
              fontWeight: "bold",
              fontSize: "medium",
              cursor: "pointer",
            }}
          >
            <option value="0">0</option>
            <option value="1">1-2</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filters;

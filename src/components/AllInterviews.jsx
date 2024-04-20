import { useSelector } from "react-redux";
import Login from "./Login";
import InterviewInfoCard from "./InterviewInfoCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";

const AllInterviews = () => {
  useEffect(() => {
    document.title = 'Past Interviews';
  }, []);

  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const allInterviews = useSelector((state) => state.shortInfoCards.shortInfoCards)
  return userInfo?.isLogedIn ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "100%",
        width: "100%",
        alignItems: "center",
        overflowY:"scroll"
      }}
    >
      <h1>Your Past Mock Interviews will show here</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          height: "100%",
          width:"100%",
        }}
      >
        {allInterviews.map((val, idx)=> <InterviewInfoCard data={val}/>)}
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default AllInterviews;

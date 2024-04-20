import { useNavigate } from "react-router";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  addTotalRecordedInfo,
  setTotalRecordedInfo,
} from "../features/totalRecordedInfo/totalRecordedInfo";
import { setShortInfoCards } from "../features/shortInfoCards/shortInfoCards";
import Spinner from "./Spinner";
import { useState } from "react";

const InterviewInfoCard = ({ data }) => {
  const postFullForm = {
    sde: "Software Developer Engineer",
    get: "Graduate Engineer Trainee",
  };
  const expFullForm = {
    0: " 0 ",
    1: " 1-2 ",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const totalRI = useSelector(
    (state) => state.totalRecordedInfo.totalRecordedInfo
  );
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    const asyncFunc = async () => {
      setLoading(true);
      if (userInfo.isLogedIn) {
        const docSnap = await getDoc(
          doc(getFirestore(firebaseApp), `totalInfo_${userInfo.id}`, data?.id)
        );
        if (docSnap.exists()) {
          dispatch(
            setTotalRecordedInfo({
              totalExpressions: JSON.parse(docSnap.data().totalExpressions),
              totalQusAns: JSON.parse(docSnap.data().totalQusAns),
              voiceTone: JSON.parse(docSnap.data().voiceTone),
            })
          );
        }
        console.log("TotalRI: ", totalRI);
        dispatch(addTotalRecordedInfo({ videoUrl: data.videoUrl }));
        dispatch(addTotalRecordedInfo({ post: data.post }));
        dispatch(addTotalRecordedInfo({ exp: data.exp }));
        dispatch(addTotalRecordedInfo({ date: data.date }));
        setLoading(false);
        navigate("/recorded-interview");
      }
    };
    asyncFunc().catch((e) => {
      setLoading(false);
      alert("An internal error has occured, please try again later...");
    });
  };

  const handleDelete = () => {
    console.log("delete: ", data, userInfo);
    const asyncFun = async () => {
      setLoading(true);
      await deleteDoc(
        doc(getFirestore(firebaseApp), `shortInfo_${userInfo.id}`, data?.id)
      );
      const q = query(
        collection(getFirestore(firebaseApp), `shortInfo_${userInfo.id}`)
      );
      const querySnapshot = await getDocs(q);
      console.log("queryData: ", querySnapshot);
      let newDataList = [];
      querySnapshot.forEach((doc) => {
        newDataList.push(doc.data());
      });
      dispatch(setShortInfoCards(newDataList));
      setLoading(false);
    };
    asyncFun().catch((e) => {
      setLoading(false);
      alert("An internal error has occured, please try again later...");
    });
  };
  if (loading) return <Spinner msg="Please wait..." />;
  return (
    <div
    className="hover-style"
      style={{
        height: "30%",
        width: "45%",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        margin: "1%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div onClick={handleClick} style={{ width: "40%", height: "100%" }}>
        <video
          src={data.videoUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            borderRadius: "10px",
            boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          }}
        ></video>
      </div>
      <div
        style={{
          width: "60%",
          height: "95%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            onClick={handleClick}
            style={{
              width: "fit-content",
              height: "fit-content",
              margin: "1% 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Job Title: </span>
            <span> {postFullForm[data.post]}</span>
          </div>
          <div
            onClick={handleClick}
            style={{
              width: "fit-content",
              height: "fit-content",
              margin: "1% 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Experience(in years): </span>
            <span> {expFullForm[data.exp]}</span>
          </div>
          <div
            onClick={handleClick}
            style={{
              width: "fit-content",
              height: "fit-content",
              margin: "1% 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Duration: </span>
            <span> {data.duration} </span>
          </div>
          <div
            onClick={handleClick}
            style={{
              width: "fit-content",
              height: "fit-content",
              margin: "1% 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Time: </span>
            <span> {data.date}</span>
          </div>
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
            }}
          >
            {" "}
            <button
              style={{
                alignContent: "center",
                border: "none",
                backgroundColor: "#49c1a2",
                padding: "5px 10px",
                borderRadius: "5px",
                color: "white",
                fontSize: "18px",
                marginBottom: "5px",
              }}
              onClick={handleDelete}
            >
              {" "}
              Delete{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewInfoCard;

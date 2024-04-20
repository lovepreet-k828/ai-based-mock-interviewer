import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import MainContent from "./components/MainContent";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import { useRecordWebcam } from "react-record-webcam";
import AllInterviews from "./components/AllInterviews";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setUserInfo } from "./features/userInfo/userInfo";
import { useDispatch, useSelector } from "react-redux";
import RecordedMainContent from "./components/RecordedMainContent";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import firebaseApp from "./firebase";
import {
  addShortInfoCard,
  setShortInfoCards,
} from "./features/shortInfoCards/shortInfoCards";
import Spinner from "./components/Spinner";
import EditProfile from "./components/EditProfile";
import ForgotPass from "./components/ForgotPass";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state)=>state.userInfo.userInfo);
  onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        setLoading(true);
        const asyncFunc = async () => {
          const docSnap = await getDoc(
            doc(getFirestore(firebaseApp), `registeredUsers`, user.uid)
          );
          if (docSnap.exists()) {
            dispatch(
              setUserInfo(
                Object.assign({}, docSnap.data(), {
                  isVerified: user.emailVerified,
                  isLogedIn: true,
                  id:user.uid,
                })
              )
            );
          } else {
            dispatch(
              setUserInfo({
                userName: user.displayName,
                email: user.email,
                isVerified: user.emailVerified,
                isLogedIn: true,
                id: user.uid,
              })
            );
          }
        };
        
        const asyncFun = async () => {
          const q = query(
            collection(getFirestore(firebaseApp), `shortInfo_${user.uid}`)
          );
          const querySnapshot = await getDocs(q);
          console.log("queryData: ", querySnapshot);
          let newDataList = [];
          querySnapshot.forEach((doc) => {
            newDataList.push(doc.data());
          });
          dispatch(setShortInfoCards(newDataList));
        };
        if(userInfo.isLogedIn === false){
          asyncFunc().catch((err) => {setLoading(false)});
          asyncFun().catch((err) => {setLoading(false)});
        }
      }
      setLoading(false);
    },
    []
  );

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <Sidebar />
      {loading ? (
        <Spinner msg={"Loading your profile..."} />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/start-interview" element={<MainContent />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/past-mock-interviews" element={<AllInterviews />} />
          <Route path="/recorded-interview" element={<RecordedMainContent />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

import {
  faUser,
  faHouse,
  faBell,
  faChartColumn,
  faVideo,
  faDoorClosed,
  faDoorOpen,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import logoImg from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { setUserInfo } from "../features/userInfo/userInfo";
import { useDispatch } from "react-redux";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "../firebase";
import { addShortInfoCard } from "../features/shortInfoCards/shortInfoCards";
import { setMode } from "../features/mode/mode";

function Sidebar() {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(setUserInfo({ isLogedIn: false }));
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showAllInterviews = async () => {
    dispatch(setMode("recorded"));
    navigate("/past-mock-interviews");
  };

  const handleLiveInterview = async () => {
    dispatch(setMode("live"));
    navigate("/start-interview");
  };
  const midSidebarStyle = {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "black",
    justifyContent: "center",
    height: "70%",
    alignItems: "spacece",
  };
  const sideBarContainerStyle = {
    boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
    height: "100%",
    minWidth: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const itemStyle = {
    backgroundColor: "#f1f1f1",
    margin: "10px",
    padding: "10px",
    color: "black",
  };
  const [sideBar, setSideBar] = useState("none");
  const paddingStyle = {
    paddingLeft: "10px",
    color: "black",
    display: sideBar,
    fontWeight: "bold",
    cursor: "pointer",
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div
    className="side-bar"
      style={sideBarContainerStyle}
      onMouseOver={() => setSideBar("inline")}
      onMouseLeave={() => setSideBar("none")}
    >
      <Link to="/" style={linkStyle}>
        <div style={{ padding: "5px 1px 1px" }}>
          <img
            src={logoImg}
            alt="logo"
            style={{ width: "50px", height: "40px" }}
          />
        </div>
      </Link>
      <div style={midSidebarStyle}>
        <Link to="/" style={linkStyle}>
          <div style={itemStyle}>
            <FontAwesomeIcon icon={faHouse} />
            <span style={paddingStyle}> Home</span>
          </div>
        </Link>

        {/* <Link to="/start-interview" style={linkStyle}> */}
        <div style={itemStyle} onClick={handleLiveInterview}>
          <FontAwesomeIcon icon={faVideo} />
          <span style={paddingStyle}> Start Interview</span>
        </div>
        {/* </Link> */}
        {/* <Link to="/past-mock-interviews" style={linkStyle}> */}
        <div style={itemStyle} onClick={showAllInterviews}>
          <FontAwesomeIcon icon={faChartColumn} />
          <span style={paddingStyle}> Past interviews</span>
        </div>
        {/* </Link> */}

        {userInfo?.isLogedIn ? (
          <div style={itemStyle} onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span style={paddingStyle}> Log Out </span>
          </div>
        ) : (
          <Link to="/sign-up" style={linkStyle}>
            <div style={itemStyle}>
              <FontAwesomeIcon icon={faRightToBracket} />
              <span style={paddingStyle}> Sign Up/Log In</span>
            </div>
          </Link>
        )}
      </div>
      <div>
        <Link
          to="/profile"
          style={userInfo?.isLogedIn ? linkStyle : { display: "none" }}
        >
          <div style={{ padding: "10px" }}>
            <FontAwesomeIcon icon={faUser} />
            <span style={paddingStyle}>
              {userInfo?.isLogedIn ? userInfo.userName : ""}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;

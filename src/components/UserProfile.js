import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function UserProfile() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [zIdx, setZIndex] = useState(2);
  const handleChangePassword = () => {
    sendPasswordResetEmail(auth, userInfo.email)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", userInfo.email);
        alert(
          "To reset your password an email has been sent on your current login account email Address."
        );
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("An Internal Error is Occured. Please try again later...");
        // ...
      });
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "30%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "20%",
            height: "100%",
            boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
          }}
        >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                position: "relative",
                zIndex: zIdx,
                boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
              }}
              src={userInfo?.profileImgUrl}
              alt="Profile Img"
            />
        </div>

        <p
          style={{
            width: "60%",
            height: "100%",
            alignContent: "start",
            paddingTop: "40px",
            paddingLeft: "10px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>
            <i>About me: </i>
          </span>
          {userInfo?.aboutMe}
        </p>
      </div>

      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "25%",
            height: "80%",
            boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            padding: "2%",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              height: "fit-content",
              width: "100%",
              fontSize: "25px",
            }}
          >
            Contact Details
          </div>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <span style={{ fontWeight: "bold" }}>{"Name: "}</span>
              <span> {userInfo.userName}</span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>{"Email: "}</span>
              <span> {userInfo.email} </span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>{"Mobile No.: "}</span>
              <span> {userInfo.mobileNo} </span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>{"Address: "}</span>
              <span> {userInfo.address} </span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>{"Country: "}</span>
              <span> {userInfo.country} </span>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "25%",
            height: "80%",
            boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            padding: "2%",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              height: "fit-content",
              width: "100%",
              fontSize: "25px",
            }}
          >
            Education Details
          </div>
          <div
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "space-between",
            }}
          >
            <div>
              <span style={{ fontWeight: "bold" }}>{"Graduation: "}</span>
              <span> {userInfo.graduation} </span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>{"Specialization: "}</span>
              <span> {userInfo.specialization} </span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>
                {"Marks(in percentage): "}
              </span>
              <span> {userInfo.marks} </span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>{"Graduation year: "}</span>
              <span> {userInfo.year} </span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>{"College name: "}</span>
              <span> {userInfo.collName} </span>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "25%",
            height: "80%",
            boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            padding: "2%",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              height: "fit-content",
              width: "100%",
              fontSize: "25px",
            }}
          >
            Quick links
          </div>
          <div
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "space-between",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={handleChangePassword}
            >
              <i>Change Your Password</i>
            </div>
            <div
              style={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/edit-profile");
              }}
            >
              <i>Edit Your Profile</i>
            </div>
            <div
              style={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/past-mock-interviews");
              }}
            >
              <i>Your All Interviews</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

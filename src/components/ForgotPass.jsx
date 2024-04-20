import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPass = () => {
  useEffect(() => {
    document.title = 'Reset Password';
  }, []);

  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
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
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      <h1> An email will be sent to your sign-in account email to reset your password</h1>
      <div
        style={{
          boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
          maxWidth: "fit-content",
          flexDirection: "column",
        }}
      >
        <div className="login-box">
          <h1>Forgot Password</h1>
          <form>
            <label>Email</label>
            <input
              type="email"
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="button"
              value="Submit"
              style={{ cursor: "pointer" }}
              onClick={handleResetPassword}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;

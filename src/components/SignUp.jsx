import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { setUserInfo } from "../features/userInfo/userInfo";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";

const Signup = () => {
  useEffect(() => {
    document.title = 'Sign up';
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(true);
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch(setUserInfo({
          userName:user.displayName,
          email:user.email,
          isVerified: user.emailVerified,
          isLogedIn:true,
          id: user.uid
        }))
        setLoading(false);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Either invalid email or password has less than 6 characters...")
        // ..
      });
  };

  if(loading) return <Spinner msg="Please wait..."/>

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
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
        <div className="signup-box">
          <h1>Sign Up</h1>
          <form>
            <label>First Name</label>
            <input
              type="text"
              placeholder=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last Name</label>
            <input
              type="text"
              placeholder=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder=""
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            <input type="button" value="Submit" onClick={onSubmit}/>
          </form>
        </div>
        <p className="para-2">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

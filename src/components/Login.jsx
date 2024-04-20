import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { setUserInfo } from "../features/userInfo/userInfo";
import { useDispatch } from "react-redux";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase";
import Spinner from "./Spinner";

const Login = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const asyncFunc = async () => {
          setLoading(true);
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
                id: user.uid,
                userName: user.displayName,
                email: user.email,
                isVerified: user.emailVerified,
                isLogedIn: true,
              })
            );
          }
          setLoading(false);
        };
        asyncFunc();
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Either email or password is incorrect.")
      });
  };

  if(loading)return <Spinner msg="Please wait..."/>
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
      <h1> Please Login to save user mock interview in your Account </h1>
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
          <h1>Login</h1>
          <form>
            <label>Email</label>
            <input
              type="email"
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              type="button"
              value="Submit"
              style={{ cursor: "pointer" }}
              onClick={onLogin}
            />
          </form>
        </div>
        <p className="para-2">
          Not have an account? <Link to="/sign-up"> Sign Up here </Link>
          <br/>
          Forgot password? <Link to="/forgot-password"> Reset password here </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

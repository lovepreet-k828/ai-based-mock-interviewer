import { useEffect } from "react";
import UserProfile from "./UserProfile";

const Profile = () => {
  useEffect(() => {
    document.title = 'Profile';
  }, []);

  return (
    <div
      className="container"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "fit-content",
          fontWeight: "bold",
          fontSize: "30px",
          margin: "10px 0",
          textAlign:"center"
        }}
      >
          Your Profile
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserProfile />
      </div>
    </div>
  );
};
export default Profile;

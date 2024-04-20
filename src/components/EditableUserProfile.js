import imgSrc from "./1.jpg";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function EditatbleUserProfile() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [profileImg, setProfileImg] = useState(imgSrc);
  const [zIdx, setZIndex] = useState(2);
  const [userName, setUserName] = useState(userInfo?.userName);
  const [email, setEmail] = useState(userInfo?.email);
  const [mobileNo, setMobileNo] = useState(userInfo?.mobileNo);
  const [country, setCountry] = useState(userInfo?.country);
  const [address, setAddress] = useState(userInfo?.address);
  const [graduation, setGraduation] = useState(userInfo?.graduation);
  const [specialization, setSpecialization] = useState(userInfo?.specialization);
  const [year, setYear] = useState(userInfo?.year);
  const [collName, setCollName] = useState(userInfo?.collName);
  const [marks, setMarks] = useState(userInfo?.marks);
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
          <div
            style={{
              display: "inline-block",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              onMouseOver={() => {
                setZIndex(0);
              }}
              onMouseLeave={() => {
                setZIndex(2);
              }}
              style={{
                width: "100%",
                height: "100%",
                alignContent: "center",
                textAlign: "center",
                position: "absolute",
                fontWeight: "bold",
                background: "rgb(255, 255, 255, 0.8)",
                zIndex: "1",
              }}
            >
              <label for="profileImgId">
                Profile Image:
                <input
                  id="profileImgId"
                  onChange={(e) => {
                    setProfileImg(e.target.value);
                  }}
                  type="file"
                />
              </label>
            </div>
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
              onMouseEnter={() => {
                setZIndex(0);
              }}
              onMouseLeave={() => {
                setZIndex(2);
              }}
              src={profileImg}
              alt="Profile sPic"
            />
          </div>
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
          I am final year student at Dr. BR. Ambedkar National Institute of
          Technology, Jalander with Bachelors of Technology in Computer Science
          and Engineering
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
            width: "40%",
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
              <label style={{ fontWeight: "bold" }}>
                {"Name: "}
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </label>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>
                {"Email: "}
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>
                {"Mobile No.: "}
                <input
                  type="text"
                  value={mobileNo}
                  onChange={(e) => {
                    setMobileNo(e.target.value);
                  }}
                />
              </label>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>
                {"Address: "}
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </label>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>
                {"Country: "}
                <input
                  type="text"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "40%",
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
              <label style={{ fontWeight: "bold" }}>
                {"Graduation: "}
                <select
                  type="text"
                  value={graduation}
                  onChange={(e) => {
                    setGraduation(e.target.value);
                  }}
                >
            <option value={"B.Tech/B.E."}>B.Tech/B.E.</option>
            <option value={"B.A."}>B.Tech/B.E.</option>
            <option value={"B.Com"}>B.Com</option>
            <option value={"B.Sc."}>B.Sc.</option>
            </select>
              </label>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>
                {"Specialization: "}
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => {
                    setSpecialization(e.target.value);
                  }}
                />
              </label>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>
                {"Marks(in percentage): "}
                <input
                  type="text"
                  value={marks}
                  onChange={(e) => {
                    setMarks(e.target.value);
                  }}
                />
              </label>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>
                {"Graduation year: "}
                <input
                  type="text"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </label>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>
                {"College name: "}
                <input
                  type="text"
                  value={collName}
                  onChange={(e) => {
                    setCollName(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

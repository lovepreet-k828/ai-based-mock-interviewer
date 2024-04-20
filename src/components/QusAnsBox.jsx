import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const QusAnsBox = () => {
  const [currentTabKey, setCurrentTabKey] = useState("qus");
  const totalQusAns = useSelector((state) => state.qusAns.totalQusAns);
  const [currentQusKey, setCurrentQusKey] = useState("");
  const [currentQusAns, setCurrentQusAns] = useState({});
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    setKeys(Object.keys(totalQusAns).sort());
  }, [totalQusAns]);
  useEffect(() => {
    if (currentQusKey !== "") {
      setCurrentQusAns(totalQusAns[currentQusKey]);
      console.log(
        "key: ",
        currentQusKey,
        " QusAns: ",
        totalQusAns[currentQusKey]
      );
    } else {
      setCurrentQusAns({});
    }
  }, [currentQusKey]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "70%",
        width: "100%",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          height: "15%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            height: "100%",
            width: "fit-content",
            border: "1px solid gray",
            borderRadius: "5px",
            display: "flex",
            // flexDirection: "",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <span style={{ height: "100%", display: "inline" }}>
            <label>
              {/* Select Job Title: */}
              <select
                name="selectedFruit"
                style={{
                  textAlign: "center",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "medium",
                  cursor: "pointer",
                  height: "100%",
                  backgroundColor:
                    currentTabKey === "qus" ? "hsla(0, 0%, 71%, .50)" : "white",
                }}
                onChange={(e) => {
                  setCurrentQusKey(e.target.value);
                  setCurrentTabKey("qus");
                }}
                onClick={()=>{setCurrentTabKey("qus");}}
              >
                <option value="">Select Qus No.</option>
                {keys.map((val, index) => {
                  return <option value={val}>Qus No.: {index}</option>;
                })}
              </select>
            </label>
          </span>
          <span
            style={{
              padding: "0 10px",
              display: "inline",
              height: "100%",
              border: "1px solid gray",
              alignContent: "center",
              backgroundColor:
                currentTabKey === "yourAns" ? "hsla(0, 0%, 71%, .50)" : "white",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrentTabKey("yourAns");
            }}
          >
            {" "}
            Your Ans{" "}
          </span>
          <span
            style={{
              padding: "0 10px",
              display: "inline",
              height: "100%",
              alignContent: "center",
              backgroundColor:
                currentTabKey === "aiAns" ? "hsla(0, 0%, 71%, .50)" : "white",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrentTabKey("aiAns");
            }}
          >
            {" "}
            AI Ans{" "}
          </span>
        </div>
      </div>

      <div
        style={{
          height: "68%",
          width: "95%",
          padding: "1%",
          border: "1px solid gray",
          borderRadius: "5px",
          overflowY: "scroll",
        }}
      >
        {currentQusKey !== "" && (
          <div style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "bold" }}>Start time: </span>{" "}
            {currentQusKey} to{" "}
            <span style={{ fontWeight: "bold" }}>End time: </span>
            {currentQusAns?.endTime}
          </div>
        )}
        {currentTabKey === "yourAns"
          ? currentQusAns?.yourAns?.map((value, index) => {
              if (value?.sentiment > 0) {
                return (
                  <>
                    {" "}
                    <span
                      style={{
                        backgroundColor: "rgba(100, 210, 80, .75)",
                        borderRadius: "2px",
                        margin: "0 1px",
                        padding: "1px 3px",
                      }}
                    >
                      {" " + value?.value + " "}
                    </span>{" "}
                  </>
                );
              } else if (value?.sentiment < 0) {
                return (
                  <>
                    {" "}
                    <span
                      style={{
                        backgroundColor: "rgba(240, 50, 50, .75)",
                        borderRadius: "2px",
                        margin: "0 1px",
                        padding: "1px 3px",
                      }}
                    >
                      {" " + value?.value + " "}
                    </span>{" "}
                  </>
                );
              } else {
                return (
                  <>
                    {"  "}
                    <span
                      style={{
                        backgroundColor: "hsla(0, 0%, 71%, .75)",
                        borderRadius: "2px",
                        margin: "0 1px",
                        padding: "1px 3px",
                      }}
                    >
                      {value?.value}
                    </span>
                    {"  "}
                  </>
                );
              }
            })
          : currentTabKey === "aiAns"
          ? currentQusAns && (
              <div style={{ width: "100%", textAlign: "justify" }}>
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  {currentQusKey !== "" && <span>Technical Words Answer</span>}
                </div>
                {currentQusAns[currentTabKey]?.technical}
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  {currentQusKey !== "" && <span>Simple Words Answer</span>}
                </div>
                {currentQusAns[currentTabKey]?.simple}
              </div>
            )
          : currentQusAns && currentQusAns[currentTabKey]}
      </div>
    </div>
  );
};

export default QusAnsBox;

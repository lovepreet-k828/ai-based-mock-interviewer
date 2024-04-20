import PieChart from "./PieChart";
import VideoBox from "./VideoBox";
import RealtimeAnsBox from "./RealtimeAnsBox";
import RecordedPieChart from "./RecordedPieChart";
import RecordedVideoBox from "./RecordedVideoBox";
import { useSelector } from "react-redux";

function RecordedMidContent() {
  const totalRI = useSelector(
    (state) => state.totalRecordedInfo.totalRecordedInfo
  );
  return (
    <div
      style={{
        width: "55%",
        padding: "0px 5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"space-evenly"
      }}
    >
      <div
      style={{
        width: "98%",
        height: "11%",
        padding: "1%",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        justifyContent:"space-evenly"
      }}
    >
      <div><span style={{fontWeight:"bold"}}>{"Date and Time: "}</span><span>{totalRI?.date}</span></div>
      <div></div>
    </div>
      <div
        style={{
          width: "90%",
          height: "25%",
          padding: "1%",
        }}
      >
        <RecordedPieChart />
      </div>
      <div
        style={{
          width: "95%",
          height: "58%",
          padding: "1%",
        }}
      >
        <RecordedVideoBox />
      </div>
    </div>
  );
}

export default RecordedMidContent;

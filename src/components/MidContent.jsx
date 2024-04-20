import PieChart from "./PieChart";
import VideoBox from "./VideoBox";
import RealtimeAnsBox from "./RealtimeAnsBox";

function MidContent() {
  return (
    <div
      style={{
        width: "55%",
        padding: "0px 5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <RealtimeAnsBox />
      <div
        style={{
          width: "90%",
          height: "25%",
          padding: "1%",
        }}
      >
        <PieChart />
      </div>
      <div
        style={{
          width: "95%",
          height: "58%",
          padding: "1%",
        }}
      >
        <VideoBox />
      </div>
    </div>
  );
}

export default MidContent;

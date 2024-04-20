import Filters from "./Filters";
import { MaxExpBarChart } from "./MaxExpBarChart";
import { MaxVTBarChart } from "./MaxVTBarChart";
import QusAnsBox from "./QusAnsBox";
import RecordedFilter from "./RecordedFilter";
import { RecordedMaxExpBarChart } from "./RecordedMaxExpBarChart";
import { RecordedMaxVTBarChart } from "./RecordedMaxVTBarChart";
import RecordedQusAnsBox from "./RecordedQusAnsBox";

function RecordedRightContent() {
  return (
    <div
      style={{
        width: "45%",
        padding: "1%",
        // backgroundColor: "blue"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "44%",
            width: "100%",
          }}
        >
          <RecordedFilter/>

          <RecordedQusAnsBox/>
          
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "56%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "49%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
          >
            <RecordedMaxExpBarChart />
          </div>
          <div
            style={{
              width: "100%",
              height: "49%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
          >
            <RecordedMaxVTBarChart/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordedRightContent;

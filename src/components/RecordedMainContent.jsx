import { useEffect } from "react";
import RecordedRightContent from "./RecordedRightContent";
import RecordedMidContent from "./RecordedMidContent";

function RecordedMainContent() {
  useEffect(() => {
    document.title = 'Recorded Interview';
  }, []);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        // backgroundColor:"Green",
        display: "flex",
      }}
    >
      <RecordedMidContent/>
      <RecordedRightContent/>
    </div>
  );
}

export default RecordedMainContent;

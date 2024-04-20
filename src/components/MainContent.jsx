import { useState, useEffect } from "react";
import MidContent from "./MidContent";
import RightContent from "./RightContent";

function MainContent() {
  useEffect(() => {
    document.title = 'Start Interview';
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
      <MidContent/>
      <RightContent/>
    </div>
  );
}

export default MainContent;

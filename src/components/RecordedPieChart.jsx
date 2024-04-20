import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import colorsPic from "./colorsPic.png";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [10, 10, 10, 10, 20, 40],
      backgroundColor: [
        "rgba(240, 50, 50, .75)",
        "rgba(100, 210, 80, .75)",
        "#333",
        "rgba(255, 220, 90, .75)",
        "hsla(0, 0%, 71%, .75)",
        "rgba(90, 165, 255, .75)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// const options = {
//   plugins: {
//     legend: {
//       display: false,
//     },
//     title: {
//       display: true,
//       text: "Voice Tone",
//     },
//   },
// };

const paddingX = {
  padding: "0 10px",
};

export default function RecordedPieChart() {
  const [expressions, setExpressions]=useState({});
  const [currentVT, setCurrentVT] = useState({});
  const currentTime = useSelector(
    (state) => state.currentTime.currentTime
  );
  const totalRI = useSelector((state)=>state.totalRecordedInfo.totalRecordedInfo)
  useEffect(()=>{
    if(currentTime!==""&&totalRI?.totalExpressions!==undefined){
    let keys = Object.keys(totalRI?.totalExpressions).sort().reverse();
    let approxCurrentTime = keys.find((x)=> x.localeCompare(currentTime)<=0);
    setExpressions(totalRI?.totalExpressions[approxCurrentTime]?.allExpressions);
    let vtKeys = Object.keys(totalRI?.voiceTone).sort().reverse();
    let approxVTCurrentTime = vtKeys.find((x)=> x.localeCompare(currentTime)<=0);
    setCurrentVT(totalRI?.voiceTone[approxVTCurrentTime]?.wholeVT);
    } 
  },[currentTime]);
  return (
    <div
      style={{
        display: "flex",
        height: "98%",
        width: "98%",
        justifyContent: "space-around",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        padding: "1%",
      }}
    >
      <div style={{width: "38%", height: "100%" }}>
        <img src={colorsPic} alt="colors name" style={{width:"100%", height:"90%", objectFit:"fill"}}/>
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          width: "60%",
        }}
      >
        <div style={{ height: "100%", width: "50%" }}>
          <Pie
            data={{
              labels: ["Angry", "Disgusted", "Surprised", "Happy", "Neutral", "Sad"],
              datasets: [
                {
                  label: "% of Sentiments",
                  data: [expressions?.angry, expressions?.disgusted, expressions?.surprised, 
                    expressions?.happy, expressions?.neutral, expressions?.sad],
                    backgroundColor: [
                      "rgba(240, 50, 50, .75)",
                      "rgba(255, 220, 90, .75)",
                      "rgba(170, 90, 240, .75)",
                      "rgba(100, 210, 80, .75)",
                      "hsla(0, 0%, 71%, .75)",
                      "rgba(90, 165, 255, .75)",
                    ],
                  borderColor: [
                    "rgba(240, 50, 50, 1)",
                    "rgba(255, 220, 90, 1)",
                      "rgba(170, 90, 240, 1)",
                      "rgba(100, 210, 80, 1)",
                      "hsla(0, 0%, 71%, 1)",
                      "rgba(90, 165, 255, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            style={{ maxHeight: "100%" }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Face Expressions",
                },
              },
            }}
          />
        </div>
        <div style={{ height: "100%", width: "50%" }}>
        <Pie
            data={{
              labels: ["Negetive", "Positive", "Neutral",],
              datasets: [
                {
                  label: "% of Sentiments",
                  data: [currentVT?.neg, currentVT?.pos, currentVT?.neu],
                    backgroundColor: [
                      "rgba(240, 50, 50, .75)",
                      "rgba(100, 210, 80, .75)",
                      "hsla(0, 0%, 71%, .75)",
                    ],
                  borderColor: [
                    "rgba(240, 50, 50, 1)",
                      "rgba(100, 210, 80, 1)",
                      "hsla(0, 0%, 71%, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            style={{ maxHeight: "100%" }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Voice Tone",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

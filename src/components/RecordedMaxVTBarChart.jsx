import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
// import faker from 'faker';labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      // position: 'top',
    },
    title: {
      display: true,
      text: "Max Voice Tone",
    },
  },
  scales: {
    y: {
      title: "% age of sentiment",
    },
  },
};

const labels = (end, start = 0, step = 1) =>
  Array.from(
    { length: Math.ceil((end - start) / step) },
    (_, i) => i * step + start
  );

export const data = {
  labels: labels(20),
  datasets: [
    {
      label: "cummulativeMaxExpressions",
      data: labels(20),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function RecordedMaxVTBarChart() {
  const [currentLabels, setCurrentLabels] = useState([]);
  const [cummulativeMaxVT, setcummulativeMaxVT] = useState(
    []
  );
  const [vtBarColors, setVtBarColors] = useState([]);

  const currentTime = useSelector((state) => state.currentTime.currentTime);
  const totalRI = useSelector((state)=> state.totalRecordedInfo.totalRecordedInfo);

  useEffect(() => {
    if (currentTime !== ""&&totalRI?.voiceTone!==undefined) {
      let keys = Object.keys(totalRI?.voiceTone).sort().reverse();
      if (keys.length > 0 && keys[keys.length-1].localeCompare(currentTime) <= 0) {
        let approxCurrentTime = keys.find(
          (x) => x.localeCompare(currentTime) <= 0
        );
        
        keys.reverse();
        setCurrentLabels(keys.filter((x)=>x.localeCompare(approxCurrentTime)<=0));
        
        setcummulativeMaxVT(
        currentLabels
        .flatMap((x)=>totalRI?.voiceTone[x]?.maxVT?.value))
        setVtBarColors(
        currentLabels
        .flatMap((x)=>{
          return {
              neg: "rgba(240, 50, 50, .75)",
              pos: "rgba(100, 210, 80, .75)",
              neu: "hsla(0, 0%, 71%, .75)",
            }[totalRI?.voiceTone[x]?.maxVT?.name]
          }
        ))
        console.log("nawen Expressions1: ", keys);
        console.log("nawen Expressions2: ", approxCurrentTime);
      }
    }
  }, [currentTime]);

  return (
    <Bar
      options={options}
      data={{
        labels: currentLabels,
        datasets: [
          {
            label: "Max Voice Tone",
            backgroundColor: vtBarColors,
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: cummulativeMaxVT,
          },
        ],
      }}
      style={{
        backgroundColor: "white",
        height: "100%",
        minWidth: "100%",
        borderRadius: "10px",
        padding: "1%",
        aspectRatio: "auto",
      }}
    />
  );
}

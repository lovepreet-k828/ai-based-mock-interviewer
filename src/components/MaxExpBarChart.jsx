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
      text: "Max Face Expressions",
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

export function MaxExpBarChart() {
  const [currentLabels, setCurrentLabels] = useState([]);
  const [cummulativeMaxExpressions, setcummulativeMaxExpressions] = useState(
    []
  );
  const [barColors, setBarColors] = useState([]);

  const currentTime = useSelector((state) => state.currentTime.currentTime);
  const totalExpressions = useSelector(
    (state) => state.totalExpressions.totalExpressions
  );
  useEffect(() => {
    if (currentTime !== "") {
      let keys = Object.keys(totalExpressions).sort().reverse();
      if (keys.length > 0 && keys[keys.length-1].localeCompare(currentTime) <= 0) {
        let approxCurrentTime = keys.find(
          (x) => x.localeCompare(currentTime) <= 0
        );

        // console.log("maxValue aa: ", Math.max(...expressionValues))
        keys.reverse();
        setCurrentLabels(
          keys.filter((x) => x.localeCompare(approxCurrentTime) <= 0)
        );
        setcummulativeMaxExpressions(
          currentLabels.flatMap(
            (x) => totalExpressions[x]?.maxExpression?.value
          )
        );
        setBarColors(
          currentLabels.flatMap((x) => {
            return {
              angry: "rgba(240, 50, 50, .75)",
              disgusted: "rgba(255, 220, 90, .75)",
              surprised: "rgba(170, 90, 240, .75)",
              happy: "rgba(100, 210, 80, .75)",
              neutral: "hsla(0, 0%, 71%, .75)",
              sad: "rgba(90, 165, 255, .75)",
              fearful: "#333",
            }[totalExpressions[x]?.maxExpression?.name];
          })
        );

        // for (let x in keys) {
        //   if (x.localeCompare(approxCurrentTime) > 0) break;
        //   console.log("key entry: ",x)
        //   tempLabels.push(x);
        //   tempMaxExpression.push(totalExpressions[x]?.maxExpression?.value);
        //   tempBarColors.push(
        //     {
        //       angry: "rgba(240, 50, 50, .75)",
        //       disgusted: "rgba(100, 210, 80, .75)",
        //       surprised: "rgba(170, 90, 240, .75)",
        //       happy: "rgba(255, 220, 90, .75)",
        //       neutral: "hsla(0, 0%, 71%, .75)",
        //       sad: "rgba(90, 165, 255, .75)",
        //       fearful: "#333",
        //     }[totalExpressions[x]?.maxExpression?.name]
        //   );
        // }
        console.log("nawen Expressions1: ", keys);
        console.log("nawen Expressions2: ", approxCurrentTime);
        // console.log("nawen Expressions3: ", tempMaxExpression);
        // setCurrentLabels(tempLabels);
        // setcummulativeMaxExpressions(tempMaxExpression);
        // setBarColors(tempBarColors);
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
            label: "Max Face Expressions",
            backgroundColor: barColors,
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: cummulativeMaxExpressions,
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

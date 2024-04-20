import OpenAI from "openai";
import Sentiment from "sentiment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQusAns } from "../features/qusAns/qusAns";
import { addVoiceTone } from "../features/voiceTone/voiceToneSlice";
import { setCurrentRealtimeAns } from "../features/realtimeAns/realtimeAns";
const RealtimeAnsBox = () => {
  const [isSubmitAns, setIsSubmitAns] = useState(false);
  const [userAns, setUserAns] = useState("");
  const [prevTime, setPrevTime] = useState("00:00");
  const [qusIdx, setQusIdx] = useState(0);
  
  const interviewState = useSelector(
    (state) => state.interviewState.currentInterviewState
  );

  const dispatch = useDispatch();
  const totalQusAns = useSelector((state) => state.qusAns.totalQusAns);
  const currentTime = useSelector((state) => state.currentTime.currentTime);
  const aiQA = useSelector((state) => state.aiQA.aiQA);
  const realtimeAns = useSelector((state)=>state.realtimeAns.currentRealtimeAns);

  const [qusAnsButtonValue, setQusAnsButtonValue] = useState("");
  useEffect(() => {
    if (interviewState !== "notStarted") {
      if (isSubmitAns) {
        setQusAnsButtonValue("Submit Ans");
      } else {
        if (qusAnsButtonValue !== "Submit Ans") {
          setQusAnsButtonValue("I'm ready Ask Qus");
        } else {
          setQusAnsButtonValue("Next Qus");
        }
      }
    }
  }, [interviewState, isSubmitAns]);

  const getSentiment = (str) => {
    var sentiment = new Sentiment();
    var result = sentiment.analyze(str);
    return result.score;
  };

  const askQus = (str) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(str);
    synth.speak(utterThis);
    console.log("Qus to be asked is: ", str);
  };

  const getUserAnsWithScore = () => {
    let tokens = realtimeAns.split(" ");
    let userAnsWithScore = [];
    tokens.forEach((x) => {
      userAnsWithScore.push({ value: x, sentiment: getSentiment(x) });
    });
    return userAnsWithScore;
  };

  const addCurrentAns = () => {
    let newQusAns = {};
    let userAnsWithScore = getUserAnsWithScore();
    newQusAns[prevTime] = {
      qus: aiQA[qusIdx].qus,
      yourAns: userAnsWithScore,
      aiAns: aiQA[qusIdx].ans,
      endTime: currentTime,
    };
    dispatch(addQusAns(newQusAns));
    console.log("totalQusAns", totalQusAns);
    dispatch(setCurrentRealtimeAns(""));
    // setUserAns("");
  };

  const qusAnsButtonHandler = () => {
    if (isSubmitAns) {
      addCurrentAns();
    } else {
      if (qusIdx > 9) {
        askQus("Interview Over: All questions are answered.");
      } else {
        askQus(aiQA[qusIdx].qus);
        dispatch(addQusAns({
          "currentQus":{
            qus: aiQA[qusIdx].qus,
          }
        }));
        setQusIdx(qusIdx + 1);
      }
      if (document?.getElementById("vid")?.currentTime !== undefined) {
        setPrevTime(
          new Date(document.getElementById("vid")?.currentTime * 1000)
            ?.toISOString()
            ?.slice(14, 19)
        );
      }
    }
    setIsSubmitAns(!isSubmitAns);
  };

  useEffect(() => {
    if (realtimeAns.slice(-1) === " ") {
      let tmp = realtimeAns.substring(0, realtimeAns.length - 1);
      let vt = getSentiment(tmp.substring(tmp.lastIndexOf(" ") + 1));
      let newVoiceTone = {};
      let neg = 0;
      let pos = 0;
      let neutral = 5;
      let maxVal = 0;
      let maxName = "neu";
      if (vt > 0) {
        pos = vt;
        maxVal = pos * 20;
        maxName = "pos";
      } else if (vt < 0) {
        vt = -vt;
        neg = vt;
        maxVal = neg * 20;
        maxName = "neg";
      } else {
        maxVal = 100;
        maxName = "neu";
      }
      neutral = 5 - vt;
      pos = pos * 20;
      neg = neg * 20;
      neutral = neutral * 20;
      if (document?.getElementById("vid")?.currentTime !== undefined) {
        newVoiceTone[
          new Date(document?.getElementById("vid")?.currentTime * 1000)
            ?.toISOString()
            ?.slice(14, 19)
        ] = {
          wholeVT: { pos: pos, neg: neg, neu: neutral },
          maxVT: {
            value: maxVal,
            name: maxName,
          },
        };
        dispatch(addVoiceTone(newVoiceTone));
      }
    }
  }, [realtimeAns]);
  return (
    <div
      style={{
        width: "98%",
        height: "11%",
        padding: "1%",
      }}
    >
      <div
        style={{
          boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        // onClick={() => getSentiment()}
      >
        <div
          style={{
            height: "75%",
            width: "97%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <textarea
              type="text"
              value={realtimeAns}
              onChange={(e) => {
                dispatch(setCurrentRealtimeAns(e.target.value));
              }}
              style={{
                display: "inline",
                width: "100%",
                height: "100%",
                border: "none",
                padding: "0",
              }}
            ></textarea>
            <button
              onClick={qusAnsButtonHandler}
              style={{
                cursor: "pointer",
                backgroundColor: isSubmitAns ? "red" : "green",
                color: "white",
                // margin: "20% 0 auto 35%",
                height: "100%",
                border: "none",
                padding: "0",
                width: "fit-content",
                borderRadius: "5px",
              }}
            >
              {qusAnsButtonValue}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeAnsBox;

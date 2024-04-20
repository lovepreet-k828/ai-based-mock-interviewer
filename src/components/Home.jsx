import { useEffect } from 'react';
import faceRecognitionPic from "../assets/faceRecognition.jpg";
import textToSpeechPic from "../assets/textToSpeech.avif";
import VoiceRecognitionPic from "../assets/voiceRecognition.jpg";
import aiAnsPic from "../assets/aiAns.jpg";
import sentimentDetectionPic from "../assets/sentimentDetection.jpg";

const Home = () => {
  useEffect(() => {
    document.title = 'Home';
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "fit-content",
          textAlign: "center",
          fontSize: "25px",
          fontWeight: "bold",
          margin: "20px 0",
        }}
      >
        Welcome to AI Based Mock Interviewer
      </div>
      <div
        style={{
          height: "fit-content",
          textAlign: "center",
          fontSize: "17px",
          fontWeight: "bold",
        }}
      >
        Key features of this Mock Interviewer are:
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "50%",
            justifyContent: "space-evenly",
          }}
        >
          <div
          className="hover-style"
            style={{
              height: "100%",
              width: "25%",
              boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={sentimentDetectionPic}
              alt="faceRecognition"
              style={{
                borderRadius: "10px",
                height: "50%",
                width: "100%",
                objectFit: "fill",
              }}
            />
            <p
              style={{
                alignContent: "start",
                height: "50%",
                padding: "0 10px",
                margin: "0",
                textAlign: "justify",
                overflow:"auto",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                <i>{"It can analyse your sentiments: "}</i>
              </span>
              {"We have used faceAPI.js (a javascript api) and Sentiment (a javascript package) for face expressions and text sentiment detection respectively. We are analyzing user's answer word by word to detect tone of whole answer."}
            </p>
          </div>
          <div
          className="hover-style"
            style={{
              height: "100%",
              width: "30%",
              boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              display: "flex",
            }}
          >
            <img
              src={aiAnsPic}
              alt="faceRecognition"
              style={{
                borderRadius: "10px",
                height: "100%",
                width: "55%",
                objectFit: "fill",
              }}
            />
            <p
              style={{
                alignContent: "center",
                height: "100%",
                width: "45%",
                padding: "0 10px",
                margin: "0",
                textAlign: "justify",
                overflow:"auto",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                <i>{"It provides answer: "}</i>
              </span>
             {"We have used GPT-3.5 model to provide anwer of each asked qus during this mock interview. The AI answers are provided in two formats one in technical words and another in simple words."}
            </p>
          </div>
          <div
          className="hover-style"
            style={{
              height: "100%",
              width: "30%",
              boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              display: "flex",
            }}
          >
            <img
              src={textToSpeechPic}
              alt="faceRecognition"
              style={{
                borderRadius: "10px",
                height: "100%",
                width: "50%",
                objectFit: "fill",
              }}
            />
            <p
              style={{
                alignContent: "center",
                height: "100%",
                width: "50%",
                padding: "0 10px",
                margin: "0",
                textAlign: "justify",
                overflow:"auto",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                <i>{"It can speak: "}</i>
              </span>
              {"We have used speechSynthesis API to ask questions to user with audio, By using this API this mock interviewer is able to ask questions in human voice."}
            </p>
          </div>
        </div>
        <div
          style={{
            height: "30%",
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div
          className="hover-style"
            style={{
              height: "100%",
              width: "45%",
              boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              display: "flex",
            }}
          >
            <img
              src={faceRecognitionPic}
              alt="faceRecognition"
              style={{
                borderRadius: "10px",
                height: "100%",
                width: "50%",
                objectFit: "fill",
              }}
            />
            <p
              style={{
                alignContent: "center",
                height: "100%",
                width: "50%",
                padding: "0 10px",
                margin: "0",
                textAlign: "justify",
                overflow:"auto",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                <i>{"Visualized Data & friendly Interface: "}</i>
              </span>
              {"We have used chart.js (a javascript package) to represent sentiment data with pie and bar charts. Whole content is tried to be visible on single screen so that user has not to scroll the screen."}
            </p>
          </div>
          <div
          className="hover-style"
            style={{
              height: "100%",
              width: "45%",
              boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              display:"flex"
            }}
          >
            <img
              src={VoiceRecognitionPic}
              alt="faceRecognition"
              style={{
                borderRadius: "10px",
                height: "100%",
                width: "50%",
                objectFit: "fill",
              }}
            />
            <p
              style={{
                alignContent: "center",
                height: "100%",
                width: "50%", 
                padding: "0 10px",
                margin: "0",
                textAlign: "justify",
                overflow:"auto",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                <i>{"It can hear you: "}</i>
              </span>
              {"We have used DeepGram's speech recognition API so that user can answer the question by speaking or writing as they prefer."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

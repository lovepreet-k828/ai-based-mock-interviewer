import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTime } from "../features/currentTime/currentTimeSlice";
import { setCurrentInterviewState } from "../features/interviewState/interviewState";
import { addExpressions } from "../features/totalExpressions/totalExpressions";
import { appendToCurrentRealtimeAns } from "../features/realtimeAns/realtimeAns";
// import {storage} from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import firebaseApp from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Spinner from "./Spinner";
// import videoSrc from "../SampleVideo_1280x720_1mb.mp4";

function VideoBox() {
  const dispatch = useDispatch();

  // var vid = document.getElementById("vid");
  const storage = getStorage(firebaseApp);
  const fireStoreDb = getFirestore(firebaseApp);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [intervalID, setIntervalId] = useState();
  // const [blob, setBlob] = useState([]);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [hrefLink, setHrefLink] = useState(null);
  const [data, setData] = useState(0);
  const [totalData, setTotalData] = useState({});
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [currentDate, setCurrentDate] = useState(0);

  const interviewState = useSelector(
    (state) => state.interviewState.currentInterviewState
  );
  const totalExpressions = useSelector(
    (state) => state.totalExpressions.totalExpressions
  );
  const userInfo = useSelector((state)=>state.userInfo.userInfo)
  const voiceTone = useSelector((state) => state.voiceTone.voiceTone);
  const totalQusAns = useSelector((state) => state.qusAns.totalQusAns);
  const jobProfile = useSelector((state) => state.jobProfile.jobProfile);
  const videoRef = useRef();
  const [audioRef, setAudioRef]=useState();
  const videoHeight = 100;
  const videoWidth = 100;
  const canvasRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/weights";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = async () => {
    if(userInfo.isLogedIn===false){
      alert("Please log in if you want to save your mock interview, otherwise continue...")
    }
    setCaptureVideo(true);
    setCurrentDate(Date.now());
    setDate(new Date().toString());
    dispatch(setCurrentInterviewState("started"));
    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        const med_rec = new MediaRecorder(stream, {
          mimeType: "video/webm",
        });
        med_rec.addEventListener("dataavailable", function (e) {
          if (e.data.size > 0) {
            setRecordedChunks((prev) => prev.concat(e.data));
            console.log("Data aa gia:", e.data);
          }
        });
        med_rec.start(1000);
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      console.log({ stream });
      if (!MediaRecorder.isTypeSupported("audio/webm"))
        return alert("Browser not supported");
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      setAudioRef(stream);
      const socket = new WebSocket("wss://api.deepgram.com/v1/listen", [
        "token",
        process.env.REACT_APP_DEEPGRAM_KEY, 
      ]);
      socket.onopen = () => {
        console.log({ event: "onopen" });
        mediaRecorder.addEventListener("dataavailable", async (event) => {
          if (event.data.size > 0 && socket.readyState === 1) {
            socket.send(event.data);
            // blob.push(event.data);
          }
        });
        mediaRecorder.start(1000);
      };

      socket.onmessage = (message) => {
          try {
            const received = JSON.parse(message.data);
          const transcript = received.channel.alternatives[0].transcript;
          if (transcript && received.is_final) {
            console.log("transcript", transcript);
            dispatch(appendToCurrentRealtimeAns(transcript + " "));
          }
          } catch (error) {
            console.log("finish error")
          }
      };

      socket.onclose = () => {
        console.log({ event: "onclose" });
      };

      socket.onerror = (error) => {
        console.log({ event: "onerror", error });
      };
    })
    .catch((err) => {
      console.error("error:", err);
    });

  };

  const askQus = (str) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(str);
    synth.speak(utterThis);
    console.log("Qus to be asked is: ", str);
  };

  const handleVideoOnPlay = () => {
    askQus(
      "Welcome to the A I based mock interviewer, take a deep breath and whenever you feel ready then just click the Ask question button and your interview will be started, all the very best for your mock interview"
    );
    setIntervalId(
      setInterval(async () => {
        if (interviewState !== "paused" && canvasRef && canvasRef.current) {
          canvasRef.current.innerHTML = faceapi?.createCanvasFromMedia(
            videoRef?.current
          );
          const displaySize = {
            width: videoWidth,
            height: videoHeight,
          };

          faceapi.matchDimensions(canvasRef.current, displaySize);

          const detections = await faceapi
            .detectAllFaces(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions();

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );

          canvasRef &&
            canvasRef.current &&
            canvasRef.current
              .getContext("2d")
              .clearRect(0, 0, videoWidth, videoHeight);

          canvasRef &&
            canvasRef.current &&
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          canvasRef &&
            canvasRef.current &&
            faceapi.draw.drawFaceLandmarks(
              canvasRef.current,
              resizedDetections
            );
          canvasRef &&
            canvasRef.current &&
            faceapi.draw.drawFaceExpressions(
              canvasRef.current,
              resizedDetections
            );

          if (
            resizedDetections &&
            resizedDetections.length > 0 &&
            resizedDetections[0]?.expressions
          ) {
            var newExpressionsEntry = {};
            let expressionNames = Object.keys(resizedDetections[0].expressions);
            let expressionValues = Object.values(
              resizedDetections[0].expressions
            );
            let maxValue = Math.max(...expressionValues);
            if (document?.getElementById("vid")?.currentTime !== undefined) {
              let currentTime = new Date(
                document?.getElementById("vid")?.currentTime * 1000
              )
                .toISOString()
                .slice(14, 19);
              newExpressionsEntry[currentTime] = {
                allExpressions: resizedDetections[0].expressions,
                maxExpression: {
                  value: maxValue * 100,
                  name: expressionNames[expressionValues.indexOf(maxValue)],
                },
              };
              dispatch(addExpressions(newExpressionsEntry));
              dispatch(setCurrentTime(currentTime));
              console.log("new entry", currentTime, newExpressionsEntry);
            }
          }
        } else {
          console.log("video is stoped");
        }
      }, 1000)
    );
  };

  const handleVideoOnPlayTmp = () => {
    setIntervalId(
      setInterval(() => {
        if (document?.getElementById("rec-vid")?.currentTime * 1000) {
          dispatch(
            setCurrentTime(
              new Date(document?.getElementById("rec-vid")?.currentTime * 1000)
                .toISOString()
                .slice(14, 19)
            )
          );
          console.log(
            "curentTime is: ",
            new Date(document?.getElementById("rec-vid")?.currentTime * 1000)
              .toISOString()
              .slice(14, 19)
          );
        }
      }, 1000)
    );
  };

  var getFileBlob = function (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener("load", function () {
      cb(xhr.response);
    });
    xhr.send();
  };

  const uploadToStorage = (imageURL) => {
    getFileBlob(imageURL, (blob) => {
      storage()
        .ref()
        .put(blob)
        .then(function (snapshot) {
          console.log("Uploaded a blob or file!");
        });
    });
  };
  const [duration, setDuration]= useState("");
  const closeWebcam = async () => {
    videoRef.current.pause();
    setDuration((new Date(videoRef.current?.currentTime * 1000)
    .toISOString()
    .slice(11, 19)));
    console.log("finished");
    clearInterval(intervalID);
    videoRef.current?.srcObject?.getTracks().forEach(track => {
      if (track.readyState == 'live') {
        track.stop();
      }
    });
    if(audioRef){
    audioRef?.getTracks().forEach(track => {
      if (track.readyState == 'live') {
        track.stop();
      }
    });
  }
    console.log("total expressions", totalExpressions);
    console.log("voice tone", voiceTone);
    console.log("total qus ans", totalQusAns);
    // console.log("link: ", URL.createObjectURL(new Blob(recordedChunks)));
    // setHrefLink(URL.createObjectURL(new Blob(recordedChunks)));
    // uploadToStorage(URL.createObjectURL(new Blob(recordedChunks)));

    setUserId(userInfo.id);
    if (userInfo.isLogedIn) {
      setLoading(true);
      const storageRef = ref(storage, `Videos/${userId}/${currentDate}.webm`);

      const uploadTask = uploadBytesResumable(
        storageRef,
        new Blob(recordedChunks)
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData({
              id: `${currentDate}`,
              duration: duration,
              post: jobProfile?.post,
              exp: jobProfile?.exp,
              videoUrl: downloadURL,
              date: date,
            });
          });
        }
      );
    } else {
      dispatch(setCurrentInterviewState("finished"));
      console.log("you are not logged in.");
    }
  };

  useEffect(() => {
    if (data !== 0) {
      const uploadDoc = async () => {
        await setDoc(
          doc(fireStoreDb, `shortInfo_${userId}`, `${currentDate}`),
          data
        )
        await setDoc(
          doc(fireStoreDb, `totalInfo_${userId}`, `${currentDate}`),
          {
            id: `${currentDate}`,
            totalExpressions: JSON.stringify(totalExpressions),
            totalQusAns: JSON.stringify(totalQusAns),
            voiceTone: JSON.stringify(voiceTone),
          }
        );
        dispatch(setCurrentInterviewState("finished"));
        setLoading(false);
        console.log("done: ", data,{
          id: `${currentDate}`,
          totalExpressions: JSON.stringify(totalExpressions),
          totalQusAns: JSON.stringify(totalQusAns),
          voiceTone: JSON.stringify(voiceTone),
        });
      };
      uploadDoc().catch((e)=>{
        setLoading(false);
      })
    }
  }, [data]);
  const pauseWebcam = () => {
    if (interviewState === "paused") {
      videoRef.current.play();
      dispatch(setCurrentInterviewState("started"));
    } else {
      videoRef.current.pause();
      dispatch(setCurrentInterviewState("paused"));
    }
    // setCaptureVideo(false);
  };

  if (loading){
    return (
      <Spinner
        style={{ position: "absolute", top: "40", left: "40" }}
        msg="Please wait, your interview is being saved..."
      />
    );
  }

  return (
    <div style={{ width: "98%", height: "98%", padding: "1%" }}>
      <div
        style={{
          boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          width: "100%",
          height: "100%",
        }}
      >
        {interviewState !== "finished" && captureVideo && modelsLoaded ? (
          <div
            style={{
              display: "inline-block",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <video
              id="vid"
              ref={videoRef}
              onClick={() => setIsPaused(!isPaused)}
              // src={videoSrc}
              onPlay={handleVideoOnPlay}
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                objectFit: "fill",
                position: "absolute",
                zIndex: "1",
              }}
              muted
            />
            <canvas
              className="expressions-canvas"
              ref={canvasRef}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                position: "relative",
                zIndex: "2",
                display: interviewState === "paused" ? "none" : "block",
              }}
            />
            <button
              className="expressions-canvas"
              onClick={pauseWebcam}
              style={{
                cursor: "pointer",
                backgroundColor: "green",
                color: "white",
                bottom: "2%",
                left: "35%",
                fontSize: "20px",
                border: "none",
                borderRadius: "5px",
                position: "absolute",
                zIndex: "5",
                padding: "10px",
              }}
            >
              {interviewState === "paused" ? " Play " : " Pause "}
            </button>
            <button
              className="expressions-canvas"
              onClick={closeWebcam}
              style={{
                cursor: "pointer",
                backgroundColor: "red",
                color: "white",
                bottom: "2%",
                left: "50%",
                fontSize: "20px",
                border: "none",
                borderRadius: "5px",
                position: "absolute",
                zIndex: "5",
                padding: "10px",
              }}
            >
              Finish
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={startVideo}
              style={{
                cursor: "pointer",
                backgroundColor: "green",
                color: "white",
                margin: "20% 0 auto 35%",
                padding: "15px",
                fontSize: "25px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Start Interview
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoBox;

import { useState } from "react";

const RecordVid = () => {
//   let document.getElementById("preview") = document.getElementById("document.getElementById("preview")");
//   let document.getElementById("recording") = document.getElementById("recording");
  let startButton = document.getElementById("startButton");
  let stopButton = document.getElementById("stopButton");
//   let document.getElementById("downloadButton") = document.getElementById("downloadButton");

  let recordingTimeMS = 5000;

  const [logElement, setLogElement]= useState("");
  function log(msg) {
    setLogElement(logElement + `${msg}\n`);
  }

  function wait(delayInMS) {
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
  }

  function startRecording(stream, lengthInMS) {
    let recorder = new MediaRecorder(stream);
    let data = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();
    // log(`${recorder.state} for ${lengthInMS / 1000} seconds…`);

    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event) => reject(event.name);
    });

    let recorded = wait(lengthInMS).then(() => {
      if (recorder.state === "recording") {
        recorder.stop();
      }
    });

    return Promise.all([stopped, recorded]).then(() => data);
  }

  function stop(stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  const handleStart =
    () => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          document.getElementById("preview").srcObject = stream;
          document.getElementById("downloadButton").href = stream;
          document.getElementById("preview").captureStream =
            document.getElementById("preview").captureStream || document.getElementById("preview").mozCaptureStream;
          return new Promise((resolve) => (document.getElementById("preview").onplaying = resolve));
        })
        .then(() => startRecording(document.getElementById("preview").captureStream(), recordingTimeMS))
        .then((recordedChunks) => {
          let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
          document.getElementById("recording").src = URL.createObjectURL(recordedBlob);
          document.getElementById("downloadButton").href = document.getElementById("recording").src;
          document.getElementById("downloadButton").download = "RecordedVideo.webm";

          log(
            `Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`
          );
        })
        .catch((error) => {
          if (error.name === "NotFoundError") {
            log("Camera or microphone not found. Can't record.");
          } else {
            log(error);
          }
        });
    }

  const handleStop =
    () => {
      stop(document.getElementById("preview").srcObject);
    };

  return (
    <>
      <p>
        Click the "Start Recording" button to begin video document.getElementById("recording") for a few
        seconds. You can stop document.getElementById("recording") by clicking the "Stop Recording" button.
        The "Download" button will download the received data (although it's in
        a raw, unwrapped form that isn't very useful).
      </p>
      <br />

      <div class="left">
        <div id="startButton" class="button" onClick={handleStart}>
          Start Recording
        </div>
        <h2>Preview</h2>
        <video id="preview" width="160" height="120" autoplay muted></video>
      </div>

      <div class="right">
        <div id="stopButton" class="button" onClick={handleStop}>
          Stop Recording
        </div>
        <h2>Recording</h2>
        <video id="recording" width="160" height="120" controls></video>
        <a id="downloadButton" class="button">
          Download
        </a>
      </div>

      <div class="bottom">
        <pre id="log">{logElement}</pre>
      </div>
    </>
  );
};

export default RecordVid;

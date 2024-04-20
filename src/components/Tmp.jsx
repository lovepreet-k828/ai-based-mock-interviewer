import React, { useState, useEffect, useRef } from "react";
// import "./tp.css";

function Tmp() {
  const videoRef = useRef();
  let mediaRecorder;
  useEffect(async ()=>{
    await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then((stream)=>{
      videoRef.current.srcObject = stream;
        videoRef.current.play();
    })
  }, []);

  return (
    <>
      <div>
        <video id="video" width="480" height="360" ref={videoRef} onPlay={()=>{
           
           mediaRecorder = new MediaRecorder(videoRef.current.srcObject);

           let blob = [];
           mediaRecorder.addEventListener("dataavailable", function (e) {
             blob.push(e.data);
           });
       
           mediaRecorder.addEventListener("stop", function () {
             var videoLocal = URL.createObjectURL(new Blob(blob));
             console.log("download link: ", videoLocal);
           });
       
           mediaRecorder.start();
        }}></video>
      </div>
      <button id="startRecord">Start Recording</button>
      <button id="stopRecord" onClick={()=>{mediaRecorder.stop();}}>Stop Recording</button>
      <a id="downloadLink" download="video.mp4">
        Download Video
      </a>
    </>
  )
}

export default Tmp;

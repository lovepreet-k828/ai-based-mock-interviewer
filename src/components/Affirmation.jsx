import { useState, useRef } from "react";
import { Deepgram } from "@deepgram/sdk";

export default function Affirmation() {
  const merri_key = process.env.REACT_APP_DEEPGRAM_KEY;

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    console.log({ stream });
    if (!MediaRecorder.isTypeSupported("audio/webm"))
      return alert("Browser not supported");
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm",
    });
    const socket = new WebSocket("wss://api.deepgram.com/v1/listen", [
      "token",
      process.env.REACT_APP_DEEPGRAM_KEY,
    ]);
    socket.onopen = () => {
      document.querySelector("#status").textContent = "Connected";
      console.log({ event: "onopen" });
      mediaRecorder.addEventListener("dataavailable", async (event) => {
        if (event.data.size > 0 && socket.readyState == 1) {
          socket.send(event.data);
        }
      });
      mediaRecorder.start(1000);
    };

    socket.onmessage = (message) => {
      const received = JSON.parse(message.data);
      const transcript = received.channel.alternatives[0].transcript;
      if (transcript && received.is_final) {
        console.log(transcript);
        document.querySelector("#transcript").textContent += transcript + " ";
      }
    };

    socket.onclose = () => {
      console.log({ event: "onclose" });
    };

    socket.onerror = (error) => {
      console.log({ event: "onerror", error });
    };
  });
  return (
    <>
      <p id="status">Not Connected</p>
      <p id="transcript"></p>
    </>
  );
}

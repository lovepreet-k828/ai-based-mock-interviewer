import { useDispatch, useSelector } from "react-redux";
import { setCurrentTime } from "../features/currentTime/currentTimeSlice";

const RecordedVideoBox = () => {
  const dispatch = useDispatch();
  const totalRI = useSelector(
    (state) => state.totalRecordedInfo.totalRecordedInfo
  );
  const handleVideoOnPlayTmp = () => {
    setInterval(() => {
      if (document?.getElementById("vid")?.currentTime * 1000) {
        dispatch(
          setCurrentTime(
            new Date(document?.getElementById("vid")?.currentTime * 1000)
              .toISOString()
              .slice(14, 19)
          )
        );
        console.log(
          "curentTime is: ",
          new Date(document?.getElementById("vid")?.currentTime * 1000)
            .toISOString()
            .slice(14, 19)
        );
      }
    }, 1000);
  };
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
            src={totalRI.videoUrl}
            onPlay={handleVideoOnPlayTmp}
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "100%",
              objectFit: "fill",
              position: "absolute",
              zIndex: "1",
            }}
            controls
          />
        </div>
      </div>
    </div>
  );
};

export default RecordedVideoBox;

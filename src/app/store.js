import { configureStore } from "@reduxjs/toolkit";
import currentTimeReducer from "../features/currentTime/currentTimeSlice";
import interviewStateReducer from "../features/interviewState/interviewState";
import qusAnsReducer from "../features/qusAns/qusAns";
import totalExpressionsReducer from "../features/totalExpressions/totalExpressions";
import totalMaxExpressionsReducer from "../features/totalMaxExpressions/totalMaxExpressions";
import aiQAReducer from "../features/aiQA/aiQASlice";
import voiceToneReducer from "../features/voiceTone/voiceToneSlice";
import realtimeAnsReducer from "../features/realtimeAns/realtimeAns";
import userInfoReducer from "../features/userInfo/userInfo";
import jobProfileReducer from "../features/jobProfile/jobProfile";
import shortInfoCardsReducer from "../features/shortInfoCards/shortInfoCards";
import totalRecordedInfoReducer from "../features/totalRecordedInfo/totalRecordedInfo";
import modeReducer from "../features/mode/mode";
export default configureStore({
  reducer: {
    currentTime: currentTimeReducer,
    interviewState: interviewStateReducer,
    qusAns: qusAnsReducer,
    totalExpressions: totalExpressionsReducer,
    totalMaxExpressionss: totalExpressionsReducer,
    aiQA: aiQAReducer,
    voiceTone: voiceToneReducer,
    realtimeAns: realtimeAnsReducer,
    userInfo: userInfoReducer,
    jobProfile: jobProfileReducer,
    shortInfoCards: shortInfoCardsReducer,
    totalRecordedInfo: totalRecordedInfoReducer,
    mode:modeReducer,
  },
});

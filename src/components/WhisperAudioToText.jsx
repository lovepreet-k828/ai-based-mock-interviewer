import { useWhisper } from '@chengsokdara/use-whisper'

const WhisperAudioToText = ()=>{
    const { transcript } = useWhisper({
      apiKey: process.env.OPENAI_API_TOKEN, // YOUR_OPEN_AI_TOKEN
      streaming: true,
      timeSlice: 1_000, // 1 second
      whisperConfig: {
        language: 'en',
      },
      removeSilence: true,
    })
  
    return (
      <div>
        <p>{transcript.text}</p>
      </div>
    )
}

export default WhisperAudioToText;
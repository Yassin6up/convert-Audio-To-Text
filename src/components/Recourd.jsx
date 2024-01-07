import { useState, useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Recourding, stopRecord } from '../store/RecourdSlice/recordSlice';

const createRecognition = () => {
  const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;
  return recognition;
};

function Recourd() {
  const recordingState = useSelector((state) => state.recourd);
  const [text, setText] = useState('');
  const [isRecording, setRecording] = useState(false);
  const dispatch = useDispatch();
  const recognition = createRecognition();

  const handleResult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        setText(event.results[i][0].transcript);
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
  };

  const handleClick = () => {
    dispatch(Recourding());
    setRecording(true);
    recognition.start();
  };

  const handleStop = () => {
    recognition.stop(); // Stop recording
    setRecording(false);
    dispatch(stopRecord());
  };

  useEffect(() => {
    recognition.onresult = handleResult;

    recognition.onend = () => {
      // Use the 'state' parameter to update 'textContent'
      console.log(text);
    };

    return () => {
      recognition.onresult = null;
    };
  }, [text]);

  return (
    <>
      <h1>Record Audio</h1>
      {!isRecording ? (
        <button className="button" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" className="svg-icon">
            <g stroke-width="2" stroke-linecap="round" stroke="#ff342b">
              <rect y="3" x="9" width="6" rx="3" height="11"></rect>
              <path d="m12 18v3"></path>
              <path d="m8 21h8"></path>
              <path d="m19 11c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7"></path>
            </g>
          </svg>
          <span className="lable">Record</span>
        </button>
      ) : (
        <div className="stopRecord">
          <button onClick={handleStop}>Stop</button> <div className="point"></div>
        </div>
      )}
    </>
  );
}

export default Recourd;

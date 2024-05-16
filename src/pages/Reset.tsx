import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import SoundToggler from '../components/SoundToggler';
import { useSettingsStore } from '../states/settings';

const Reset: React.FC = () => {

  const stroke = localStorage.getItem("stroke") ? localStorage.getItem("stroke") : "0"


  const [allowSound] = useSettingsStore((state) => [
    state.allowSound,
])

  const audio = useRef<HTMLAudioElement>(new Audio('/sounds/congrutulation.mp3'))


  function playAudio() {
    if (!audio.current) return
    const handleEnded = () => {
      if (!audio.current) return
      audio.current.currentTime = 0; // Reset the audio to the start position
      audio.current.play(); // Replay the audio
    };

    audio.current.addEventListener('ended', handleEnded);
    audio.current.play();
  }

  function stopAudio() {
    if (!audio.current) return
    audio.current.pause();
    audio.current.currentTime = 0; // Reset audio to start position
  }

  useEffect(() => {
    if (allowSound) {
      playAudio()
    }
    return () => {
      stopAudio()
    };
  }, []);

  useEffect(() => {
    if (allowSound) {
      playAudio()
    }
    else {
      stopAudio()
    }
  }, [allowSound])



  return (
    <div className="relative w-screen h-screen flex flex-col gap-5 justify-center items-center bg-slate-900 text-slate-100">
        <div>
            <h1>🎉 Congratulation 🎉</h1>
        </div>
        <div>
            <span className="font-bold text-xl text-slate-100">Stroke: {stroke}</span>
        </div>
        <div>
            <Link to="/">Go back to Home</Link>
        </div>
        <div className="absolute top-2 right-2">
          <SoundToggler />
        </div>
    </div>
  );
};

export default Reset;
import React from "react";
import { useSpring, animated } from "react-spring";
import useStartStore, { StartState } from "../state/start";
import * as THREE from "three";
import useAudioStore from "../state/audio";
import { withPrefix } from "gatsby";

const Overlay = () => {
  //const startval = useAppSelector((state) => state.startReducer.startval);
  //const dispatch = useAppDispatch();
  const startStore = useStartStore();
  const audioStore = useAudioStore();
  const fade = useSpring({
    opacity: startStore.startval === StartState.Initialized ? 1 : 0,
    onRest: () => {
      if (startStore.startval !== StartState.Initialized) {
        //console.log("hi");
        startStore.notifyFaded();
      }
    },
  });
  return (
    <animated.div style={fade}>
      <div id="overlay">
        <button
          id="startButton"
          onClickCapture={() => {
            const loader = new THREE.AudioLoader();
            const listener = new THREE.AudioListener();
            const audio = new THREE.Audio(listener);
            loader.load(withPrefix("/home-resonance.wav"), (buffer) => {
              audio.setBuffer(buffer);
              //audio.setMediaElementSource(audioElement);
              audio.setLoop(true);
              audio.setVolume(0.1);
              //audio.play();
              const analyzer = new THREE.AudioAnalyser(audio, 1024);
              audioStore.addAudio(audio, listener, analyzer);
              audio.play();
              audio.pause();
            });

            /*
            const audioElement = document.getElementById(
              "music"
            ) as HTMLMediaElement;
            
            
            audio.setMediaElementSource(audioElement);
            audio.setLoop(true);
            audio.setVolume(0.1);
            audioElement.play();
            */
            startStore.start();
          }}
        >
          Play
        </button>
      </div>
    </animated.div>
  );
};

export default Overlay;

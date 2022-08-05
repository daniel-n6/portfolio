import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import useStartStore, { StartState } from "../state/start";
import * as THREE from "three";
import useAudioStore, { volume } from "../state/audio";
import { withPrefix } from "gatsby";
import { AudioLoader, Camera } from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { arrayBuffer } from "stream/consumers";
import useSpiralStore from "../state/spiral";

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
            //console.log("hi");
            const loader = new THREE.AudioLoader();
            const listener = new THREE.AudioListener();
            //const audio = new THREE.Audio(listener);
            const audio = new THREE.Audio(listener);
            /*
            loader
              .loadAsync(withPrefix("/home-resonance.wav"))
              .then((buffer) => {
                positionalAudio.setBuffer(buffer);
                console.log(buffer.duration);
                //positionalAudio.setRefDistance(1);
                //audio.setBuffer(buffer);
                //audio.setMediaElementSource(audioElement);
                positionalAudio.setLoop(true);
                positionalAudio.setVolume(0.25);
                //audio.play();
                const analyzer = new THREE.AudioAnalyser(positionalAudio, 2048);
                audioStore.addAudio(positionalAudio, listener, analyzer);
              })
              .catch((e) => {
                console.log(e);
              });*/
            /*loader.load(withPrefix("/home-resonance.wav"), (buffer) => {
            });*/
            //const context = new AudioContext();
            //const request = new XMLHttpRequest();
            /*
            fetch(withPrefix("/home-resonance.wav"))
              .then((data) => data.arrayBuffer())
              .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
              .then((decodedAudio) => {
                console.log(decodedAudio);
              })
              .catch((e) => console.log("hi", e));*/
            /*
            request.open("GET", withPrefix("/home-resonance.wav"), true);
            request.onload = function () {
              context.decodeAudioData(
                request.response.arrayBuffer(),
                (buffer) => {
                  console.log("hi");
                }
              );
            };
            request.send();*/
            loader.load(withPrefix("/home-resonance.wav"), (buffer) => {
              console.log(buffer);
              audio.setBuffer(buffer);
              audio.setLoop(true);
              audio.setVolume(volume);
              const analyzer = new THREE.AudioAnalyser(audio, 2048);
              audioStore.addAudio(audio, listener, analyzer);
              //audio.play();
              //audio.pause();
            });

            /*
            const audioElement = document.querySelector(
              "#music"
            ) as HTMLMediaElement;*/
            //const audioElement = new Audio(withPrefix("/home-resonance.wav"));
            //audioElement.play();
            //audioElement.pause();
            //audio.setMediaElementSource(audioElement);
            //audio.setVolume(0.1);
            //const analyzer = new THREE.AudioAnalyser(positionalAudio, 1024);
            //audioStore.addAudio(positionalAudio, listener, analyzer);
            //audio.play();
            //audio.pause();
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

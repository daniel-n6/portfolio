import { useLoader, useThree } from "@react-three/fiber";
import React from "react";
import { useEffect } from "react";
import { AudioLoader, AudioListener, Audio } from "three";

const WaveformAnalyzer = () => {
  //const { camera } = useThree();
  //const buffer = useLoader(AudioLoader, "/home-resonance.wav");
  useEffect(() => {
    /*
    const listener = new AudioListener();
    const sound = new Audio(listener);
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
    camera.add(listener);*/
    //const audio = document.querySelector("audio");
    //console.log(audio);
    //audio!.volume = 0.2;
    /*
    const listener = new AudioListener();
    const sound = new Audio(listener);
    const audioLoader = new AudioLoader();
    audioLoader.load("/home-resonance.wav", function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });*/
  }, []);
  return <mesh></mesh>;
};

export default WaveformAnalyzer;

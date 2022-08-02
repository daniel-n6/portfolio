import { Plane } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useEffect } from "react";
import {
  AudioLoader,
  AudioListener,
  Audio,
  Vector3,
  AudioAnalyser,
  PlaneBufferGeometry,
} from "three";
import useStartStore, { StartState } from "../state/start";

const WaveformAnalyzer = () => {
  const { camera } = useThree();
  const buffer = useLoader(AudioLoader, "/home-resonance.wav");
  const startStore = useStartStore();
  const listener = new AudioListener();
  const sound = new Audio(listener);
  const size = 100;
  const [analyser, setAnalyser] = useState<AudioAnalyser | null>(null);
  const plane = useRef<PlaneBufferGeometry>(null!);
  useLayoutEffect(() => {
    if ((startStore.startval = StartState.Faded)) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.1);
      //sound.setVolume(0);
      sound.play();
      setAnalyser(new AudioAnalyser(sound, 1024));
    }
  }, [startStore.startval]);
  useFrame(({ clock }) => {
    if (analyser) {
      const data = analyser.getFrequencyData();
      for (let i = 0; i < plane.current.attributes.position.count; i++) {
        const x = plane.current.attributes.position.getX(i);
        const y = plane.current.attributes.position.getY(i);
        plane.current.attributes.position.setZ(
          i,
          Math.sin(
            data[Math.floor((Math.abs(x) / (size * 0.5)) * 45)] / 50 +
              data[Math.floor((Math.abs(y) / (size * 0.5)) * 45)] / 50
          ) * 5
        );
      }
      plane.current.computeVertexNormals();
      plane.current.attributes.position.needsUpdate = true;
    }
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={new Vector3(0, -30, 50)}>
      <planeBufferGeometry ref={plane} args={[size, size, size, size]} />
      <meshBasicMaterial color={"white"} wireframe={true}></meshBasicMaterial>
    </mesh>
  );
};

export default WaveformAnalyzer;

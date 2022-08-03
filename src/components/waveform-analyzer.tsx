import { Plane } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useEffect } from "react";
import * as THREE from "three";
import useAudioStore from "../state/audio";
import useStartStore, { StartState } from "../state/start";

const WaveformAnalyzer = () => {
  const { camera } = useThree();
  //const buffer = useLoader(THREE.AudioLoader, "/home-resonance.wav");
  const audioStore = useAudioStore();
  const size = 100;
  const plane = useRef<THREE.PlaneBufferGeometry>(null!);
  useFrame(({ clock }) => {
    const data = audioStore.analyzer?.getFrequencyData() ?? new Uint8Array(512);
    const count = plane.current.attributes.position.count;
    const rgbLen = 3;
    const colors = new Uint8Array(rgbLen * count);
    for (let i = 0; i < count; i++) {
      const x = plane.current.attributes.position.getX(i);
      const y = plane.current.attributes.position.getY(i);
      const newZ =
        Math.sin(
          data[Math.floor((Math.abs(x) / (size * 0.5)) * 45)] / 50 +
            data[Math.floor((Math.abs(y) / (size * 0.5)) * 45)] / 50
        ) * 5;
      plane.current.attributes.position.setZ(i, newZ);
      colors[i * rgbLen] =
        255 - Math.pow(Math.abs(x) / (size * 0.5), 1 / 4) * 255;
      colors[i * rgbLen + 1] =
        255 - Math.pow(Math.abs(y) / (size * 0.5), 1 / 4) * 255;
      colors[i * rgbLen + 2] =
        ((Math.abs(x) + Math.abs(y)) / 2 / (size * 0.5)) * 255;
    }
    plane.current.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, rgbLen, true)
    );
    plane.current.computeVertexNormals();
    plane.current.attributes.position.needsUpdate = true;
  });
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={new THREE.Vector3(0, -30, 50)}
    >
      <planeBufferGeometry ref={plane} args={[size, size, size, size]} />
      <meshBasicMaterial
        vertexColors={true}
        wireframe={true}
      ></meshBasicMaterial>
    </mesh>
  );
};

export default WaveformAnalyzer;

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  PerspectiveCamera,
  Vector3,
} from "three/src/Three";
import { OrbitControls, Stars, useHelper } from "@react-three/drei";
import MyName from "../components/myname";
// markup
const IndexPage = () => {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, -10] }}>
        <OrbitControls />
        <color attach="background" args={["black"]} />
        <MyName />
        <group position={new Vector3(0, 0, 0)}>
          <Stars
            radius={100}
            depth={100}
            count={1000}
            factor={20}
            fade
            speed={1}
          />
        </group>
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default IndexPage;

function Light() {
  const light = useRef<DirectionalLight>(null!);
  useHelper(light, DirectionalLightHelper);
  return <directionalLight ref={light} position={[0, 0, -5]} />;
}

function TestCamera() {
  const camera = useRef<PerspectiveCamera>(null!);
  useHelper(camera, CameraHelper);
  return (
    <perspectiveCamera
      near={2}
      far={10}
      ref={camera}
      position={new Vector3(0, 0, 5)}
    ></perspectiveCamera>
  );
}

interface TestPointProps {
  position: Vector3 | undefined;
}
function TestPoint({ position }: TestPointProps) {
  return (
    <mesh position={position}>
      <sphereGeometry></sphereGeometry>
      <meshBasicMaterial></meshBasicMaterial>
    </mesh>
  );
}

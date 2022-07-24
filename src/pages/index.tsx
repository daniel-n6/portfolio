import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Cube from "../components/cube";
import {
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  PerspectiveCamera,
  Vector3,
} from "three/src/Three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Float, Stars, useHelper } from "@react-three/drei";
import MyName from "../components/myname";
// markup
const IndexPage = () => {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, -10] }}>
        <color attach="background" args={["black"]} />
        <MyName></MyName>
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={20}
          fade
          speed={1}
        />
        <CameraController></CameraController>
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

function CameraController() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 70;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
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

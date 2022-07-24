import { Text3D } from "@react-three/drei";
import React, {
  ReactNode,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Mesh,
  MeshNormalMaterial,
  Scene,
  Vector3,
  WebGLRenderTarget,
  WireframeGeometry,
} from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import {
  extend,
  SceneProps,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import roboto from "../assets/fonts/roboto-black-regular.json";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const MyName = () => {
  extend({ TextGeometry });
  let vPositions: { x: number; y: number; z: number }[] = [];
  const mesh = useRef<Mesh>(null!);
  useLayoutEffect(() => {
    const size = new Vector3();
    mesh.current.lookAt(new Vector3(0, 0, 0));
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox!.getSize(size);
    mesh.current.position.x += size.x / 2;
    mesh.current.position.y -= size.y / 2;
    let vertices = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i = i + 3) {
      vPositions.push({
        x: vertices[i],
        y: vertices[i + 1],
        z: vertices[i + 2],
      });
    }
    console.log(JSON.stringify(vPositions));
  }, []);
  const font = new FontLoader().parse(roboto);
  return (
    <Suspense>
      <mesh position={new Vector3(0, 0, 50)} ref={mesh}>
        {/*
      //@ts-ignore*/}
        <textGeometry
          args={[
            "DANIEL WU",
            {
              font,
              size: 10,
              height: 1,
              bevelEnabled: true,
              bevelThickness: 0.5,
              bevelSize: 0.5,
              bevelSegments: 1,
            },
          ]}
        ></textGeometry>
        <meshBasicMaterial
          color={"white"}
          //specular={0x555555}
          //shininess={30}
          wireframe={true}
          //emissive={0xffffff}
        ></meshBasicMaterial>
      </mesh>
      <EffectComposer>
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
          opacity={3}
        ></Bloom>
      </EffectComposer>
    </Suspense>
  );
};

export default MyName;

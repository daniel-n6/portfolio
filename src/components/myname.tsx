import React, { useLayoutEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { extend, useFrame } from "@react-three/fiber";
import roboto from "../assets/fonts/roboto-black-regular.json";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";

const MyName = () => {
  extend({ TextGeometry });
  const mesh = useRef<Mesh>(null!);
  useLayoutEffect(() => {
    const size = new Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox!.getSize(size);
    mesh.current.position.x = size.x / 2;
    mesh.current.position.y = -size.y / 2;
    mesh.current.position.z = 50;
  }, []);
  const font = new FontLoader().parse(roboto);
  return (
    <>
      <mesh rotation={[0, Math.PI, 0]} ref={mesh}>
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
      <EffectComposer multisampling={0}>
        <SelectiveBloom
          selection={[mesh]}
          mipmapBlur
          radius={0.75}
          luminanceThreshold={0}
          intensity={5}
        ></SelectiveBloom>
      </EffectComposer>
    </>
  );
};

export default MyName;

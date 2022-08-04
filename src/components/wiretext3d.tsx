import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { extend, useFrame } from "@react-three/fiber";
import roboto from "../assets/fonts/roboto-black-regular.json";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { SelectiveBloomEffect } from "postprocessing";
import { useSpring } from "react-spring";
import useStartStore, { StartState } from "../state/start";
import { Text3D } from "@react-three/drei";
import { useControls } from "leva";
import useSpiralStore from "../state/spiral";
import useAudioStore from "../state/audio";
import useNavStore from "../state/nav";

const WireText3D = ({
  text,
  position = [0, 0, 50],
  rotation = [0, Math.PI, 0],
}: {
  text: String;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) => {
  extend({ TextGeometry });
  const mesh = useRef<Mesh>(null!);
  const bloom = useRef<SelectiveBloomEffect>(null!);
  const navStore = useNavStore();
  //const { intensity } = useControls({ intensity: 5 });
  useLayoutEffect(() => {
    //console.log(typeof bloom);
    const size = new Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox!.getSize(size);
    mesh.current.position.x = position[0] + size.x / 2;
    mesh.current.position.y = position[1] - size.y / 2;
    mesh.current.position.z = position[2];
  }, [navStore.navAt]);
  const font = new FontLoader().parse(roboto);
  return (
    <>
      <mesh rotation={rotation} ref={mesh}>
        {/*
      //@ts-ignore*/}
        <textGeometry
          args={[
            text,
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
        >
          {/*
      //@ts-ignore*/}
        </textGeometry>
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
          ref={bloom}
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

export default WireText3D;

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

const MyName = () => {
  extend({ TextGeometry });
  const mesh = useRef<Mesh>(null!);
  const bloom = useRef<SelectiveBloomEffect>(null!);
  const startStore = useStartStore();
  const [intensity, setIntensity] = useState<number>(0);
  //const { intensity } = useControls({ intensity: 5 });
  useLayoutEffect(() => {
    //console.log(typeof bloom);
    const size = new Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox!.getSize(size);
    mesh.current.position.x = size.x / 2;
    mesh.current.position.y = -size.y / 2;
    mesh.current.position.z = 50;
  }, []);

  useSpring({
    s: startStore.startval === StartState.Faded ? 5 : 0,
    onChange: (result, spring, item) => {
      setIntensity(spring.get().s);
    },
  });
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
          intensity={intensity}
        ></SelectiveBloom>
      </EffectComposer>
    </>
  );
};

export default MyName;

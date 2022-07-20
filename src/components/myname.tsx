import { Text3D } from "@react-three/drei";
import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Mesh, MeshNormalMaterial, Vector3, WireframeGeometry } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { extend, useLoader } from "@react-three/fiber";
import roboto from "../assets/fonts/roboto-black-regular.json";

/* const MyName = ({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1.5,
  color = "#000000",
}) => {
  const config = useMemo(
    () => ({
      size: 40,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    []
  );
  const mesh = useRef<Mesh>(null!);
  useLayoutEffect(() => {
    const size = new Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox!.getSize(size);
    mesh.current.position.x =
      hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
    mesh.current.position.y =
      vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
  }, [children]);
  const name: any = "Daniel Wu";
  return (
    <mesh position={[0, 10, 0]}>
      <group scale={[0.1 * size, 0.1 * size, 0.1]}>
        <Text3D
          ref={mesh}
          font={"../assets/fonts/roboto-black-regular.json"}
          {...config}
        >
          <meshNormalMaterial />
        </Text3D>
      </group>
    </mesh>
  );
}; */

const MyName = () => {
  extend({ TextGeometry });
  let vPositions: { x: number; y: number; z: number }[] = [];
  const mesh = useRef<Mesh>(null!);
  useEffect(() => {
    const size = new Vector3();
    mesh.current.lookAt(new Vector3(0, 5, 0));
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox!.getSize(size);
    mesh.current.position.x = size.x / 2;
    mesh.current.position.y = size.y / 2;
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
    <mesh position={new Vector3(0, 5, 5)} ref={mesh}>
      {/*
      //@ts-ignore*/}
      <textGeometry
        args={[
          "DANIEL WU",
          {
            font,
            size: 1,
            height: 0.5,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 10,
          },
        ]}
      ></textGeometry>
      <meshPhongMaterial
        color={"white"}
        specular={0x555555}
        shininess={30}
        wireframe={true}
      ></meshPhongMaterial>
    </mesh>
  );
};

export default MyName;

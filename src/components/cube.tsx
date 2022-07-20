import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
const Cube = () => {
  const cube = React.useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    cube.current!.rotation.x = a;
    cube.current!.rotation.y = a;
  });
  return (
    <mesh ref={cube} position={new Vector3(0, 0, 2)}>
      <boxGeometry />
      <meshPhongMaterial color="#8AC" emissive={0xffffff} />
    </mesh>
  );
};

export default Cube;

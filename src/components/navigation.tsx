import React, { useState } from "react";
import useNavStore, { NavState } from "../state/nav";
import WireText3D from "./wiretext3d";
import WaveformAnalyzer from "./home/waveform-analyzer";
import { Float, Html, Text, useTexture } from "@react-three/drei";
import { Color, ConeGeometry, Texture, Vector3 } from "three";
import {
  Box,
  Button,
  Image,
  Link,
  Spacer,
  Text as TextC,
  VStack,
} from "@chakra-ui/react";
import { withPrefix } from "gatsby";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const Navigation = () => {
  const navStore = useNavStore();
  const linkedInTexture = useTexture(withPrefix("/linkedin.png"));
  const githubTexture = useTexture(withPrefix("/github.png"));
  const emailTexture = useTexture(withPrefix("/email.png"));
  switch (navStore.navAt) {
    case NavState.Home:
    case NavState.About:
    case NavState.ContactMe: {
      return (
        <>
          <WireText3D text="DANIEL WU" />
          <WaveformAnalyzer />
          {/*<Text
            color="white"
            key={0}
            position={new Vector3(50, 5, 40)}
            rotation={[0, -Math.PI * 0.8, 0]}
            fontSize={5}
            children={"About Me"}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
      />*/}
          <Float
            position={[30, 20, 40]}
            rotation={[0, (-Math.PI * 7) / 8, 0]}
            floatIntensity={5}
            speed={5}
          >
            <Text color="white" children={"About Me"} fontSize={7.5} />
            <mesh rotation={[0, 0, Math.PI / 2]} position={[-25, 0, 0]}>
              <coneGeometry attach="geometry" args={[5, 7.5, 8]} />
              <meshPhongMaterial flatShading={true} />
            </mesh>
          </Float>
          <Float
            position={[-25, 20, 40]}
            rotation={[0, (Math.PI * 7) / 8, 0]}
            floatIntensity={5}
            speed={5}
          >
            <Text color="white" children={"Contact Info"} fontSize={7.5} />
            <mesh rotation={[0, 0, -Math.PI / 2]} position={[28, 0, 0]}>
              <coneGeometry attach="geometry" args={[5, 7.5, 8]} />
              <meshPhongMaterial flatShading={true} />
            </mesh>
          </Float>
          <pointLight color="white" intensity={1} />
          <Html
            position={[50, 10, -10]}
            rotation={[0, -(Math.PI * 7) / 16, 0]}
            transform
            occlude
            zIndexRange={[0, 1]}
          >
            <VStack w="1700px" spacing={10}>
              <TextC color="white" align="center" fontSize={"200px"}>
                Who Am I?
              </TextC>
              <TextC color="white" align="center" fontSize={"75px"}>
                Computer science major by day, developer by night. I love what I
                do because it allows my creativity to reign. That's why I chose
                to make my portfolio website 3D!
              </TextC>
              <TextC
                color="white"
                align="left"
                fontSize={"75px"}
                paddingTop={"75px"}
              >
                Hi! I'm Daniel Wu, and I am currently pursuing an undergraduate
                Computer Science degree at Georgia Tech.
              </TextC>
              <TextC color="white" align="left" fontSize={"75px"}>
                When I'm not on the studying grind or coding random side
                projects, I love playing tennis with my friends, trying out new
                cooking recipes, and catching up on the latest scientific
                trends.
              </TextC>
            </VStack>
          </Html>
          <Html
            position={[20, 10, -50]}
            rotation={[0, -(Math.PI * 1) / 8, 0]}
            transform
            occlude
            zIndexRange={[0, 1]}
          >
            <VStack w="1500px" spacing={10} align="left">
              <TextC color="white" align="center" fontSize={"200px"}>
                Skills
              </TextC>
              <TextC color="white" align="left" fontSize={"75px"}>
                <b>Programming:</b> Python, Java, Dart, HTML/CSS, JavaScript,
                TypeScript, MATLAB
              </TextC>
              <TextC color="white" align="left" fontSize={"75px"}>
                <b>Frameworks/Libraries:</b> Flutter, React, Gatsby, Three.js,
                Redux, Zustand, Material UI, Chakra UI, Leaflet, TensorFlow,
                NumPy, Pandas
              </TextC>
              <TextC color="white" align="left" fontSize={"75px"}>
                <b>Cloud Services:</b> Firebase Cloud Firestore, Firebase Cloud
                Functions, Firebase Cloud Storage
              </TextC>
              <TextC color="white" align="left" fontSize={"75px"}>
                <b>Hosting:</b> Firebase Hosting, Heroku, Netlify, GitHub Pages
              </TextC>
              <TextC color="white" align="left" fontSize={"75px"}>
                <b>APIs:</b> OpenStreetMap, WordPress API
              </TextC>
            </VStack>
          </Html>
          <Html
            position={[-20, 10, -50]}
            rotation={[0, (Math.PI * 1) / 8, 0]}
            transform
            occlude
            zIndexRange={[0, 1]}
          >
            <TextC color="white" w="1500px" align="center" fontSize={"150px"}>
              More coming soon!
            </TextC>
          </Html>
          <Button3D
            rotation={[Math.PI, (Math.PI * 1) / 8, -Math.PI / 2]}
            position={[-60, 20, 15]}
            texture={linkedInTexture}
            color1={new Color("#026ba3")}
            color2={new Color("#015c8c")}
            href={"https://www.linkedin.com/in/danielnmwu/"}
          />
          <Html
            position={[-50, 20, -10]}
            rotation={[0, (Math.PI * 3) / 8, 0]}
            transform
            occlude
            zIndexRange={[0, 1]}
          >
            <Link
              href={"https://www.linkedin.com/in/danielnmwu/"}
              fontSize={"120px"}
              isExternal={true}
              color={"white"}
            >
              linkedin.com/in/danielnmwu/
            </Link>
          </Html>
          <Button3D
            rotation={[Math.PI, (Math.PI * 1) / 8, -Math.PI / 2]}
            position={[-60, 5, 15]}
            texture={githubTexture}
            color1={"black"}
            color2={"black"}
            href={"https://github.com/dwu359"}
          />
          <Html
            position={[-52, 5, -5.5]}
            rotation={[0, (Math.PI * 3) / 8, 0]}
            transform
            occlude
            zIndexRange={[0, 1]}
          >
            <Link
              href={"https://github.com/dwu359"}
              fontSize={"120px"}
              isExternal={true}
              color={"white"}
            >
              github.com/dwu359
            </Link>
          </Html>
          <Button3D
            rotation={[Math.PI, (Math.PI * 1) / 8, -Math.PI / 2]}
            position={[-60, -10, 15]}
            texture={emailTexture}
            color1={new Color("#d9d7d7")}
            color2={new Color("#d1d1d1")}
            href={"mailto:dwu359@gatech.edu"}
          />
          <Html
            position={[-52, -10, -5.5]}
            rotation={[0, (Math.PI * 3) / 8, 0]}
            transform
            occlude
            zIndexRange={[0, 1]}
          >
            <Link
              href={"mailto:dwu359@gatech.edu"}
              fontSize={"120px"}
              isExternal={true}
              color={"white"}
            >
              dwu359@gatech.edu
            </Link>
          </Html>
        </>
      );
    }
    case NavState.Portfolio: {
      return (
        <>
          <WireText3D text="PORTFOLIO" />
        </>
      );
    }
    case NavState.Portfolio1: {
      return (
        <>
          <WireText3D text="PORTFOLIO 1" />
        </>
      );
    }
    case NavState.Portfolio2: {
      return (
        <>
          <WireText3D text="PORTFOLIO 2" />
        </>
      );
    }
    default: {
      return <></>;
    }
  }
};

const Button3D = ({
  rotation,
  position,
  texture,
  color1,
  color2,
  href,
}: {
  rotation: [number, number, number];
  position: [number, number, number];
  texture: Texture;
  color1: Color | string;
  color2: Color | string;
  href: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <mesh
      rotation={rotation}
      position={position}
      onPointerOver={() => {
        (
          document.querySelector("#canvas-container")! as HTMLCanvasElement
        ).style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={() => {
        (
          document.querySelector("#canvas-container")! as HTMLCanvasElement
        ).style.cursor = "default";
        setHovered(false);
      }}
      onClick={() => window.open(href)}
    >
      <cylinderGeometry attach="geometry" args={[5, 5, hovered ? 1 : 2, 20]} />
      <meshBasicMaterial attach="material-0" color={color1} />
      <meshBasicMaterial attach="material-1" map={texture} />
      <meshBasicMaterial attach="material-2" color={color2} />
    </mesh>
  );
};

export default Navigation;

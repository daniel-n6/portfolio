import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import useStartStore, { StartState } from "../state/start";
import * as THREE from "three";
import useAudioStore, { volume } from "../state/audio";
import { withPrefix } from "gatsby";
import { AudioLoader, Camera } from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { arrayBuffer } from "stream/consumers";
import useSpiralStore from "../state/spiral";
import {
  Button,
  ChakraProvider,
  ComponentStyleConfig,
  extendTheme,
  Progress,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";

const Overlay = () => {
  //const startval = useAppSelector((state) => state.startReducer.startval);
  //const dispatch = useAppDispatch();
  const startStore = useStartStore();
  const audioStore = useAudioStore();
  const [progress, setProgress] = useState(0);
  const theme = extendTheme({
    components: {
      Progress: {
        baseStyle: {
          filledTrack: {
            bg: "whiteAlpha.900",
          },
          track: {
            bg: "black",
          },
        },
      },
    },
  });

  useEffect(() => {}, []);
  const fade = useSpring({
    opacity: startStore.startval === StartState.Initialized ? 1 : 0,
    onRest: () => {
      if (startStore.startval !== StartState.Initialized) {
        //console.log("hi");
        startStore.notifyFaded();
      }
    },
  });
  return (
    <animated.div style={fade}>
      <div id="overlay">
        <VStack spacing="20px">
          <Image
            borderRadius={"full"}
            boxSize={"100px"}
            src={withPrefix("/icon.png")}
            alt={"DWu"}
            _hover={{
              borderColor: "gray.400",
            }}
          />
          <Text color="white" children={"Music: Resonance by HOME"} />
          <Text color="white" children={"Drag & scroll to explore"} />
          {progress !== 0 ? (
            <ChakraProvider theme={theme}>
              <Progress
                value={progress}
                //color={"whiteAlpha.900"}
                borderColor={"whiteAlpha.900"}
                borderRadius={"1rem"}
                borderWidth={"1px"}
                size={"sm"}
                width={"100px"}
              />
            </ChakraProvider>
          ) : (
            <>
              <Button
                _hover={{
                  color: "black",
                  bg: "white",
                }}
                bg={"transparent"}
                border={"1px"}
                borderColor={"white"}
                color={"white"}
                textTransform={"uppercase"}
                onClickCapture={() => {
                  const loader = new THREE.AudioLoader();
                  const listener = new THREE.AudioListener();
                  const audio = new THREE.Audio(listener);

                  const mediaElement = new Audio();
                  if (mediaElement.canPlayType("audio/ogg")) {
                    mediaElement.src = withPrefix("/home-resonance.opus");
                    audio.setMediaElementSource(mediaElement);
                    audio.setLoop(true);
                    audio.setVolume(volume);
                    const analyzer = new THREE.AudioAnalyser(audio, 2048);
                    audioStore.addAudio(
                      mediaElement,
                      audio,
                      listener,
                      analyzer
                    );
                    startStore.start();
                  } else {
                    loader.load(
                      withPrefix("/home-resonance.aac"),
                      (buffer) => {
                        audio.setBuffer(buffer);
                        audio.setLoop(true);
                        audio.setVolume(volume);
                        const analyzer = new THREE.AudioAnalyser(audio, 2048);
                        audioStore.addAudio(null, audio, listener, analyzer);
                        startStore.start();
                      },
                      (progressEvent) => {
                        console.log(progressEvent);
                        setProgress(
                          (progressEvent.loaded / progressEvent.total) * 100
                        );
                      }
                    );
                  }
                }}
              >
                Play
              </Button>
            </>
          )}
        </VStack>
      </div>
    </animated.div>
  );
};

export default Overlay;

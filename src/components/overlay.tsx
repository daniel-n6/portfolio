import React from "react";
import { useSpring, animated } from "react-spring";
import useStartStore, { StartState } from "../state/start";

const Overlay = () => {
  //const startval = useAppSelector((state) => state.startReducer.startval);
  //const dispatch = useAppDispatch();
  const startStore = useStartStore();
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
        <button id="startButton" onClick={() => startStore.start()}>
          Play
        </button>
      </div>
    </animated.div>
  );
};

export default Overlay;

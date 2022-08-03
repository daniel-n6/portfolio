import React from "react";
import useNavStore, { NavState } from "../state/nav";
import WireText3D from "./wiretext3d";
import WaveformAnalyzer from "./home/waveform-analyzer";

const Navigation = () => {
  const navStore = useNavStore();
  switch (navStore.current) {
    case NavState.Home: {
      return (
        <>
          <WireText3D text="DANIEL WU" />
          <WaveformAnalyzer />
        </>
      );
    }
    case NavState.About: {
      return (
        <>
          <WireText3D text="ABOUT" />
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
    case NavState.ContactMe: {
      return (
        <>
          <WireText3D text="CONTACT" />
        </>
      );
    }
    default: {
      return <></>;
    }
  }
};

export default Navigation;

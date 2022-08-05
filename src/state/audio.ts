import create from "zustand";
import * as THREE from "three";

type AudioType = {
  audio: THREE.Audio<AudioNode> | null;
  listener: THREE.AudioListener | null;
  analyzer: THREE.AudioAnalyser | null;
  mute: () => void;
  unmute: () => void;
  play: () => void;
  pause: () => void;
  addAudio: (
    audio: THREE.Audio<AudioNode>,
    listener: THREE.AudioListener,
    analyzer: THREE.AudioAnalyser
  ) => void;
};

const useAudioStore = create<AudioType>(function (set) {
  return {
    audio: null,
    listener: null,
    analyzer: null,
    mute: () =>
      set((state) => {
        state.audio?.setVolume(0);
        return {
          ...state,
          audio: state.audio,
          listener: state.listener,
          analyzer: state.analyzer,
        };
      }),
    unmute: () =>
      set((state) => {
        state.audio?.setVolume(volume);
        return {
          ...state,
          audio: state.audio,
          listener: state.listener,
          analyzer: state.analyzer,
        };
      }),
    play: () =>
      set((state) => {
        console.log(state.audio);
        state.audio?.play();
        return {
          ...state,
          audio: state.audio,
          listener: state.listener,
          analyzer: state.analyzer,
        };
      }),
    pause: () =>
      set((state) => {
        state.audio?.pause();
        return {
          ...state,
          audio: state.audio,
          listener: state.listener,
          analyzer: state.analyzer,
        };
      }),
    addAudio: (audio, listener, analyzer) =>
      set((state) => ({
        ...state,
        audio: audio,
        listener: listener,
        analyzer: analyzer,
      })),
  };
});

export const volume = 0.1;
export default useAudioStore;

import create from "zustand";
import * as THREE from "three";

type AudioType = {
  mediaElement: HTMLAudioElement | null;
  audio: THREE.Audio<AudioNode> | null;
  listener: THREE.AudioListener | null;
  analyzer: THREE.AudioAnalyser | null;
  mute: () => void;
  unmute: () => void;
  play: () => void;
  pause: () => void;
  addAudio: (
    mediaElement: HTMLAudioElement | null,
    audio: THREE.Audio<AudioNode>,
    listener: THREE.AudioListener,
    analyzer: THREE.AudioAnalyser
  ) => void;
};

const useAudioStore = create<AudioType>(function (set) {
  return {
    mediaElement: null,
    audio: null,
    listener: null,
    analyzer: null,
    mute: () =>
      set((state) => {
        state.audio?.setVolume(0);
        return {
          ...state,
          mediaElement: state.mediaElement,
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
          mediaElement: state.mediaElement,
          audio: state.audio,
          listener: state.listener,
          analyzer: state.analyzer,
        };
      }),
    play: () =>
      set((state) => {
        if (state.mediaElement == null) {
          state.audio?.play();
        } else {
          state.mediaElement.play();
        }
        return {
          ...state,
          mediaElement: state.mediaElement,
          audio: state.audio,
          listener: state.listener,
          analyzer: state.analyzer,
        };
      }),
    pause: () =>
      set((state) => {
        if (state.mediaElement == null) {
          state.audio?.pause();
        } else {
          state.mediaElement.pause();
        }
        return {
          ...state,
          mediaElement: state.mediaElement,
          audio: state.audio,
          listener: state.listener,
          analyzer: state.analyzer,
        };
      }),
    addAudio: (mediaElement, audio, listener, analyzer) =>
      set((state) => ({
        ...state,
        mediaElement: mediaElement,
        audio: audio,
        listener: listener,
        analyzer: analyzer,
      })),
  };
});

export const volume = 0.25;
export default useAudioStore;

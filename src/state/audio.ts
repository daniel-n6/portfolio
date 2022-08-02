import create from "zustand";
import * as THREE from "three";

type AudioType = {
  audio: THREE.Audio | null;
  listener: THREE.AudioListener | null;
  analyzer: THREE.AudioAnalyser | null;
  addAudio: (
    audio: THREE.Audio,
    listener: THREE.AudioListener,
    analyzer: THREE.AudioAnalyser
  ) => void;
};

const useAudioStore = create<AudioType>((set) => ({
  audio: null,
  listener: null,
  analyzer: null,
  addAudio: (audio, listener, analyzer) =>
    set((state) => ({
      ...state,
      audio: audio,
      listener: listener,
      analyzer: analyzer,
    })),
}));

export default useAudioStore;

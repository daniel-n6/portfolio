import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticReadUsage } from "three";
import create from "zustand";

export enum StartState {
  Initialized,
  Started,
  Faded,
}

type StartType = {
  startval: StartState;
  start: () => void;
  notifyFaded: () => void;
};

const useStartStore = create<StartType>((set) => ({
  startval: StartState.Initialized,
  start: () => set((state) => ({ ...state, startval: StartState.Started })),
  notifyFaded: () => set((state) => ({ ...state, startval: StartState.Faded })),
}));

export default useStartStore;

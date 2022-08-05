import create from "zustand";

type SpiralType = {
  done: boolean;
  notifyDone: () => void;
};

const useSpiralStore = create<SpiralType>((set) => ({
  done: false,
  notifyDone: () => {
    return set((state) => ({
      ...state,
      done: true,
    }));
  },
}));

export default useSpiralStore;

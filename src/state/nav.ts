import { homedir } from "os";
import create from "zustand";

export enum NavState {
  Home,
  About,
  Portfolio,
  Portfolio1,
  Portfolio2,
  ContactMe,
}

export interface NavItem {
  label: string;
  navigation: NavState;
  subLabel?: string;
  children?: Array<NavItem>;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "About",
    navigation: NavState.About,
  },
  {
    label: "Portfolio",
    navigation: NavState.Portfolio,
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        navigation: NavState.Portfolio1,
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        navigation: NavState.Portfolio2,
      },
    ],
  },
  {
    label: "Contact Me",
    navigation: NavState.ContactMe,
  },
];

type NavType = {
  current: NavState;
  navigate: (current: NavState) => void;
};

const useNavStore = create<NavType>((set) => ({
  current: NavState.Home,
  navigate: (current: NavState) =>
    set((state) => ({ ...state, current: current })),
}));

export default useNavStore;

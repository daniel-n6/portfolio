import { homedir } from "os";
import { MdOutlineNavigation } from "react-icons/md";
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
  navAt: NavState;
  navTo?: NavState | null;
  navigate: (current: NavState) => void;
  update: () => void;
};

const useNavStore = create<NavType>((set) => ({
  navAt: NavState.Home,
  navTo: null,
  navigate: (nav: NavState) =>
    set((state) => ({ ...state, navAt: state.navAt, navTo: nav })),
  update: () =>
    set((state) => {
      if (state.navTo !== null) {
        return { ...state, navAt: state.navTo!, navTo: null };
      } else {
        return { ...state, navAt: state.navAt, navTo: state.navTo };
      }
    }),
}));

export default useNavStore;

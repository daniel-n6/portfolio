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
  position: [number, number, number];
  subLabel?: string;
  children?: Array<NavItem>;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "About",
    navigation: NavState.About,
    position: [-7, 0, 7],
  },
  /*
  {
    label: "Portfolio",
    navigation: NavState.Portfolio,
    position: [0, 0, -10],
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        navigation: NavState.Portfolio1,
        position: [0, 0, -10],
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        navigation: NavState.Portfolio2,
        position: [0, 0, -10],
      },
    ],
  },*/
  {
    label: "Contact Me",
    navigation: NavState.ContactMe,
    position: [8, 0, 6],
  },
];

type NavType = {
  navAt: NavState;
  navPos: [number, number, number] | null;
  navTo?: NavState | null;
  navigate: (current: NavState, navPos: [number, number, number]) => void;
  update: () => void;
};

const useNavStore = create<NavType>((set) => ({
  navAt: NavState.Home,
  navTo: null,
  navPos: null,
  navigate: (nav: NavState, navPos: [number, number, number]) =>
    set((state) => ({ ...state, navAt: state.navAt, navTo: nav, navPos })),
  update: () =>
    set((state) => {
      if (state.navTo !== null) {
        return { ...state, navAt: state.navTo!, navTo: null, navPos: null };
      } else {
        return {
          ...state,
          navAt: state.navAt,
          navTo: state.navTo,
          navPos: state.navPos,
        };
      }
    }),
}));

export default useNavStore;

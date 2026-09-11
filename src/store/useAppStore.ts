import { create } from 'zustand';

interface AppState {
  isExperienceMode: boolean;
  toggleExperienceMode: () => void;
  setExperienceMode: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isLoaded: boolean;
  setIsLoaded: (val: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isExperienceMode: false,
  toggleExperienceMode: () => set((state) => ({ isExperienceMode: !state.isExperienceMode })),
  setExperienceMode: (val) => set({ isExperienceMode: val }),
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
  isLoaded: false,
  setIsLoaded: (val) => set({ isLoaded: val }),
}));

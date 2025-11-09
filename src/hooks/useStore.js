import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(persist(
  (set) => ({
    player: { name: 'Guest', level: 1, xp: 0 },
    inventory: [],
    quests: [],
    currentScene: 'LANDING',

    addItem: (item) => set((s) => ({ inventory: [...s.inventory, item] })),
    completeQuest: (id) => set((s) => ({
      quests: [...s.quests, { id, completed: true }],
    })),
    setScene: (scene) => set({ currentScene: scene }),
  }),
  {
    name: 'qculand-save', 
  }
));

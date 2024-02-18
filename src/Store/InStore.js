import { create } from 'zustand'


export const useStore = create((set) => ({
  divs: [{ b: 'tap on the pens done', d: 'you can write anything you want here' }],
  deleteDiv: () => {
    set({ divs: [] });
  },
}));
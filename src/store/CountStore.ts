import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface BearState {
  bears: number
  addABear: () => void
  reduceABear: () => void
  restBears: () => void
}

const CountStore = create<BearState>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
      reduceABear: () => set({ bears: get().bears - 1 }),
      restBears: () => set({ bears: 0 }),
    }),
    {
      name: 'Bear-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default CountStore;
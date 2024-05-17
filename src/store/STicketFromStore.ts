import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface TicketState {
  activityName: string
  ticketType: string
  FVolunteer: string
  FVCount: number
  SVolunteer: string
  SVCount: number
  addTicket: (state: TicketState,VType:string) => void
  reduceTicket:(state: TicketState,VType:string) => void
  restTicket: () => void
}


const STicketFromStore = create<TicketState>()(
  persist(
    (set, get) => ({
      activityName: "",
      ticketType: "",
      FVolunteer: "",
      FVCount: 0,
      SVolunteer: "",
      SVCount: 0,
      addTicket: (state: TicketState,VType:string) => {
        switch (VType) {
          case "FVCount" :
            if (get().FVCount < 5) return (
              set({ ...state, FVCount: get().FVCount + 1 })
            )
          case "SVCount" :
            if (get().SVCount < 5) return (
              set({ ...state, SVCount: get().SVCount + 1 })
            )
        }
      },
      reduceTicket:(state: TicketState,VType:string) => {
        switch (VType) {
          case "FVCount" :
            if(get().FVCount > 0) return (
              set({ ...state, FVCount: get().FVCount - 1 })
            )
          case "SVCount" :
            if(get().FVCount > 0) return (
              set({ ...state, SVCount: get().SVCount - 1 })
            )
        } 
      },
      restTicket() {
        
      }
    }),
    {
      name: 'STicketFrom-Storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default STicketFromStore;
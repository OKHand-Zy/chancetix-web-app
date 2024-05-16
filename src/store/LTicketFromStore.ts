import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface TicketState {
  activityName: string
  ticketType: string
  FVolunteer: string
  FVCount: number
  SVolunteer: string
  SVCount: number
  UpdateACName: (ACName: string) => void
  UpdateTicketType: (ticketType: string) => void
  UpdateVolunteer: (VType: string, VValue: string) => void
  addFVTCount: () => void
  addSVTCount: () => void
  decFVTCount: () => void
  decSVTCount: () => void
  restTicket: () => void
}


const LTicketFromStore = create<TicketState>()(
  persist(
    (set, get) => ({
      activityName: "",
      ticketType: "",
      FVolunteer: "",
      FVCount: 0,
      SVolunteer: "",
      SVCount: 0,
      UpdateACName: (ACName: string) => {
        set({activityName: ACName })
      },
      UpdateTicketType: (ticketType: string) => {
        set({ticketType: ticketType })
      },
      UpdateVolunteer: (VType: string, VValue: string) => {
        if (VType === "FV") {
          set({FVolunteer: VValue })
        }
        if (VType === "SV") {
          set({SVolunteer: VValue })
        }
      },
      addFVTCount: () => {
        if (get().FVCount <4 ) {
          set({FVCount: get().FVCount + 1 });
        }
      },
      addSVTCount: () => {
        if (get().SVCount < 4) {
          set({SVCount: get().SVCount + 1 });
        }
      },
      decFVTCount: () => {
        if (get().FVCount > 0) {
          set({FVCount: get().FVCount - 1 });
        }
      },
      decSVTCount: () => {
        if (get().SVCount > 0) {
          set({SVCount: get().SVCount - 1 });
        }
      },
      restTicket: () => {
        
      }
    }),
    {
      name: 'LTicketFrom-Storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default LTicketFromStore;
import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface TicketGroup {
  group: string;
  count: number;
}

interface TicketState {
  activityName: string;
  ticketType: string;
  tickets: TicketGroup[];
  updateACName: (ACName: string) => void;
  updateTicketType: (ticketType: string) => void;
  addGroup: (newGroup: string) => void;
  updateTicketCount: (groupName: string, count: number) => void;
  reduceTicket: () => void;
  resetTicketData: () => void;
}

const STicketFromStore = create<TicketState>()(
  persist(
    (set) => ({
      activityName: "",
      ticketType: "",
      tickets: [],
      updateACName: (ACName: string) => {
        set({ activityName: ACName });
      },
      updateTicketType: (ticketType: string) => {
        set({ ticketType });
      },
      addGroup: (newGroup: string) => {
        set((state) => ({
          tickets: [...state.tickets, { group: newGroup, count: 0 }],
        }));
      },
      updateTicketCount: (groupName: string, count: number) => {
        set((state) => {
          const updatedTickets = state.tickets.map((ticket) =>
            ticket.group === groupName ? { ...ticket, count } : ticket
          );
          return { tickets: updatedTickets };
        });
      },
      reduceTicket: () => {
        set((state) => ({
          tickets: state.tickets.slice(0, -1),
        }));
      },
      resetTicketData: () => {
        set({
          activityName: "",
          ticketType: "",
          tickets: [],
        });
      }
    }),
    {
      name: 'STicketFrom-Storage',
      storage: createJSONStorage(() => sessionStorage), // 使用 sessionStorage 作為存儲
    },
  ),
);

export default STicketFromStore;
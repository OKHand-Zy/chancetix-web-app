import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

export const SwitchTixSchema = z.object({
  id: z.number(),
  eventName: z.string(),
  serialNumber: z.string(),
  ticketType: z.string(),
  ticketGroup: z.string(),
  position: z.string(),
  price: z.number(),
});

export type TicketsColumnSchema = z.infer<typeof SwitchTixSchema>

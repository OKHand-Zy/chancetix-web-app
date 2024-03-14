
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "123",
      amount: 100,
      status: "pending",
      email: "B@example.com",
    },
    {
      id: "456",
      amount: 200,
      status: "pending",
      email: "F@example.com",
    },
    {
      id: "728",
      amount: 500,
      status: "pending",
      email: "A@example.com",
    },
    {
      id: "728ed52f",
      amount: 900,
      status: "pending",
      email: "K@example.com",
    },
  ]
}

export default async function TixpoolFrom() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    
  )
}

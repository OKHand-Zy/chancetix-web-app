import Link from "next/link";
import { Button } from "@/components/ui/Shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Shadcn/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Shadcn/accordion"

function Activity_2() {
  return (
    <div className="h-screen flex items-center justify-center p-8">
      <Card className="w-8/12 p-4">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <p>1213546456</p>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="Vip_Ticket">
              <AccordionTrigger> SS Ticket </AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-between">
                  Yes. It adheres to the WAI-ARIA design pattern.
                  <Button variant="outline" asChild>
                      <Link href="/Activity/sellticket/Activity_2/SSTicket"> Buy </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Normal_Ticket">
              <AccordionTrigger> Normal Ticket </AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-between">
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                  <Button variant="outline" asChild>
                      <Link href="/Activity/sellticket/Activity_2/NormalTicket"> Buy </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
        <div className="flex justify-center">
          <Button asChild > 
            <Link href="/"> Back to Home </Link> 
          </Button>
        </div>
      </Card>
    </div>

  );
}

export default Activity_2
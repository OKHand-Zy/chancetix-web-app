import { Button } from "@/components/ui/Shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Shadcn/card"

function Activity_1() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px] h-full">
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
          <Button variant="outline">Buy</Button>
          <Button>Cancel</Button>
        </CardFooter>
      </Card>
    </div>

  );
}

export default Activity_1
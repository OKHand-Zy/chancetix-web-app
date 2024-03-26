import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Shadcn/drawer"
import { Button } from "@/components/ui/Shadcn/button";
import { ScrollArea } from "@/components/ui/Shadcn/scroll-area";
import { TfiAlignJustify } from "react-icons/tfi";
import Link from "next/link"

export function NavbarSidebar() {
  return (
    <Drawer direction='right'>
    <DrawerTrigger asChild>
      <Button variant="outline">
        <TfiAlignJustify />
      </Button>
    </DrawerTrigger>
      <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-9/12 rounded-none'>
        <ScrollArea className='h-screen'>
          <div className='mx-auto w-full p-5'>
            <DrawerHeader>
              <DrawerTitle>Theme Color Options</DrawerTitle>
              <DrawerDescription>
                * Selected option will be applied to all layout elements (navbar, toolbar, etc.). You can also create your own theme options and color
                schemes.
              </DrawerDescription>
            </DrawerHeader>
            <div className='p-4 pb-0 space-y-4'>
                          
              <Button asChild className='text-black hover:text-white bg-muted flex items-center justify-center rounded-lg h-12' >
                <Link href="/auth/login">
                  Login
                </Link>
              </Button>
                          
              <Button asChild className='text-black hover:text-white bg-muted flex items-center justify-center rounded-lg h-12' >
                <Link href="/auth/register">
                  Register
                </Link>
              </Button>
                          
              <Button asChild className='text-black hover:text-white bg-muted flex items-center justify-center rounded-lg h-12' >
                <Link href="/Activity">
                  Activity
                </Link>
              </Button>
                          
              <Button asChild className='text-black hover:text-white bg-muted flex items-center justify-center rounded-lg h-12' >
                <Link href="/News">
                  News
                </Link>
              </Button>
                          
              <Button asChild className='text-black hover:text-white bg-muted flex items-center justify-center rounded-lg h-12' >
                <Link href="/FAQ">
                  F&Q
                </Link>
              </Button>

              <Button asChild className='text-black hover:text-white bg-muted flex items-center justify-center rounded-lg h-12' >
                <Link href="/About">
                  About-us
                </Link>
              </Button>
            </div>
          </div>
          <hr></hr>
          <DrawerFooter className='flex items-center justify-center'>
            <DrawerTitle> Footer Title</DrawerTitle>
            <DrawerDescription>
              * Selected option will be applied to all layout elements (navbar, toolbar, etc.). You can also create your own theme options and color
              schemes.
            </DrawerDescription>
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}


//ref:https://github.com/shadcn-ui/ui/issues/2602#issuecomment-1913947985
"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/Shadcn/navigation-menu"



export function NavigationButton() {
    return (
        <NavigationMenu>
        <NavigationMenuList>
            
            <NavigationMenuItem className={navigationMenuTriggerStyle({ bg: 'transparent' })}>
                <Link href="/Activity" legacyBehavior passHref>
                    <NavigationMenuLink>
                        活動分類
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <p> ／ </p>
            <NavigationMenuItem className={navigationMenuTriggerStyle({ bg: 'transparent' })}>
                <Link href="/News" legacyBehavior passHref>
                    <NavigationMenuLink>
                        最新公告
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <p> ／ </p>
            <NavigationMenuItem className={navigationMenuTriggerStyle({ bg: 'transparent' })}>
                <Link href="/FAQ" legacyBehavior passHref>
                    <NavigationMenuLink>
                        常見問題
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <p> ／ </p>
            <NavigationMenuItem className={navigationMenuTriggerStyle({ bg: 'transparent' })}>
                <Link href="/About" legacyBehavior passHref>
                    <NavigationMenuLink>
                        關於我們
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>

        </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
        <NavigationMenuLink asChild>
            <a
            ref={ref}
            className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
            )}
            {...props}
            >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
            </p>
            </a>
        </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

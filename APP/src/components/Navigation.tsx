"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { routes } from "@/src/routes";
import Logo from "./Logo";

export default function Navigation() {
    const currentPath = usePathname();

    return (
        <Navbar isBordered>
            <NavbarBrand>
                <Logo height={40} />
            </NavbarBrand>
            <NavbarContent className="flex gap-4" justify="center">
                {Object.entries(routes).map(([href, { label }]) => (
                    <NavbarItem
                        key={href}
                        isActive={currentPath === href} // Add this line to apply a style to the active item
                    >
                        <Link
                            color={
                                currentPath === href ? "primary" : "foreground"
                            }
                            href={href}
                        >
                            {label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
        </Navbar>
    );
}

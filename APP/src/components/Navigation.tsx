"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const currentPath = usePathname();

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/dashboard/musicians", label: "Musicos" },
        { href: "/dashboard/events", label: "Ensayos" },
        { href: "/dashboard/selections", label: "Particiones" },
        { href: "/dashboard/instruments", label: "Instrumentos" },
        { href: "/dashboard/import-csv", label: "Importar CSV" },
    ];

    return (
        <Navbar isBordered>
            <NavbarBrand>
                {/* LOGO */}
                <p className="font-bold text-inherit">SJMA</p>
            </NavbarBrand>
            <NavbarContent className="m:flex gap-4" justify="center">
                {navItems.map((item) => (
                    <NavbarItem
                        key={item.href}
                        isActive={currentPath === item.href} // Add this line to apply a style to the active item
                    >
                        <Link
                            color={
                                currentPath === item.href
                                    ? "primary"
                                    : "foreground"
                            }
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
        </Navbar>
    );
}

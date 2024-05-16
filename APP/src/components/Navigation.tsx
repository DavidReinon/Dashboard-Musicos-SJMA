import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
} from "@nextui-org/react";

export default function Navigation({ currentPath }: { currentPath: string }) {
    const navItems = [
        { href: "/dashboard/musicians", label: "Musicos" },
        { href: "/dashboard/events", label: "Ensayos" },
        { href: "/dashboard/selections", label: "Particiones" },
    ];

    return (
        <Navbar>
            <NavbarBrand>
                {/* LOGO */}
                <p className="font-bold text-inherit">SJMA</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {navItems.map((item) => (
                    <NavbarItem
                        key={item.href}
                        isActive={currentPath === item.href}
                    >
                        <Link color="foreground" href={item.href}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
        </Navbar>
    );
}


import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
} from "@nextui-org/react";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "SJMA - Dashboard",
    description: "Gestion de la Sociedad Juventud Musical de Albal",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={GeistSans.className}>
            <body className="bg-background text-foreground">
                <main className="min-h-screen flex flex-col items-center">
                    <Navbar>
                        <NavbarBrand>
                            {/* LOGO */}
                            <p className="font-bold text-inherit">SJMA</p>
                        </NavbarBrand>
                        <NavbarContent
                            className="hidden sm:flex gap-4"
                            justify="center"
                        >
                            <NavbarItem>
                                <Link
                                    color="foreground"
                                    href="/dashboard/musicians"
                                >
                                    Musicos
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link
                                    href="/dashboard/events"
                                    aria-current="page"
                                >
                                    Ensayos
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link
                                    color="foreground"
                                    href="/dashboard/selections"
                                >
                                    Particiones
                                </Link>
                            </NavbarItem>
                        </NavbarContent>
                        {/* Sign Up */}
                        {/* <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="#">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            as={Link}
                            color="primary"
                            href="#"
                            variant="flat"
                        >
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent> */}
                    </Navbar>

                    <Providers>{children}</Providers>
                    <footer className="absolute bottom-10 w-full">
                        <p className="text-center text-sm text-gray-500">
                            © {new Date().getFullYear()} David Reinón
                            <a
                                href="https://github.com/davidreinon"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                                    alt="GitHub Logo"
                                    className="w-6 h-6 inline-block ml-2"
                                />
                            </a>
                        </p>
                    </footer>
                </main>
            </body>
        </html>
    );
}

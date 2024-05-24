import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/src/components/Navigation";
import { Toaster } from "@/src/components/ui/toaster";
import { headers } from "next/headers";
import { routes } from "@/src/routes";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "SJMA - Particiones",
    description:
        "Gestión de particiones de la Sociedad Juventud Musical de Albal",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = headers();
    const pathname = headersList.get("x-pathname");

    return (
        <html lang="es" className={`${GeistSans.className} dark`}>
            <body className="bg-background text-foreground">
                <main className="min-h-screen flex flex-col items-center">
                    <Navigation />
                    <Toaster />
                    <div className="flex flex-col w-full gap-y-8 items-start py-8 px-64">
                        {pathname && (
                            <h1 className="text-4xl font-bold">
                                {routes[pathname].label}
                            </h1>
                        )}
                        <Providers>{children}</Providers>
                    </div>
                </main>
            </body>
        </html>
    );
}

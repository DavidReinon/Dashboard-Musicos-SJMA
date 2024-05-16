import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/src/components/Navigation";

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
    currentPath,
}: {
    children: React.ReactNode;
    currentPath: string;
}) {
    return (
        <html lang="es" className={`${GeistSans.className} dark`}>
            <body className="bg-background text-foreground">
                <main className="min-h-screen flex flex-col items-center">
                    <Navigation currentPath={currentPath}/>
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

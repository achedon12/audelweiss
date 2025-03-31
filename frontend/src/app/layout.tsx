import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import Header from "@/components/Header";
import Index from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang="en">
        <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
            <Header />
            {children}
            <Index />
        </Providers>
        </body>
        </html>
    );
}
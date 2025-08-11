"use client";

import Navbar from "@/components/layouts/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import Footer from "@/components/layouts/footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <Navbar />
                <div className="bg-primary-foreground font-body">
                    {children}
                    <Footer />
                </div>
            </ThemeProvider>
        </Provider>
    );
}

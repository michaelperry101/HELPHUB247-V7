import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "Helphub247 – Carys AI",
  description: "24/7 AI help for everyone. Chat like ChatGPT, with voice, images and files.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

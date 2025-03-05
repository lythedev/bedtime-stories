import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bedtime Story App",
  description: "A collection of bedtime stories for children",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="pink">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-b from-primary-50 to-secondary-50">
            <header className="container mx-auto py-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary-800">Bedtime Stories</h1>
                <div className="flex items-center gap-8">
                  <nav>
                    <ul className="flex space-x-6">
                      <li>
                        <a href="/" className="text-primary-700 hover:text-primary-500">
                          Home
                        </a>
                      </li>
                      <li>
                        <a href="/stories" className="text-primary-700 hover:text-primary-500">
                          Stories
                        </a>
                      </li>
                      <li>
                        <a href="/favorites" className="text-primary-700 hover:text-primary-500">
                          Favorites
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <ThemeSwitcher />
                </div>
              </div>
            </header>
            <main className="container mx-auto py-8">{children}</main>
            <footer className="container mx-auto py-6 text-center text-gray-500">
              <p>© {new Date().getFullYear()} Bedtime Stories App. All rights reserved.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

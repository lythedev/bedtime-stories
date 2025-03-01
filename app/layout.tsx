import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bedtime Story App",
  description: "A collection of bedtime stories for children",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
          <header className="container mx-auto py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-purple-800">Bedtime Stories</h1>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a href="/" className="text-indigo-700 hover:text-indigo-500">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/stories" className="text-indigo-700 hover:text-indigo-500">
                      Stories
                    </a>
                  </li>
                  <li>
                    <a href="/favorites" className="text-indigo-700 hover:text-indigo-500">
                      Favorites
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="container mx-auto py-8">{children}</main>
          <footer className="container mx-auto py-6 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Bedtime Stories App. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/header/Navbar";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "BookNook",
    template: "%s | BookNook",
  },
  description: "Discover, explore and manage your favorite books.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
         <Toaster position="top-center" />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
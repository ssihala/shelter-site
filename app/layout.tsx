import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { Header } from './components/Header'
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: "300"
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "", //title of the website
  creator: "",
  keywords: [
  
  ],
  openGraph: {
    title: '',
    description: '',
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/logotiem.ico' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex flex-1">
            <div className="flex flex-row w-full p-20">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

import localFont from "next/font/local";
import "./globals.css";
import  "bootstrap/dist/css/bootstrap.min.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Turing's Spelling Bee",
  description: "Spelling Bee Practice Application for Elementary and Middle school students.",
};

import SessionProviderWrapper from './components/SessionProviderWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}

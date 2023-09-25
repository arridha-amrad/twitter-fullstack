import { AppContextProvider } from "@/context/AppContext";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Toast from "../components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Twitter",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const background = cookies().get("background");
  const color = cookies().get("color");
  return (
    <html lang="en" className={`${color?.value} ${background?.value}`}>
      <body className={`${inter.className}`}>
        <AppContextProvider>
          <Toast />
          {children}
          {modal}
        </AppContextProvider>
      </body>
    </html>
  );
}

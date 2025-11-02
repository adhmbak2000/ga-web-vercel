import type { Metadata } from "next";
import ServicesLayout from "../../../lib/components/layout/services";
import AppProvider from '../../../lib/context/AppProvider';
import "../globals.css";


export const metadata: Metadata = {
  title: "Mohammed_117722 BIA601",
  description: "this the homwork for the BIA601 in SVU for the student Muhammad Baker (Mohammed_117722)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <AppProvider>
          <ServicesLayout>
            {children}
          </ServicesLayout>
        </AppProvider>
      </body>
    </html>
  );
}

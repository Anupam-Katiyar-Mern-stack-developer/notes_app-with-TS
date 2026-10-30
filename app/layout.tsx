import type { Metadata } from "next";
import DashboardLayout from "@/components/DashboardLayout";

import "./globals.css"


export const metadata: Metadata = {
  title: "NoteSpace",
  description: "Your personal notes workspace",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>
) {
  return (
    <html lang="en">

      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  )
}
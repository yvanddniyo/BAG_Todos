import type { Metadata } from "next";
import { Radio_Canada } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import QueryProvider from "./QueryProvider";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const radio = Radio_Canada({ subsets: ["latin"] });

type GenerateMetadataProps = {
  params: { id: string }
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  // const id = params.id;
  const fetchTodo = await axios.get(`${BASE_URL}/api/todos`);
  const resMetadata = fetchTodo.data;
  
  console.log("resMetadata", resMetadata);
  
  return {
    title: resMetadata.title || 'Todo App',
    description: resMetadata.description || 'Manage your tasks efficiently',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={radio.className}>
        <QueryProvider>
        <Providers>
         {children}
        </Providers>
        </QueryProvider>
      </body>
    </html>
  );
}

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

// export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
//   // const id = params.id;
//   const fetchTodo = await axios.get(`${BASE_URL}/api/todos`);
//   const resMetadata = fetchTodo.data;
  
//   console.log("resMetadata", resMetadata);
  
//   return {
//     title: resMetadata.title || 'Todo App',
//     description: resMetadata.description || 'Manage your tasks efficiently',
//     openGraph: {
//       images: [
//         {
//           url: resMetadata.image || "../../public/todo-app.png", 
//           width: 1200,
//           height: 630,
//           alt: 'Todo App',
//         },
//       ],
//     },
//   };
// }
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  try {
    const fetchTodo = await axios.get(`${BASE_URL}/api/todos`);
    const resMetadata = fetchTodo.data;

    return {
      title: resMetadata.title || 'Todo App',
      description: resMetadata.description || 'Manage your tasks efficiently',
      openGraph: {
        images: [
          {
            url: resMetadata.image ||  "../../public/todo-app.png", 
            width: 1200,
            height: 630,
            alt: 'Todo App',
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: 'Todo App',
      description: 'Manage your tasks efficiently',
      openGraph: {
        images: [
          {
            url:  "../../public/todo-app.png",
            width: 1200,
            height: 630,
            alt: 'Todo App',
          },
        ],
      },
    };
  }
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

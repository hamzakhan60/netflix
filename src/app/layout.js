"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./redux/provider";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";



export default function RootLayout({ children }) {
  const patheName=usePathname();
  return (
    <>
    
    <html lang="en">
    {patheName!=="/login" && patheName!=="/signup" && patheName!=="/screens" ?
      <body className={inter.className }>
      <Navbar/>
      <Providers>{children}</Providers>
      <Footer/>
      
      </body>
      :
      <body className={inter.className }>
      
      <Providers>{children}</Providers>

      
      </body>}
    </html>
    </>
  );
}

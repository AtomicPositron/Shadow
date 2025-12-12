import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";
import  Auth  from "@/components/auth"
import  Resume from "@/components/resume"
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
// TODO: Add 3d Effects on the inputs and buttons with box shadow and stuff
// TODO: 

export default function auth(){
    return (
        <div className="flex flex-row h-dvh w-dvw">
          
          
          <div  className="flex-2 p-10 gap-2 justify-center align-center items-center flex flex-col">
            <h1 className="icon text-black mb-5 text-5xl/2">Shadow</h1>
            <Auth />
          </div>

        </div>
    )
}
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import FindMovies from "./components/FindMovies";

export default function Home() {
  return (
    // <main className={`bg-black flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>      // Syntax for using Inter font
    <main className={`bg-white min-h-screen`}> 
      <FindMovies />
    </main>
  );
}

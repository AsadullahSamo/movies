import Movies from "./components/Movies";
import Head from "next/head";

export default function Home() {

  return (  
    <main className={`bg-white min-h-screen`}> 
      <Head>
        <title>Movie App</title>
        <link rel="icon" href="/assets/icons/logo.svg" type="image/icon" />
      </Head>

      <Movies />
    </main>
  );

}

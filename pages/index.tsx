import Head from "next/head";
import { Portfolio } from "../components/Portfolio";
import { origin } from "../content/metadata";

// The homepage's interactive controls are owned by the two deferred scripts.
export const config = { runtime: "nodejs", unstable_runtimeJS: false };

const title = "Tejasvi Gupta | Software Engineering Portfolio";
const description = "Software engineering, cloud automation and AI projects by Tejasvi Gupta.";

export default function Home() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={origin + "/"} />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Arctic Glass" />
        <meta property="og:url" content={origin + "/"} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={origin + "/images/profile.webp"} />
        <meta property="og:image:alt" content="Tejasvi Gupta outdoors" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={origin + "/images/profile.webp"} />
      </Head>
      <Portfolio />
      <script defer src="/arctic.js" />
      <script defer src="/premium.js" />
    </>
  );
}


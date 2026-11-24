import Script from "next/script";
import { Portfolio } from "../components/Portfolio";
import { pageMetadata } from "../content/metadata";
export const metadata = pageMetadata(
  "/",
  "Tejasvi Gupta | Software Engineering Portfolio",
  "Software engineering, cloud automation and AI projects by Tejasvi Gupta.",
);
export default function Home() {
  return (
    <>
      <Portfolio />
      <Script src="/arctic.js" strategy="afterInteractive" />
      <Script src="/premium.js" strategy="afterInteractive" />
    </>
  );
}

import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { Work } from "./Work";
import { Skills } from "./Skills";
import { Journey } from "./Journey";
import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Dialogs } from "./Dialogs";
import { projects } from "../content/projects.mjs";
import { profile } from "../content/profile.mjs";
export function Portfolio() {
  const emailjs = {
    serviceId:
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || profile.emailjs.serviceId,
    templateId:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || profile.emailjs.templateId,
    publicKey:
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || profile.emailjs.publicKey,
  };
  const associations = Object.fromEntries(
    profile.core.map((skill) => [
      skill,
      projects.filter((p) => p.stack.includes(skill)).map((p) => p.id),
    ]),
  );
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <Work />
        <Skills />
        <Journey />
        <About />
        <Contact />
      </main>
      <Footer />
      <Dialogs />
      <script
        type="application/json"
        id="portfolio-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            projects,
            associations,
            email: profile.email,
            emailjs,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

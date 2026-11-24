import { notFound } from "next/navigation";
import { projects } from "../../../content/projects.mjs";
import { pageMetadata } from "../../../content/metadata";
import { External, Chips } from "../../../components/Elements";
import { DetailTheme } from "../../../components/DetailTheme";
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return projects.map(({ id }) => ({ id }));
}
async function lookup({ params }: Props) {
  const { id } = await params;
  return projects.find((p) => p.id === id) ?? notFound();
}
export async function generateMetadata(props: Props) {
  const p = await lookup(props);
  return pageMetadata(
    "/projects/" + p.id + "/",
    p.name + " | Tejasvi Gupta",
    p.summary,
  );
}
export default async function CaseStudy(props: Props) {
  const p = await lookup(props);
  return (
    <main id="main" className="detail-page">
      <div className="actions">
        <a className="button" href="/#work">
          ← Selected work
        </a>
        <DetailTheme />
      </div>
      <article className="glass panel">
        <span className="eyebrow">{p.category}</span>
        <h1>{p.name}</h1>
        <p>{p.summary}</p>
        {p.image && (
          <img src={p.image} alt={p.name + " landing page screenshot"} />
        )}
        <h2>Problem</h2>
        <p>{p.problem}</p>
        <h2>Engineering approach</h2>
        <p>{p.approach}</p>
        <h2>Technology stack</h2>
        <Chips values={p.stack} />
        <h2>Scope &amp; verification</h2>
        <p>{p.notes}</p>
        <div className="actions">
          <External className="button" label="Source code" url={p.repo} />
          {p.demo && (
            <External className="button" label="Live app" url={p.demo} />
          )}
        </div>
      </article>
    </main>
  );
}

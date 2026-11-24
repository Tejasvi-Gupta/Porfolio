import { profile as p } from "../content/profile.mjs";
export function Footer() {
  return (
    <>
      <footer>
        <span>
          © {new Date().getFullYear()} {p.name} · Arctic Glass
        </span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}

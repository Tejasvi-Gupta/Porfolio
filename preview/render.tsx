import { renderToStaticMarkup } from "react-dom/server";
import { Portfolio } from "../components/Portfolio";
export function renderPortfolio() {
  return renderToStaticMarkup(<Portfolio />);
}

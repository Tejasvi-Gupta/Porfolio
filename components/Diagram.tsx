const shapes = {
  cloud:
    '<rect x="105" y="26" width="110" height="40" rx="10"/><path d="M160 66V91H64V115M160 91H256V115M160 91V115"/><rect x="20" y="115" width="88" height="35" rx="8"/><rect x="116" y="115" width="88" height="35" rx="8"/><rect x="212" y="115" width="88" height="35" rx="8"/><text x="160" y="51">PROVISION</text><text x="64" y="137">AGENT</text><text x="160" y="137">API</text><text x="256" y="137">VERIFY</text>',
  attendance:
    '<rect x="25" y="24" width="270" height="132" rx="10"/><path d="M90 24V156M25 50H295M105 82H280M105 110H280M105 138H280"/><path d="M45 72h25M45 92h25M45 112h25"/><text x="196" y="42">ATTENDANCE</text><circle cx="267" cy="68" r="5"/><circle cx="267" cy="96" r="5"/><circle cx="267" cy="124" r="5"/>',
  map: '<path d="M0 40L320 130M0 120L320 45M80 0L135 180M230 0L190 180M0 80H320"/><path d="M45 140L115 100L174 112L260 42" stroke-dasharray="6 5"/><circle cx="115" cy="100" r="12"/><circle cx="260" cy="42" r="12"/><circle cx="174" cy="112" r="7"/>',
};
export function Diagram({ kind }: { kind: string }) {
  return (
    <div className="diagram" aria-label="Conceptual project illustration">
      <svg
        viewBox="0 0 320 180"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        aria-hidden="true"
        dangerouslySetInnerHTML={{
          __html: shapes[kind as keyof typeof shapes] ?? "",
        }}
      />
      <span>CONCEPT DIAGRAM</span>
    </div>
  );
}

// The security model as one picture: which parts talk to which, across which boundary.
// Every label restates a claim already made in the copy on /security (no ports, role names,
// vendor products or planned work) - keep it that way when editing.

const box = "fill-ink-card stroke-line-strong";
const keyBox = "fill-ink-card stroke-accent";
const title = "fill-foreground text-[14px] font-semibold";
const body = "fill-foreground-muted text-[12px]";
const edgeLabel = "fill-foreground-muted font-mono text-[10.5px]";

export function SecurityArchitectureMap() {
  return (
    <figure className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-xl border border-line-strong bg-ink-elevated">
        <svg
          viewBox="0 0 1000 564"
          role="img"
          aria-label="Lumen's security architecture. A clinician's browser connects over HTTPS to a load balancer, the only public entry point. Inside a private network with no public IPs, the reporting application checks identity with Gait, then organization membership, facility scope, and role and report state before reaching the clinical database, which enforces organization isolation again. The media service authorizes every request before issuing a short-lived image URL and stores images under random IDs. Hospital systems connect through integration listeners, each behind its own boundary. Engineers reach the private network only through a VPN."
          className="block h-auto w-full min-w-[860px] font-sans"
        >
          <defs>
            <marker id="sec-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="fill-foreground-muted" />
            </marker>
            <marker id="sec-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="fill-accent" />
            </marker>
          </defs>

          {/* Trust zones */}
          <rect x="10" y="10" width="180" height="520" rx="10" className="fill-ink-card/40 stroke-line" />
          <rect x="205" y="10" width="595" height="520" rx="10" className="fill-accent-soft stroke-accent/40" strokeDasharray="6 5" />
          <rect x="815" y="10" width="175" height="520" rx="10" className="fill-ink-card/40 stroke-line" />
          <text x="100" y="552" textAnchor="middle" className="fill-foreground-muted font-mono text-[10.5px] uppercase tracking-[0.15em]">Public internet</text>
          <text x="502" y="552" textAnchor="middle" className="fill-accent font-mono text-[10.5px] uppercase tracking-[0.15em]">Lumen private network · no public IPs</text>
          <text x="902" y="552" textAnchor="middle" className="fill-foreground-muted font-mono text-[10.5px] uppercase tracking-[0.15em]">Separate trust domains</text>

          {/* Public side */}
          <rect x="22" y="60" width="156" height="100" rx="8" className={box} />
          <text x="36" y="88" className={title}>Clinician&apos;s browser</text>
          <text x="36" y="110" className={body}>HTTPS only</text>

          <rect x="22" y="420" width="156" height="70" rx="8" className={box} />
          <text x="36" y="447" className={title}>Lumen engineers</text>
          <text x="36" y="468" className={body}>never direct to data</text>

          {/* Private network */}
          <rect x="220" y="60" width="130" height="110" rx="8" className={box} />
          <text x="234" y="88" className={title}>Load balancer</text>
          <text x="234" y="110" className={body}>the only public</text>
          <text x="234" y="126" className={body}>entry point</text>

          <rect x="220" y="420" width="130" height="70" rx="8" className={box} />
          <text x="234" y="447" className={title}>VPN gateway</text>
          <text x="234" y="468" className={body}>production access</text>

          <rect x="380" y="40" width="250" height="200" rx="10" className={keyBox} strokeWidth="1.6" />
          <text x="396" y="68" className={title}>Reporting application</text>
          <text x="396" y="86" className="fill-foreground-muted text-[11.5px]">every request passes, in order:</text>
          <text x="396" y="114" className="fill-accent font-mono text-[12px]">1</text>
          <text x="414" y="114" className="fill-foreground text-[12.5px]">Identity verified with Gait</text>
          <text x="396" y="138" className="fill-accent font-mono text-[12px]">2</text>
          <text x="414" y="138" className="fill-foreground text-[12.5px]">Active organization membership</text>
          <text x="396" y="162" className="fill-accent font-mono text-[12px]">3</text>
          <text x="414" y="162" className="fill-foreground text-[12.5px]">Facility scope</text>
          <text x="396" y="186" className="fill-accent font-mono text-[12px]">4</text>
          <text x="414" y="186" className="fill-foreground text-[12.5px]">Role and report state</text>
          <text x="396" y="220" className="fill-foreground-muted text-[11.5px]">A valid login alone opens nothing.</text>

          <rect x="380" y="300" width="250" height="110" rx="10" className={keyBox} strokeWidth="1.6" />
          <text x="396" y="328" className={title}>Media service</text>
          <text x="396" y="352" className={body}>authorizes every request by organization</text>
          <text x="396" y="370" className={body}>and facility before it issues a</text>
          <text x="396" y="388" className={body}>short-lived image URL</text>

          <rect x="380" y="450" width="250" height="62" rx="8" className={box} />
          <text x="396" y="476" className={title}>Integration listeners</text>
          <text x="396" y="496" className={body}>one boundary per connection</text>

          <rect x="655" y="40" width="130" height="200" rx="10" className={box} />
          <text x="669" y="68" className={title}>Clinical</text>
          <text x="669" y="86" className={title}>database</text>
          <text x="669" y="114" className={body}>organization</text>
          <text x="669" y="130" className={body}>isolation enforced</text>
          <text x="669" y="146" className={body}>a second time</text>
          <text x="669" y="178" className={body}>append-only</text>
          <text x="669" y="194" className={body}>audit trail</text>

          <rect x="655" y="300" width="130" height="110" rx="10" className={box} />
          <text x="669" y="328" className={title}>Image storage</text>
          <text x="669" y="352" className={body}>random IDs,</text>
          <text x="669" y="368" className={body}>never patient</text>
          <text x="669" y="384" className={body}>filenames</text>

          {/* Separate trust domains */}
          <rect x="830" y="60" width="145" height="130" rx="8" className={box} />
          <text x="844" y="88" className={title}>Gait</text>
          <text x="844" y="110" className={body}>identity platform</text>
          <text x="844" y="134" className={body}>proves who you are,</text>
          <text x="844" y="150" className={body}>nothing more</text>

          <rect x="830" y="300" width="145" height="130" rx="8" className={box} />
          <text x="844" y="328" className={title}>Hospital systems</text>
          <text x="844" y="352" className={body}>EMR, PACS,</text>
          <text x="844" y="368" className={body}>interface engines</text>
          <text x="844" y="396" className={body}>each with its own</text>
          <text x="844" y="412" className={body}>message contract</text>

          {/* Connections */}
          <g fill="none" strokeWidth="1.5">
            <line x1="178" y1="110" x2="218" y2="110" className="stroke-accent" markerEnd="url(#sec-arrow-accent)" />
            <line x1="350" y1="110" x2="378" y2="110" className="stroke-foreground-muted" markerEnd="url(#sec-arrow)" />
            <path d="M350,150 H365 V355 H378" className="stroke-foreground-muted" markerEnd="url(#sec-arrow)" />
            <line x1="630" y1="140" x2="653" y2="140" className="stroke-foreground-muted" markerEnd="url(#sec-arrow)" />
            <path d="M630,330 H642 V205 H653" className="stroke-foreground-muted" markerEnd="url(#sec-arrow)" />
            <line x1="630" y1="380" x2="653" y2="380" className="stroke-foreground-muted" markerEnd="url(#sec-arrow)" />
            <path d="M560,40 V22 H902 V58" className="stroke-foreground-muted" markerEnd="url(#sec-arrow)" />
            <path d="M902,430 V481 H632" className="stroke-foreground-muted" markerEnd="url(#sec-arrow)" />
            <line x1="178" y1="455" x2="218" y2="455" className="stroke-foreground-muted" markerEnd="url(#sec-arrow)" />
          </g>
          <text x="198" y="102" textAnchor="middle" className="fill-accent font-mono text-[10.5px]">HTTPS</text>
          <text x="731" y="17" textAnchor="middle" className={edgeLabel}>verify identity</text>
          <text x="642" y="132" textAnchor="middle" className={edgeLabel}>TLS</text>
          <text x="738" y="474" textAnchor="middle" className={edgeLabel}>HL7 · FHIR · DICOM</text>
          <text x="198" y="447" textAnchor="middle" className={edgeLabel}>VPN</text>
        </svg>
      </div>
      <figcaption className="max-w-3xl text-sm leading-relaxed text-foreground-muted">
        One public entry point, and nothing behind it trusts the layer in front. The reporting
        application runs four checks before any clinical data moves, the database enforces
        organization isolation a second time, and images are released only through short-lived,
        pre-authorized URLs.
      </figcaption>
    </figure>
  );
}

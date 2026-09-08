import { Link } from "@tanstack/react-router";

const navLinks = [
  { to: "/", label: "Overview" },
  { to: "/mines", label: "Mine data" },
  { to: "/contact", label: "Request survey" },
] as const;

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between py-5">
      <Link to="/" className="flex items-center gap-2.5">
        <span className="grid size-7 place-items-center rounded-[min(1vw,6px)] bg-oxide/90 font-grotesk text-sm font-semibold text-basalt">
          L
        </span>
        <span className="font-mono text-sm uppercase tracking-[0.18em] text-frost">Lithoscan</span>
        <span className="mt-0.5 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-frost/40 sm:inline">
          / Bharat Manganese Belt
        </span>
      </Link>
      <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.14em] text-frost/60 md:flex">
        {navLinks.map((l) => (
          <Link key={l.to} to={l.to} activeProps={{ className: "text-oxide" }}>
            {l.label}
          </Link>
        ))}
      </nav>
      <Link
        to="/contact"
        className="rounded-md bg-oxide px-3.5 py-2 text-sm font-semibold text-basalt ring-1 ring-oxide/40"
      >
        Request survey
      </Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-frost/10 pb-2 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-frost/40">
      <span>Lithoscan · Manganese Prospecting, India</span>
      <span>MOIL mine plate · 2024–2025 · 3,650 daily records</span>
    </footer>
  );
}

export function Backdrop() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_-10%,oklch(0.42_0.045_253/0.55),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_100%_100%,oklch(0.7_0.113_66/0.14),transparent_55%)]" />
    </div>
  );
}

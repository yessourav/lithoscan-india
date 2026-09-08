import { createFileRoute, Link } from "@tanstack/react-router";

import scanPlate from "@/assets/scan-plate.jpg";
import targetMap from "@/assets/target-map.jpg";
import { moil } from "@/data/moil";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lithoscan — Manganese Reserves & Shortfall Intelligence, India" },
      {
        name: "description",
        content:
          "Satellite hyperspectral capture and machine learning applied to India's manganese belt — ranked reserve targets and daily shortfall forecasting across five MOIL mines.",
      },
      {
        property: "og:title",
        content: "Lithoscan — Manganese Reserves & Shortfall Intelligence, India",
      },
      {
        property: "og:description",
        content:
          "Ranked manganese targets across the Madhya Pradesh–Maharashtra belt, built on 3,650 daily mine records.",
      },
    ],
  }),
  component: Home,
});

const pipeline = [
  {
    n: "01",
    title: "Hyperspectral capture",
    body: "ISRO AVIRIS-NG and Sentinel-2 passes resolve 440–2500 nm reflectance over the Bhandara–Balaghat belt.",
  },
  {
    n: "02",
    title: "Data fusion",
    body: "GSI lithology, aeromagnetic gradients and LiDAR relief stack into one coordinate frame.",
  },
  {
    n: "03",
    title: "Prospectivity model",
    body: "A gradient-boosted model scores each 30 m tile against known Mn occurrences of the belt.",
  },
  {
    n: "04",
    title: "Shortfall forecast",
    body: "The same feature stack predicts next-day output per mine from weather and equipment signals.",
  },
];

const zones = [
  { id: "MP-BAL-A", name: "Bharveli North", score: 0.94 },
  { id: "MH-BHN-C", name: "Sitasaongi Ridge", score: 0.81 },
  { id: "MP-BAL-D", name: "Ukwa East Flank", score: 0.73 },
  { id: "MH-NAG-F", name: "Kandri Corridor", score: 0.68 },
];

const nf = new Intl.NumberFormat("en-IN");

function Home() {
  const worst = moil.sites[0];

  return (
    <main>
      {/* HERO */}
      <section className="relative pb-16 pt-10 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-frost/15 bg-iron/50 px-3 py-1 ring-1 ring-white/5 backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-oxide" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-frost/70">
                Hyperspectral · LiDAR · 440–2500 nm
              </span>
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-none tracking-tight sm:text-5xl">
              Reading India's manganese out of raw rock and raw pixels.
            </h1>
            <p className="max-w-[48ch] text-pretty text-base text-frost/70 sm:text-lg">
              Lithoscan fuses satellite hyperspectral capture with ground geophysics and mine
              telemetry across the Madhya Pradesh–Maharashtra belt — turning a{" "}
              {nf.format(moil.shortfall)}-tonne production gap into ranked drill targets and a daily
              shortfall forecast.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/mines"
                className="inline-flex items-center gap-2 rounded-md bg-oxide px-4 py-2.5 text-sm font-semibold text-basalt ring-1 ring-oxide/40"
              >
                <span className="grid size-4 place-items-center rounded-[3px] bg-basalt/20">→</span>
                See the mine plate
              </Link>
              <a
                href="#pipeline"
                className="inline-flex items-center rounded-md border border-frost/20 bg-iron/40 px-4 py-2.5 text-sm font-medium text-frost/90 backdrop-blur-xl"
              >
                How the model works
              </a>
            </div>
            <div className="flex gap-8 pt-4 font-mono text-xs text-frost/50">
              <div>
                <span className="block text-lg font-semibold text-frost">5</span>MOIL mines
              </div>
              <div>
                <span className="block text-lg font-semibold text-frost">
                  {nf.format(moil.rows)}
                </span>
                daily records
              </div>
              <div>
                <span className="block text-lg font-semibold text-frost">{moil.avgPct}%</span>mean
                shortfall
              </div>
            </div>
          </div>

          {/* scan plate */}
          <div className="relative lg:col-span-6">
            <div className="plate relative overflow-hidden p-3">
              <div className="flex items-center justify-between px-1 pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-frost/40">
                <span>Capture · Balaghat sector</span>
                <span>21.81°N 80.18°E</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[min(1vw,10px)] bg-basalt ring-1 ring-white/5">
                <img
                  src={scanPlate}
                  alt="Hyperspectral satellite scan of a manganese mining basin in central India"
                  width={1024}
                  height={640}
                  className="absolute inset-0 size-full object-cover opacity-90"
                />
                <div className="absolute inset-x-0 top-0 flex justify-between px-1 font-mono text-[9px] text-frost/25">
                  <span>80.16</span>
                  <span>80.17</span>
                  <span>80.18</span>
                  <span>80.19</span>
                </div>
                <div className="absolute left-[22%] top-[38%] size-2 rounded-full bg-oxide ring-2 ring-oxide/30" />
                <div className="absolute left-[63%] top-[57%] size-2 rounded-full bg-frost/70 ring-2 ring-frost/20" />
                <div className="absolute left-[48%] top-[24%] size-2 rounded-full bg-frost/40 ring-2 ring-frost/10" />
                <div className="scan-line" />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 font-mono text-[10px]">
                <div className="rounded-[min(1vw,6px)] bg-basalt/60 px-2 py-1.5">
                  <span className="text-oxide">▮</span> Mn {moil.sites[0].grade}%
                </div>
                <div className="rounded-[min(1vw,6px)] bg-basalt/60 px-2 py-1.5">
                  Health {worst.health}
                </div>
                <div className="rounded-[min(1vw,6px)] bg-basalt/60 px-2 py-1.5">
                  Downtime {worst.downtime} h
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHORTFALL */}
      <section className="py-12">
        <div className="plate p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[40ch]">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxide">
                The problem
              </p>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                India mines manganese but still imports it.
              </h2>
            </div>
            <p className="max-w-[44ch] text-pretty text-sm text-frost/65 sm:text-base">
              Across {moil.start} to {moil.end}, the five MOIL sites in this plate missed target on{" "}
              {moil.riskShare}% of operating days. Monsoon rainfall and equipment downtime, not ore
              grade, drive the gap.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={`${nf.format(moil.shortfall)} t`} label="cumulative shortfall" />
            <Stat value={`${moil.avgPct}%`} label="mean daily shortfall" accent />
            <Stat value={`${moil.riskShare}%`} label="days flagged at risk" />
            <Stat value={`${moil.monsoonPct}%`} label="monsoon shortfall (Jun–Sep)" />
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section id="pipeline" className="py-12">
        <div className="flex items-baseline justify-between border-b border-frost/10 pb-3">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            From orbit to a ranked zone.
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-frost/40">
            4-stage pipeline
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map((p) => (
            <div key={p.n} className="plate p-4">
              <span className="font-mono text-[11px] text-oxide">{p.n}</span>
              <h3 className="mt-2 font-semibold text-frost">{p.title}</h3>
              <p className="mt-1 text-pretty text-sm text-frost/60">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TARGETS */}
      <section className="py-12">
        <div className="plate p-5">
          <div className="flex items-center justify-between pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-frost/40">
            <span>Ranked candidate zones · Bhandara–Balaghat belt</span>
            <span>Confidence →</span>
          </div>
          <div className="grid gap-5 md:grid-cols-12">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[min(1vw,10px)] bg-basalt ring-1 ring-white/5 md:col-span-7">
              <img
                src={targetMap}
                alt="Prospectivity map plate of the Madhya Pradesh and Maharashtra manganese belt"
                width={1024}
                height={704}
                loading="lazy"
                className="absolute inset-0 size-full object-cover opacity-90"
              />
              <Marker left="30%" top="42%" tone="oxide" label="MP-BAL-A · 0.94" />
              <Marker left="66%" top="30%" tone="bright" label="MH-BHN-C · 0.81" />
              <Marker left="48%" top="66%" tone="dim" label="MP-BAL-D · 0.73" />
            </div>
            <div className="space-y-2.5 md:col-span-5">
              {zones.map((z, i) => (
                <div
                  key={z.id}
                  className={`inset-plate flex items-center justify-between px-3 py-2.5 ${
                    i === 0 ? "ring-1 ring-oxide/25" : ""
                  }`}
                >
                  <span className="font-mono text-xs text-frost/80">
                    {z.id}
                    <span className="ml-2 text-frost/45">{z.name}</span>
                  </span>
                  <span
                    className={`font-mono text-xs ${
                      i === 0 ? "font-semibold text-oxide" : "text-frost/70"
                    }`}
                  >
                    {z.score.toFixed(2)}
                  </span>
                </div>
              ))}
              <p className="pt-1 font-mono text-[10px] text-frost/40">
                Confidence = modelled P(Mn-bearing | fused spectral + geophysical signature)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-12">
        <div className="plate grid grid-cols-2 divide-y divide-frost/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <Cell value={`${moil.dryPct}%`} label="dry-season shortfall" />
          <Cell value={`${moil.monsoonPct}%`} label="monsoon shortfall" accent />
          <Cell value="0.72" label="downtime ↔ shortfall link" />
          <Cell value={`${nf.format(moil.actual)} t`} label="output delivered" />
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="inset-plate p-4">
      <p
        className={`font-mono text-2xl font-semibold sm:text-3xl ${accent ? "text-oxide" : "text-frost"}`}
      >
        {value}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-frost/50">{label}</p>
    </div>
  );
}

function Cell({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="p-5">
      <p className={`font-mono text-2xl font-semibold ${accent ? "text-oxide" : "text-frost"}`}>
        {value}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-frost/50">{label}</p>
    </div>
  );
}

function Marker({
  left,
  top,
  tone,
  label,
}: {
  left: string;
  top: string;
  tone: "oxide" | "bright" | "dim";
  label: string;
}) {
  const dot =
    tone === "oxide"
      ? "size-2.5 bg-oxide ring-4 ring-oxide/20"
      : tone === "bright"
        ? "size-2 bg-frost/70 ring-4 ring-frost/10"
        : "size-2 bg-frost/40 ring-4 ring-frost/5";
  const text =
    tone === "oxide" ? "text-oxide" : tone === "bright" ? "text-frost/70" : "text-frost/40";
  return (
    <div className="absolute flex flex-col items-start" style={{ left, top }}>
      <span className={`rounded-full ${dot}`} />
      <span className={`mt-1 font-mono text-[10px] ${text}`}>{label}</span>
    </div>
  );
}

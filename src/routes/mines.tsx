import { createFileRoute } from "@tanstack/react-router";

import { moil } from "@/data/moil";

export const Route = createFileRoute("/mines")({
  head: () => ({
    meta: [
      { title: "Mine Data Plate — Five MOIL Manganese Mines | Lithoscan" },
      {
        name: "description",
        content:
          "Two years of daily records from Balaghat, Ukwa, Gumgaon, Chikla and Dongri Buzurg: shortfall, ore grade, equipment health and monsoon effect.",
      },
      { property: "og:title", content: "Mine Data Plate — Five MOIL Manganese Mines" },
      {
        property: "og:description",
        content:
          "Site-by-site shortfall, ore grade and equipment health across India's manganese belt.",
      },
    ],
  }),
  component: MinesPage,
});

const nf = new Intl.NumberFormat("en-IN");
const maxPct = Math.max(...moil.monthly.map((m) => m.pct));

function MinesPage() {
  return (
    <main className="pb-8">
      <section className="pb-10 pt-10 sm:pt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxide">
          Data plate · {moil.start} → {moil.end}
        </p>
        <h1 className="mt-2 max-w-[26ch] text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Five mines, {nf.format(moil.rows)} operating days, one persistent gap.
        </h1>
        <p className="mt-4 max-w-[60ch] text-pretty text-frost/70">
          Every figure below is computed from the MOIL production record for the Madhya
          Pradesh–Maharashtra manganese belt. Targets total {nf.format(moil.target)} tonnes; delivered
          output was {nf.format(moil.actual)} tonnes.
        </p>
      </section>

      {/* SITE TABLE */}
      <section className="py-6">
        <div className="plate overflow-hidden p-5">
          <div className="flex items-center justify-between pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-frost/40">
            <span>Site register · ranked by mean shortfall</span>
            <span>Mn grade %</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="font-mono text-[10px] uppercase tracking-[0.14em] text-frost/40">
                  <th className="py-2 font-normal">Mine</th>
                  <th className="py-2 font-normal">State</th>
                  <th className="py-2 text-right font-normal">Target t</th>
                  <th className="py-2 text-right font-normal">Actual t</th>
                  <th className="py-2 text-right font-normal">Shortfall %</th>
                  <th className="py-2 text-right font-normal">Risk days</th>
                  <th className="py-2 text-right font-normal">Health</th>
                  <th className="py-2 text-right font-normal">Grade %</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {moil.sites.map((s, i) => (
                  <tr key={s.site} className="border-t border-frost/10">
                    <td className="py-3 pr-4">
                      <span className={i === 0 ? "text-oxide" : "text-frost"}>{s.site}</span>
                      <span className="ml-2 text-[10px] text-frost/40">{s.coords}</span>
                    </td>
                    <td className="py-3 pr-4 text-frost/60">{s.state}</td>
                    <td className="py-3 text-right text-frost/70">{nf.format(s.target)}</td>
                    <td className="py-3 text-right text-frost/70">{nf.format(s.actual)}</td>
                    <td
                      className={`py-3 text-right ${i === 0 ? "font-semibold text-oxide" : "text-frost"}`}
                    >
                      {s.avgPct}
                    </td>
                    <td className="py-3 text-right text-frost/70">{s.riskDays}</td>
                    <td className="py-3 text-right text-frost/70">{s.health}</td>
                    <td className="py-3 text-right text-frost/70">{s.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MONSOON */}
      <section className="py-6">
        <div className="plate p-6 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[42ch]">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxide">
                Monsoon signature
              </p>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight">
                The gap widens with the rain.
              </h2>
            </div>
            <p className="max-w-[42ch] text-pretty text-sm text-frost/65">
              Mean shortfall rises from {moil.dryPct}% in the dry months to {moil.monsoonPct}% across
              June–September, when average rainfall in the belt jumps roughly fivefold.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-6 gap-2 sm:grid-cols-12">
            {moil.monthly.map((m) => (
              <div key={m.month} className="flex flex-col items-center gap-2">
                <div className="flex h-32 w-full items-end justify-center">
                  <div
                    className="w-full rounded-t-[3px] bg-oxide/80"
                    style={{ height: `${(m.pct / maxPct) * 100}%` }}
                    title={`${m.month}: ${m.pct}% shortfall, ${m.rain} mm rain`}
                  />
                </div>
                <span className="font-mono text-[10px] text-frost/50">{m.month}</span>
                <span className="font-mono text-[10px] text-frost/80">{m.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVERS + WEATHER */}
      <section className="grid gap-5 py-6 lg:grid-cols-12">
        <div className="plate p-6 lg:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxide">
            What the model leans on
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight">
            Shortfall drivers, by correlation strength.
          </h2>
          <ul className="mt-6 space-y-3">
            {moil.drivers.map((d) => (
              <li key={d.name} className="inset-plate px-3 py-2.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-frost/80">{d.name}</span>
                  <span className={d.r > 0 ? "text-oxide" : "text-frost/60"}>
                    {d.r > 0 ? "+" : ""}
                    {d.r.toFixed(3)}
                  </span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-frost/10">
                  <div
                    className={d.r > 0 ? "h-full bg-oxide" : "h-full bg-frost/40"}
                    style={{ width: `${Math.abs(d.r) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="plate p-6 lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxide">
            Weather severity
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight">
            Severe days cost double.
          </h2>
          <div className="mt-6 space-y-3">
            {moil.weather.map((w) => (
              <div key={w.name} className="inset-plate flex items-center justify-between px-3 py-3">
                <div>
                  <p className="font-mono text-xs text-frost/80">{w.name}</p>
                  <p className="font-mono text-[10px] text-frost/40">{nf.format(w.days)} days</p>
                </div>
                <p className="font-mono text-lg font-semibold text-oxide">{w.pct}%</p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[10px] text-frost/40">
            Mean shortfall % by recorded weather severity class.
          </p>
        </div>
      </section>
    </main>
  );
}

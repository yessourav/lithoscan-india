import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { submitSurveyRequest } from "../survey";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Request a Survey — Lithoscan India" },
      {
        name: "description",
        content:
          "Ask for a ranked manganese prospectivity plate or a shortfall forecast for any block in the Indian manganese belt.",
      },
      { property: "og:title", content: "Request a Survey — Lithoscan India" },
      {
        property: "og:description",
        content: "Send a block of interest and receive a ranked prospectivity plate.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    organisation: "",
    email: "",
    block: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await submitSurveyRequest({
        data: {
          organisation: formData.organisation,
          email: formData.email,
          block: formData.block,
          notes: formData.notes,
        },
      });

      if (res.ok) {
        setSent(true);
      } else {
        setErrorMsg(res.error || "Could not save your request. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pb-12 pt-10 sm:pt-14">
      <div className="plate grid gap-8 p-6 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxide">Request</p>
          <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Scope a survey for your block.
          </h1>
          <p className="mt-3 max-w-[40ch] text-pretty text-sm text-frost/65 sm:text-base">
            Name a district or lease boundary in the Indian manganese belt and we return a ranked
            prospectivity plate plus a shortfall forecast within five working days.
          </p>
          <p className="mt-6 font-mono text-xs text-frost/40">
            ops@lithoscan.in · Nagpur, Maharashtra
          </p>
        </div>

        {sent ? (
          <div className="inset-plate flex flex-col justify-center p-6 lg:col-span-7">
            <p className="font-mono text-base font-semibold text-oxide">
              ✓ Request submitted successfully!
            </p>
            <p className="mt-2 text-sm text-frost/80">
              Your block survey request has been recorded in the database.
            </p>
          </div>
        ) : (
          <form className="grid gap-4 sm:grid-cols-2 lg:col-span-7" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="rounded border border-red-500/50 bg-red-900/20 p-3 text-xs text-red-200 sm:col-span-2">
                {errorMsg}
              </div>
            )}

            <Field
              className="sm:col-span-2"
              label="Organisation"
              placeholder="MOIL Limited"
              value={formData.organisation}
              onChange={(val) => setFormData({ ...formData, organisation: val })}
            />
            <Field
              label="Email"
              type="email"
              placeholder="you@company.in"
              value={formData.email}
              onChange={(val) => setFormData({ ...formData, email: val })}
            />
            <Field
              label="Block of interest"
              placeholder="Balaghat district, 40 km²"
              value={formData.block}
              onChange={(val) => setFormData({ ...formData, block: val })}
            />
            <label className="sm:col-span-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-frost/50">
                Notes
              </span>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5 w-full rounded-[min(1vw,8px)] bg-basalt/60 px-3 py-2.5 text-sm text-frost ring-1 ring-white/10 outline-none placeholder:text-frost/30 focus:ring-oxide/50"
                placeholder="Deposit type, existing GSI data, target grade…"
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-md bg-oxide px-4 py-2.5 text-sm font-semibold text-basalt ring-1 ring-oxide/40 disabled:opacity-50"
              >
                <span className="grid size-4 place-items-center rounded-[3px] bg-basalt/20">→</span>
                {loading ? "Submitting..." : "Submit survey request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  className = "",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={className}>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-frost/50">
        {label}
      </span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-[min(1vw,8px)] bg-basalt/60 px-3 py-2.5 text-sm text-frost ring-1 ring-white/10 outline-none placeholder:text-frost/30 focus:ring-oxide/50"
      />
    </label>
  );
}

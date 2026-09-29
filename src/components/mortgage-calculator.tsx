"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

import { calculateMortgage } from "@/lib/mortgage";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// Strip everything but digits and one decimal point so people can paste "$450,000".
function parseNum(value: string): number {
  const n = parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
};

function Field({ label, value, onChange, prefix, suffix, hint }: FieldProps) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] tracking-[0.2em] uppercase text-neutral-500 mb-2"
      >
        {label}
      </label>
      <div className="flex items-center border border-neutral-300 bg-white focus-within:border-forest transition-colors">
        {prefix ? (
          <span className="pl-4 text-[16px] text-neutral-400">{prefix}</span>
        ) : null}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="w-full min-w-0 bg-transparent px-4 py-3 text-[16px] text-charcoal outline-none"
        />
        {suffix ? (
          <span className="pr-4 text-[16px] text-neutral-400">{suffix}</span>
        ) : null}
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[12px] text-neutral-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type Props = {
  initialPrice?: number;
  /** Hide the outer heading/CTA when embedded inside a blog post. */
  embedded?: boolean;
};

export function MortgageCalculator({ initialPrice = 500000, embedded }: Props) {
  const [price, setPrice] = useState(String(initialPrice));
  const [downPct, setDownPct] = useState("20");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [taxPct, setTaxPct] = useState("1.6");
  const [insurance, setInsurance] = useState("3600");
  const [hoa, setHoa] = useState("0");
  const [pmiPct, setPmiPct] = useState("0.6");
  const termId = useId();

  const result = useMemo(() => {
    const homePrice = parseNum(price);
    const pct = Math.min(100, parseNum(downPct));
    return calculateMortgage({
      homePrice,
      downPayment: homePrice * (pct / 100),
      ratePct: parseNum(rate),
      termYears: parseNum(term) || 30,
      propertyTaxPct: parseNum(taxPct),
      insuranceYearly: parseNum(insurance),
      hoaMonthly: parseNum(hoa),
      pmiPct: parseNum(pmiPct),
    });
  }, [price, downPct, rate, term, taxPct, insurance, hoa, pmiPct]);

  const parts = [
    { label: "Principal and interest", value: result.principalInterest, tone: "bg-forest" },
    { label: "Property tax", value: result.propertyTax, tone: "bg-forest/60" },
    { label: "Home insurance", value: result.insurance, tone: "bg-forest/35" },
    { label: "HOA / CDD", value: result.hoa, tone: "bg-neutral-400" },
    { label: "Mortgage insurance (PMI)", value: result.pmi, tone: "bg-neutral-300" },
  ].filter((p) => p.value > 0.5);

  const downDollars = (parseNum(price) * Math.min(100, parseNum(downPct))) / 100;

  return (
    <div
      className={
        embedded
          ? "my-12 border border-neutral-200 bg-[#F4F3EF] p-5 sm:p-8"
          : "border border-neutral-200 bg-[#F4F3EF] p-5 sm:p-10"
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Home price" prefix="$" value={price} onChange={setPrice} />
          </div>
          <Field
            label="Down payment"
            suffix="%"
            value={downPct}
            onChange={setDownPct}
            hint={`${usd.format(downDollars)} down`}
          />
          <Field label="Interest rate" suffix="%" value={rate} onChange={setRate} />
          <div>
            <label
              htmlFor={termId}
              className="block text-[11px] tracking-[0.2em] uppercase text-neutral-500 mb-2"
            >
              Loan term
            </label>
            <select
              id={termId}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full border border-neutral-300 bg-white px-4 py-3 text-[16px] text-charcoal outline-none focus:border-forest transition-colors"
            >
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
              <option value="10">10 years</option>
            </select>
          </div>
          <Field
            label="Property tax"
            suffix="% / yr"
            value={taxPct}
            onChange={setTaxPct}
            hint="Rate varies by county and by community."
          />
          <Field
            label="Home insurance"
            prefix="$"
            suffix="/ yr"
            value={insurance}
            onChange={setInsurance}
          />
          <Field
            label="HOA / CDD fees"
            prefix="$"
            suffix="/ mo"
            value={hoa}
            onChange={setHoa}
          />
          <Field
            label="PMI rate"
            suffix="% / yr"
            value={pmiPct}
            onChange={setPmiPct}
            hint="Applies only under 20% down."
          />
        </div>

        <div className="bg-white border border-neutral-200 p-6 sm:p-8 self-start">
          <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 mb-2">
            Estimated monthly payment
          </p>
          <p
            className="font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,6vw,3.5rem)] leading-none tracking-[-0.02em] text-charcoal"
            aria-live="polite"
          >
            {usd.format(result.total)}
          </p>

          <div
            className="mt-6 flex h-2.5 w-full overflow-hidden bg-neutral-100"
            role="img"
            aria-label="Breakdown of the monthly payment"
          >
            {parts.map((p) => (
              <div
                key={p.label}
                className={p.tone}
                style={{ width: `${(p.value / result.total) * 100}%` }}
              />
            ))}
          </div>

          <ul className="mt-5 space-y-3">
            {parts.map((p) => (
              <li
                key={p.label}
                className="flex items-center justify-between gap-4 text-[15px]"
              >
                <span className="flex items-center gap-2.5 text-neutral-600">
                  <span
                    aria-hidden="true"
                    className={`inline-block h-2.5 w-2.5 shrink-0 ${p.tone}`}
                  />
                  {p.label}
                </span>
                <span className="text-charcoal tabular-nums">
                  {usd.format(p.value)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 pt-5 border-t border-neutral-200 grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <dt className="text-neutral-500">Loan amount</dt>
              <dd className="mt-1 text-[16px] text-charcoal tabular-nums">
                {usd.format(result.loanAmount)}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-500">Total interest</dt>
              <dd className="mt-1 text-[16px] text-charcoal tabular-nums">
                {usd.format(Math.max(0, result.totalInterest))}
              </dd>
            </div>
          </dl>

          {!embedded ? (
            <Link
              href="/contact"
              className="mt-7 inline-flex w-full items-center justify-center bg-forest px-8 py-4 text-[12px] tracking-[0.2em] uppercase text-white hover:bg-forest-light transition-colors"
            >
              Talk through your numbers
            </Link>
          ) : null}
        </div>
      </div>

      <p className="mt-8 text-[12px] leading-relaxed text-neutral-500 max-w-3xl">
        This calculator gives an estimate for planning only. It is not a loan
        offer or a quote. Your actual rate, taxes, insurance and fees depend on
        your lender, your credit, the property and the county. Starting values
        are typical Central Florida assumptions, so change any of them to match
        your situation.
      </p>
    </div>
  );
}

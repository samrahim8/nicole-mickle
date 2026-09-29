export type MortgageInputs = {
  homePrice: number;
  downPayment: number;
  ratePct: number;
  termYears: number;
  propertyTaxPct: number;
  insuranceYearly: number;
  hoaMonthly: number;
  pmiPct: number;
};

export type MortgageResult = {
  loanAmount: number;
  principalInterest: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  pmi: number;
  total: number;
  totalInterest: number;
  downPct: number;
};

// Standard amortizing-loan payment. Handles a 0% rate without dividing by zero.
export function monthlyPayment(
  loan: number,
  ratePct: number,
  termYears: number,
): number {
  const n = Math.max(1, Math.round(termYears * 12));
  if (loan <= 0) return 0;
  const r = ratePct / 100 / 12;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

export function calculateMortgage(i: MortgageInputs): MortgageResult {
  const price = Math.max(0, i.homePrice);
  const down = Math.min(Math.max(0, i.downPayment), price);
  const loanAmount = price - down;
  const downPct = price > 0 ? (down / price) * 100 : 0;

  const principalInterest = monthlyPayment(loanAmount, i.ratePct, i.termYears);
  const propertyTax = (price * (i.propertyTaxPct / 100)) / 12;
  const insurance = Math.max(0, i.insuranceYearly) / 12;
  const hoa = Math.max(0, i.hoaMonthly);
  // Private mortgage insurance applies on conventional loans under 20% down.
  const pmi = downPct < 20 ? (loanAmount * (i.pmiPct / 100)) / 12 : 0;

  const n = Math.max(1, Math.round(i.termYears * 12));
  return {
    loanAmount,
    principalInterest,
    propertyTax,
    insurance,
    hoa,
    pmi,
    total: principalInterest + propertyTax + insurance + hoa + pmi,
    totalInterest: principalInterest * n - loanAmount,
    downPct,
  };
}

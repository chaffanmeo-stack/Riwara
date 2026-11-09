/** All money is stored as integer minor units (e.g. paisa, cents). */
export function formatMoney(minor: number, currency: string, locale = 'en-PK'): string {
  const digits = new Intl.NumberFormat(locale, { style: 'currency', currency }).resolvedOptions().maximumFractionDigits;
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(minor / 10 ** digits);
}

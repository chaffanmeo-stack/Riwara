
/** All money is stored as integer minor units (e.g. paisa, cents). */

export function formatMoney(
  minor: number,
  currency: string,
  locale = 'en-PK'
): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });

  const digits =
    formatter.resolvedOptions().maximumFractionDigits ?? 2;

  return formatter.format(minor / 10 ** digits);
}

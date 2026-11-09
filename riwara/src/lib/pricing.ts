export interface PricedLine { unitMinor: number; quantity: number; type: 'OWN_STOCK' | 'AFFILIATE' | 'WHATSAPP' }
export interface Coupon { kind: 'PERCENT' | 'FIXED'; value: number; minSubtotalMinor: number }

/** Only OWN_STOCK lines may be purchased through checkout or counted as store revenue. */
export function purchasableLines<T extends PricedLine>(lines: T[]): T[] {
  return lines.filter((l) => l.type === 'OWN_STOCK');
}
export function assertAllPurchasable(lines: PricedLine[]): void {
  if (lines.some((l) => l.type !== 'OWN_STOCK')) throw new Error('Only own-stock products can be checked out.');
}
export function subtotal(lines: PricedLine[]): number {
  return purchasableLines(lines).reduce((s, l) => {
    if (!Number.isInteger(l.quantity) || l.quantity < 1) throw new Error('Invalid quantity');
    return s + l.unitMinor * l.quantity;
  }, 0);
}
export function discountFor(sub: number, c?: Coupon | null): number {
  if (!c || sub < c.minSubtotalMinor) return 0;
  const d = c.kind === 'PERCENT' ? Math.floor((sub * c.value) / 100) : c.value;
  return Math.min(d, sub);
}
export function shippingFor(sub: number, rateMinor: number, freeOverMinor?: number | null): number {
  return freeOverMinor != null && sub >= freeOverMinor ? 0 : rateMinor;
}
export function orderTotal(sub: number, discount: number, shipping: number, tax = 0): number {
  return Math.max(0, sub - discount) + shipping + tax;
}

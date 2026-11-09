import { describe, it, expect } from 'vitest';
import { subtotal, discountFor, shippingFor, orderTotal, assertAllPurchasable } from '@/lib/pricing';
const own = { unitMinor: 1000, quantity: 2, type: 'OWN_STOCK' as const };
const aff = { unitMinor: 9999, quantity: 1, type: 'AFFILIATE' as const };
describe('pricing', () => {
  it('excludes affiliate lines from revenue subtotal', () => { expect(subtotal([own, aff])).toBe(2000); });
  it('rejects non own-stock checkout', () => { expect(() => assertAllPurchasable([own, aff])).toThrow(); });
  it('rejects invalid quantity', () => { expect(() => subtotal([{ ...own, quantity: 0 }])).toThrow(); });
  it('applies percent coupon with minimum', () => {
    expect(discountFor(2000, { kind: 'PERCENT', value: 10, minSubtotalMinor: 0 })).toBe(200);
    expect(discountFor(2000, { kind: 'PERCENT', value: 10, minSubtotalMinor: 5000 })).toBe(0);
  });
  it('caps fixed discount at subtotal', () => { expect(discountFor(500, { kind: 'FIXED', value: 900, minSubtotalMinor: 0 })).toBe(500); });
  it('free shipping threshold and totals', () => {
    expect(shippingFor(5000, 300, 5000)).toBe(0);
    expect(shippingFor(4999, 300, 5000)).toBe(300);
    expect(orderTotal(2000, 200, 300)).toBe(2100);
  });
});

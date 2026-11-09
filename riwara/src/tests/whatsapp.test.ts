import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
const tpl = 'Hi {name} {sku} {price} {url}';
const p = { name: 'Gold Watch', sku: 'W-1', priceLabel: 'Rs 100', url: 'https://x.test/p?a=1&b=2' };
describe('whatsapp', () => {
  it('encodes message and uses main number', () => {
    const u = buildWhatsAppUrl({ mainNumber: '+92 300 1234567', productTemplate: tpl }, p)!;
    expect(u.startsWith('https://wa.me/923001234567?text=')).toBe(true);
    expect(decodeURIComponent(u.split('text=')[1])).toBe('Hi Gold Watch W-1 Rs 100 https://x.test/p?a=1&b=2');
  });
  it('prefers category number', () => {
    const u = buildWhatsAppUrl({ mainNumber: '111111111', categoryNumbers: { WATCHES: '222222222' }, productTemplate: tpl }, { ...p, categoryKey: 'WATCHES' })!;
    expect(u).toContain('wa.me/222222222');
  });
  it('returns null without a valid number', () => {
    expect(buildWhatsAppUrl({ mainNumber: '', productTemplate: tpl }, p)).toBeNull();
  });
});

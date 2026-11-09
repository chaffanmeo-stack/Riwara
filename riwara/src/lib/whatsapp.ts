export interface WhatsAppConfig {
  mainNumber?: string | null;
  categoryNumbers?: Record<string, string>;
  productTemplate: string;
}
export interface InquiryProduct { name: string; sku: string; priceLabel: string; url: string; categoryKey?: string | null }

/** Digits only, as required by wa.me. Returns null if invalid. */
export function normalizeNumber(raw?: string | null): string | null {
  const digits = (raw ?? '').replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

export function buildInquiryMessage(template: string, p: InquiryProduct): string {
  return template
    .replaceAll('{name}', p.name).replaceAll('{sku}', p.sku)
    .replaceAll('{price}', p.priceLabel).replaceAll('{url}', p.url);
}

/** Returns a wa.me link (customer must press Send) or null if no number configured. */
export function buildWhatsAppUrl(cfg: WhatsAppConfig, p: InquiryProduct): string | null {
  const catNumber = p.categoryKey ? cfg.categoryNumbers?.[p.categoryKey] : undefined;
  const number = normalizeNumber(catNumber) ?? normalizeNumber(cfg.mainNumber);
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(buildInquiryMessage(cfg.productTemplate, p))}`;
}

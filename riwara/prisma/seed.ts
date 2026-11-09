import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
const cats = [['CLOTHING','Clothing','clothing'],['WATCHES','Watches','watches'],['SHAWLS','Shawls','shawls'],['ACCESSORIES','Accessories','accessories'],['PERFUMES','Perfumes','perfumes']] as const;
async function main() {
  for (const [kind, name, slug] of cats) await db.category.upsert({ where: { slug }, update: {}, create: { kind, name, slug } });
  await db.whatsAppSetting.upsert({ where: { id: 'main' }, update: {}, create: { id: 'main' } });
  await db.shippingZone.upsert({ where: { name: 'Pakistan' }, update: {}, create: { name: 'Pakistan', countries: ['PK'], freeOverMinor: 1500000, etaMinDays: 2, etaMaxDays: 5, rates: { create: [{ name: 'Standard', priceMinor: 25000, currency: 'PKR' }] } } });
  await db.shippingZone.upsert({ where: { name: 'International' }, update: {}, create: { name: 'International', countries: ['AE','GB','US','CA','SA'], etaMinDays: 7, etaMaxDays: 14, customsNote: 'Import duties and taxes are set by the destination country and paid by the recipient.', rates: { create: [{ name: 'Standard', priceMinor: 450000, currency: 'PKR' }] } } });
  const watches = await db.category.findUniqueOrThrow({ where: { slug: 'watches' } });
  // Clearly labelled DEMO product: not real inventory. Stays DRAFT so it is never public.
  await db.product.upsert({ where: { sku: 'DEMO-W-001' }, update: {}, create: { slug: 'demo-sample-watch', name: '[DEMO] Sample Watch', description: 'Demo/sample listing for testing only. Not real inventory.', type: 'OWN_STOCK', status: 'DRAFT', isDemo: true, sku: 'DEMO-W-001', priceMinor: 5000000, categoryId: watches.id, attributes: { movement: 'Quartz' } } });
  console.log('Seed complete.');
}
main().finally(() => db.$disconnect());

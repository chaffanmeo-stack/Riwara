// One-time secure admin bootstrap. Reads credentials from env; never stores defaults.
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
async function main() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  if (!email || !password) throw new Error('Set ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD.');
  if (password.length < 12) throw new Error('Password must be at least 12 characters.');
  const db = new PrismaClient();
  const role = await db.role.upsert({ where: { name: 'OWNER' }, update: {}, create: { name: 'OWNER' } });
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) throw new Error('A user with this email already exists.');
  await db.user.create({ data: { email, passwordHash: await bcrypt.hash(password, 12), isStaff: true, roleId: role.id, emailVerified: new Date() } });
  console.log('Owner account created. Remove the bootstrap variables now.');
  await db.$disconnect();
}
main().catch((e) => { console.error(e.message); process.exit(1); });

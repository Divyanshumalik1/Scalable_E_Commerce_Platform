import * as adapterPkg from "@prisma/adapter-pg";
import { PrismaClient } from '../../prisma/generated/index.js';

const { PrismaPg } = adapterPkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;
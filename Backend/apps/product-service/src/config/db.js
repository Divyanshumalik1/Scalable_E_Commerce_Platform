// import * as adapterPkg from '@prisma/adapter-pg';
// import { PrismaClient } from './prisma/generated/index.js';
// // adjust the relative path depending on where db.js is located

// const prisma = new PrismaClient();

// // optional connect (not required, Prisma auto-connects on first query)
// prisma.$connect()
//   .then(() => console.log('Connected to PostgreSQL database'))
//   .catch((err) => console.error('Error connecting to PostgreSQL database:', err));

// export default prisma;


import * as adapterPkg from '@prisma/adapter-pg';
import { PrismaClient } from '../../prisma/generated/index.js';

const { PrismaPg } = adapterPkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;
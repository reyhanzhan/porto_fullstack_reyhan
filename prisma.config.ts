import "dotenv/config";
import { defineConfig } from "@prisma/config";

// Kita ambil langsung nilainya dari process.env agar validasi TypeScript aman
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma 7 otomatis membaca DIRECT_URL dari env saat migrasi/db push dilakukan
    url: process.env.DATABASE_URL,
  },
});
import { config } from "dotenv";
import {defineConfig }from 'drizzle-kit'

config({path: ".env"})

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "migration",
    dialect: "postgresql",  
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})
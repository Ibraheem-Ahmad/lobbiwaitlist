import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./shared/schema.js";

// Load environment variables
config();

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function setupDatabase() {
  try {
    console.log("Testing database connection...");
    
    // Test the connection
    const result = await sql`SELECT NOW()`;
    console.log("✅ Database connected successfully!");
    console.log("Current time:", result[0].now);
    
    // Create tables using Drizzle
    console.log("Creating database tables...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS waitlist_signups (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    
    console.log("✅ Tables created successfully!");
    console.log("Your waitlist form should now work!");
    
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
    console.error("Make sure your DATABASE_URL is correct in Vercel environment variables");
  }
}

setupDatabase();


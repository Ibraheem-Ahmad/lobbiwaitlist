import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { waitlistSignups } from "../shared/schema.js";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone } = req.body;
      
      // Validate required fields
      if (!name || !email) {
        return res.status(400).json({ 
          message: "Name and email are required" 
        });
      }

      // Check if email already exists
      const existing = await db.select().from(waitlistSignups).where(eq(waitlistSignups.email, email));
      if (existing.length > 0) {
        return res.status(400).json({ 
          message: "Email already registered for waitlist" 
        });
      }

      // Insert new signup
      const [signup] = await db.insert(waitlistSignups).values({
        name,
        email,
        phone: phone || null
      }).returning();

      res.status(201).json({
        message: "Successfully joined waitlist!",
        signup: {
          id: signup.id,
          name: signup.name,
          email: signup.email
        }
      });

    } catch (error) {
      console.error("Waitlist signup error:", error);
      res.status(500).json({ 
        message: "Something went wrong. Please try again." 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


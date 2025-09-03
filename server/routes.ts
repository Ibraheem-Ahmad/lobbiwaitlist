import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSignupSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get waitlist count
  app.get("/api/waitlist/count", async (req, res) => {
    try {
      const count = await storage.getWaitlistCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ message: "Failed to get waitlist count" });
    }
  });

  // Create waitlist signup
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistSignupSchema.parse(req.body);
      
      // Check if email already exists
      const existingSignup = await storage.getWaitlistSignupByEmail(validatedData.email);
      if (existingSignup) {
        return res.status(400).json({ message: "Email already registered for waitlist" });
      }

      const signup = await storage.createWaitlistSignup(validatedData);
      const count = await storage.getWaitlistCount();
      
      res.status(201).json({ 
        message: "Successfully joined waitlist",
        signup: {
          id: signup.id,
          name: signup.name,
          email: signup.email
        },
        count
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const fieldErrors = error.errors.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return res.status(400).json({ 
          message: "Please check your input and try again",
          errors: fieldErrors
        });
      }
      
      // Handle database constraint errors (like duplicate email)
      if (error.code === '23505') {
        return res.status(400).json({ 
          message: "This email is already registered for the waitlist" 
        });
      }
      
      console.error("Waitlist signup error:", error);
      res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

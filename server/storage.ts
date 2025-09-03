import { users, waitlistSignups, type User, type InsertUser, type WaitlistSignup, type InsertWaitlistSignup } from "@shared/schema";
import { db } from "./db";
import { eq, count } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlistSignup(signup: InsertWaitlistSignup): Promise<WaitlistSignup>;
  getWaitlistCount(): Promise<number>;
  getWaitlistSignupByEmail(email: string): Promise<WaitlistSignup | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createWaitlistSignup(insertSignup: InsertWaitlistSignup): Promise<WaitlistSignup> {
    const [signup] = await db
      .insert(waitlistSignups)
      .values(insertSignup)
      .returning();
    return signup;
  }

  async getWaitlistCount(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(waitlistSignups);
    return result.count;
  }

  async getWaitlistSignupByEmail(email: string): Promise<WaitlistSignup | undefined> {
    const [signup] = await db.select().from(waitlistSignups).where(eq(waitlistSignups.email, email));
    return signup || undefined;
  }
}

export const storage = new DatabaseStorage();

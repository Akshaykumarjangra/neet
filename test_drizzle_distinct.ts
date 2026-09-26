import { db } from "./server/db";
import { chatMessages } from "@shared/schema";
import { eq, desc, inArray } from "drizzle-orm";

console.log(typeof db.selectDistinctOn);

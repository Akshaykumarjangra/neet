import { db } from "./server/db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

async function run() {
  const tsStart = Date.now();

  const total = 50000;

  let i = 0;
  let array = [];
  while(i < total){
    array.push(i);
    i++;
  }

  const end = Date.now();
  console.log(`Time took ${end - tsStart}ms`);
}
run();

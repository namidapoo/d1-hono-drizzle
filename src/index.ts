import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { todos } from "../db/schema";

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.get("/todos", async (c) => {
	try {
		const db = drizzle(c.env.DB);
		const results = await db.select().from(todos);
		return c.json(results);
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

export default app;

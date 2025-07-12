import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

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

app.get("/todos/:id", async (c) => {
	const id = parseInt(c.req.param("id"));
	try {
		const db = drizzle(c.env.DB);
		const results = await db.select().from(todos).where(eq(todos.id, id));
		return c.json(results);
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

app.post("/todos", async (c) => {
	const todo = await c.req.json<typeof todos.$inferInsert>();
	try {
		const db = drizzle(c.env.DB);
		const results = await db.insert(todos).values(todo);
		return c.json({
			message: "Todo created successfully",
			data: results,
		}, 201);
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

export default app;

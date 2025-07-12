CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`score` integer DEFAULT 0,
	`is_done` integer DEFAULT false,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" varchar(120) NOT NULL,
	"status" BOOLEAN
);

INSERT INTO "todo" ("task", "status")
VAlUES ('Finish weekend project!', 'false');
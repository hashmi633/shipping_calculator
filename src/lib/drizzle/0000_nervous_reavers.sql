CREATE TABLE IF NOT EXISTS "ParcelQuery" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_country" varchar(255),
	"to_country" varchar(255),
	"carrier" varchar(255),
	"weight_from" integer,
	"weight_to" integer,
	"length" integer,
	"width" integer,
	"height" integer,
	"rate_per_item" integer,
	"rate_per_kg" integer
);

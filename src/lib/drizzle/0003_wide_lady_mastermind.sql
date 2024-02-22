CREATE TABLE IF NOT EXISTS "boxes" (
	"id" serial PRIMARY KEY NOT NULL,
	"max_sum_dim" integer,
	"max_one_dim" integer,
	"shipping_rate_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ParcelQuery" RENAME TO "shipping_rates";--> statement-breakpoint
ALTER TABLE "shipping_rates" DROP COLUMN IF EXISTS "max_sum_dim";--> statement-breakpoint
ALTER TABLE "shipping_rates" DROP COLUMN IF EXISTS "max_one_dim";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boxes" ADD CONSTRAINT "boxes_shipping_rate_id_shipping_rates_id_fk" FOREIGN KEY ("shipping_rate_id") REFERENCES "shipping_rates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

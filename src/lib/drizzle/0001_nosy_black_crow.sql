ALTER TABLE "ParcelQuery" ALTER COLUMN "weight_from" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "ParcelQuery" ALTER COLUMN "weight_to" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "ParcelQuery" ALTER COLUMN "rate_per_item" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ParcelQuery" ALTER COLUMN "rate_per_kg" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ParcelQuery" ADD COLUMN "max_sum_dim" integer;--> statement-breakpoint
ALTER TABLE "ParcelQuery" ADD COLUMN "max_one_dim" integer;--> statement-breakpoint
ALTER TABLE "ParcelQuery" DROP COLUMN IF EXISTS "length";--> statement-breakpoint
ALTER TABLE "ParcelQuery" DROP COLUMN IF EXISTS "width";--> statement-breakpoint
ALTER TABLE "ParcelQuery" DROP COLUMN IF EXISTS "height";
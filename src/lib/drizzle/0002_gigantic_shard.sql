ALTER TABLE "ParcelQuery" ALTER COLUMN "weight_from" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "ParcelQuery" ALTER COLUMN "weight_to" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "ParcelQuery" ALTER COLUMN "rate_per_item" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "ParcelQuery" ALTER COLUMN "rate_per_kg" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "ParcelQuery" ADD COLUMN "shipping_method" varchar;--> statement-breakpoint
ALTER TABLE "ParcelQuery" ADD COLUMN "estimated_delivery" varchar;
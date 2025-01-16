ALTER TABLE "feedbacks" ALTER COLUMN "project_id" SET DATA TYPE uuid USING project_id::uuid;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "stripe_customer_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "subscribed" SET NOT NULL;
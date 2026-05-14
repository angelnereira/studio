-- CreateTable: cv_assets stores uploaded CV PDFs per language for the
-- "select my EN/ES CV from DB" workflow when sending applications.
CREATE TABLE "cv_assets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "kind" TEXT NOT NULL DEFAULT 'custom',
    "mimeType" TEXT NOT NULL DEFAULT 'application/pdf',
    "data" BYTEA NOT NULL,
    "size" INTEGER NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cv_assets_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "cv_assets_language_idx" ON "cv_assets"("language");
CREATE INDEX "cv_assets_isDefault_idx" ON "cv_assets"("isDefault");

-- AlterTable applications: add language, CV asset override, and per-event
-- timestamps for opens/clicks/replies/bounces from the Resend webhook.
ALTER TABLE "applications"
    ADD COLUMN "language"   TEXT NOT NULL DEFAULT 'en',
    ADD COLUMN "cvAssetId"  TEXT,
    ADD COLUMN "openedAt"   TIMESTAMP(3),
    ADD COLUMN "clickedAt"  TIMESTAMP(3),
    ADD COLUMN "repliedAt"  TIMESTAMP(3),
    ADD COLUMN "bouncedAt"  TIMESTAMP(3);

CREATE INDEX "applications_cvAssetId_idx" ON "applications"("cvAssetId");
CREATE INDEX "applications_resendId_idx"  ON "applications"("resendId");

ALTER TABLE "applications"
    ADD CONSTRAINT "applications_cvAssetId_fkey"
    FOREIGN KEY ("cvAssetId") REFERENCES "cv_assets"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable inbound_emails: link inbound replies back to the originating
-- Application so we can auto-attribute recruiter follow-ups.
ALTER TABLE "inbound_emails"
    ADD COLUMN "applicationId" TEXT;

CREATE INDEX "inbound_emails_applicationId_idx"
    ON "inbound_emails"("applicationId");

ALTER TABLE "inbound_emails"
    ADD CONSTRAINT "inbound_emails_applicationId_fkey"
    FOREIGN KEY ("applicationId") REFERENCES "applications"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

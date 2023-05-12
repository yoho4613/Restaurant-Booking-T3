-- CreateTable
CREATE TABLE "MenuItem" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "price" FLOAT8 NOT NULL,
    "categories" STRING[],
    "imageKey" STRING NOT NULL,
    "active" BOOL NOT NULL DEFAULT true,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Day" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "dayOfWeek" INT4 NOT NULL,
    "openTime" STRING NOT NULL,
    "closeTime" STRING NOT NULL,
    "open" BOOL NOT NULL DEFAULT true,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClosedDay" (
    "id" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClosedDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "people" STRING NOT NULL,
    "mobile" STRING NOT NULL,
    "email" STRING NOT NULL,
    "preorder" BOOL NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preorder" (
    "id" STRING NOT NULL,
    "bookingId" STRING NOT NULL,
    "item" STRING NOT NULL,
    "quantity" INT4 NOT NULL,
    "price" FLOAT8 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preorder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClosedDay_date_key" ON "ClosedDay"("date");

import { PrismaClient } from "@prisma/client";

const faker = require("faker");

const prisma = new PrismaClient();

async function main() {
  const tableIds = [
    "clhkg2kho412w03qor8m18nqi",
    "clhkg2kho415w03qor8m18nqi",
    "clhkg2kho410w03qor8m18nqi",
    "clhkg2kho411w03qor8m18nqi",
    "clhkg2kho413w03qor8m18nqi",
    "clhkg2kho408w03qor8m18nqi",
    "clhkg2kho407w03qor8m18nqi",
    "clhkg2kho406w03qor8m18nqi",
    "clhkg2kho405w03qor8m18nqi",
    "clhkg2kho403w03qor8m18nqi",
    "clhkg2kho404w03qor8m18nqi",
    "clhkg2kho402w03qor8m18nqi",
    "clhkg2kho401w03qor8m18nqi",
    "clhkg2kho400w03qor8m18nqi",
  ];
  const bookings = [];
  const menuItems = await prisma.menuItem.findMany();
  const tables = await prisma.tables.findMany();

  for (let i = 0; i < 1000; i++) {
    const dateTime = faker.date.between(
      "2023-05-01T08:00:00.000Z",
      "2023-10-31T20:00:00.000Z"
    );
    const roundedDateTime = new Date(
      Math.round(dateTime.getTime() / (30 * 60 * 1000)) * 30 * 60 * 1000
    );
    const booking = {
      name: faker.name.findName(),
      people: faker.random.number({ min: 1, max: 10 }).toString(),
      mobile: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      preorder: faker.random.boolean(),
      dateTime: roundedDateTime,
      canceled: false,
      tableId:
        tableIds[faker.random.number({ min: 0, max: tableIds.length - 1 })]!,
    };
    bookings.push(booking);
  }

  const createdBookings = await Promise.all(
    bookings.map((booking) => prisma.booking.create({ data: booking }))
  );

  const preorders = [];

  for (const booking of createdBookings) {
    const randomMenu =
      menuItems[faker.random.number({ min: 0, max: menuItems.length - 1 })];
    if (randomMenu) {
      if (booking.preorder) {
        const preorder = {
          bookingId: booking.id,
          item: randomMenu.name,
          quantity: faker.random.number({ min: 1, max: 5 }),
          price: randomMenu.price,
        };
        preorders.push(preorder);
      }
    }
  }

  await Promise.all(
    preorders.map((preorder) => prisma.preorder.create({ data: preorder }))
  );

  await prisma.$disconnect();
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

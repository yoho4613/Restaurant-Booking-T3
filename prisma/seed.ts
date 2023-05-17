import { PrismaClient } from "@prisma/client";
const faker = require("faker");
const prisma = new PrismaClient();

interface MenuItems {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  price: number;
  categories: string[];
  imageKey: string;
  active: boolean;
}

interface Tables {
  id: string;
  name: string;
  capacity: number;
  location: string;
}

async function main() {
  const days = [
    {
      id: "clhkg2ksn000m035ofzlrmqqg",
      name: "sunday",
      dayOfWeek: 0,
      openTime: "6:00",
      closeTime: "16:00",
      open: true,
    },
    {
      id: "clhkg2ksn000o035oyriu2u9x",
      name: "monday",
      dayOfWeek: 1,
      openTime: "7:00",
      closeTime: "17:00",
      open: false,
    },
    {
      id: "clhkg2kso000q035o7xsd4hwz",
      name: "tuesday",
      dayOfWeek: 2,
      openTime: "8:00",
      closeTime: "18:00",
      open: true,
    },
    {
      id: "clhkg2kso000s035oxdcc35kl",
      name: "wednesday",
      dayOfWeek: 3,
      openTime: "9:00",
      closeTime: "19:00",
      open: true,
    },
    {
      id: "clhkg2kso000u035o5fysglu1",
      name: "thursday",
      dayOfWeek: 4,
      openTime: "10:00",
      closeTime: "20:00",
      open: true,
    },
    {
      id: "clhkg2kso000w035o4kjzxh88",
      name: "friday",
      dayOfWeek: 5,
      openTime: "11:00",
      closeTime: "21:00",
      open: true,
    },
    {
      id: "clhkg2kso000y035or8m18nqi",
      name: "saturday",
      dayOfWeek: 6,
      openTime: "12:00",
      closeTime: "22:00",
      open: true,
    },
  ];

  for (const day of days) {
    await prisma.day.create({
      data: {
        id: day.id,
        name: day.name,
        dayOfWeek: day.dayOfWeek,
        openTime: day.openTime,
        closeTime: day.closeTime,
        open: day.open,
      },
    });
  }

  const menuItems: MenuItems[] = [
    {
      id: "clhkfrtab0000037n3b5nqak5",
      createdAt: new Date("2023-05-12T10:49:20.989Z"),
      updatedAt: new Date("2023-05-12T10:49:20.989Z"),
      name: "Asian Dish",
      price: 22.5,
      categories: ["breakfast"],
      imageKey: "vNqmyyeeHzuLe2BvU_Po8.jpeg",
      active: true,
    },
    {
      id: "clhkfs90l0002037niqjj16wi",
      createdAt: new Date("2023-05-12T10:49:41.376Z"),
      updatedAt: new Date("2023-05-12T10:49:41.376Z"),
      name: "Vege Salad",
      price: 24,
      categories: ["lunch"],
      imageKey: "tWxP36sBJJWnfrZuJzQdU.jpeg",
      active: true,
    },
    {
      id: "clhkfsym90004037n8afpj0kt",
      createdAt: new Date("2023-05-12T10:50:14.721Z"),
      updatedAt: new Date("2023-05-12T10:50:14.721Z"),
      name: "Big Breakfast",
      price: 24,
      categories: ["breakfast", "lunch"],
      imageKey: "M5i1TdHnMgGRGe_bWinXX.jpeg",
      active: true,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        id: item.id,
        name: item.name,
        createdAt: new Date("2023-05-12T10:50:14.721Z"),
        updatedAt: new Date("2023-05-12T10:50:14.721Z"),
        price: item.price,
        categories: item.categories,
        imageKey: item.imageKey,
        active: true,
      },
    });
  }

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

  const tables: Tables[] = [
    {
      id: "clhkg2kho412w03qor8m18nqi",
      name: "1",
      location: "bar",
      capacity: 4,
    },
    {
      id: "clhkg2kho415w03qor8m18nqi",
      name: "2",
      location: "bar",
      capacity: 4,
    },
    {
      id: "clhkg2kho410w03qor8m18nqi",
      name: "3",
      location: "bar",
      capacity: 4,
    },
    {
      id: "clhkg2kho411w03qor8m18nqi",
      name: "4",
      location: "bar",
      capacity: 4,
    },
    {
      id: "clhkg2kho413w03qor8m18nqi",
      name: "5",
      location: "Floor",
      capacity: 6,
    },
    {
      id: "clhkg2kho408w03qor8m18nqi",
      name: "6",
      location: "Floor",
      capacity: 6,
    },
    {
      id: "clhkg2kho407w03qor8m18nqi",
      name: "7",
      location: "Floor",
      capacity: 8,
    },
    {
      id: "clhkg2kho406w03qor8m18nqi",
      name: "8",
      location: "Floor",
      capacity: 8,
    },
    {
      id: "clhkg2kho405w03qor8m18nqi",
      name: "9",
      location: "Floor",
      capacity: 4,
    },
    {
      id: "clhkg2kho403w03qor8m18nqi",
      name: "10",
      location: "Floor",
      capacity: 8,
    },
    {
      id: "clhkg2kho404w03qor8m18nqi",
      name: "outside 1",
      location: "Outside",
      capacity: 4,
    },
    {
      id: "clhkg2kho402w03qor8m18nqi",
      name: "outside 2",
      location: "Outside",
      capacity: 4,
    },
    {
      id: "clhkg2kho401w03qor8m18nqi",
      name: "outside big1",
      location: "Floor",
      capacity: 8,
    },
    {
      id: "clhkg2kho400w03qor8m18nqi",
      name: "outside big2",
      location: "Floor",
      capacity: 10,
    },
  ];

  for (const table of tables) {
    await prisma.tables.create({
      data: {
        id: table.id,
        name: table.name,
        location: table.location,
        capacity: table.capacity,
      },
    });
  }

  const bookings = [];
  for (let i = 0; i < 100; i++) {
    const dateTime = faker.date.between(
      "2023-05-01T08:00:00.000Z",
      "2023-05-31T20:00:00.000Z"
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
      tableId: tableIds[faker.random.number({ min: 0, max: tableIds.length - 1})]!
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

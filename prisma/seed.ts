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

  const bookings = [];
  for (let i = 0; i < 50; i++) {
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
      canceled: faker.random.boolean(),
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

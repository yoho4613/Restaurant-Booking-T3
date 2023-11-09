# Restaurant Booking App

The Restaurant Booking App is a comprehensive solution for restaurant owners to manage their bookings, orders, payments, and administrative tasks. It provides a user-friendly interface for customers to make reservations, place orders, and make payments online. The app also includes an admin dashboard with features for managing tables, user access, opening hours, menu items, and booking lists.

## Features

- Booking Management: Customers can easily make table reservations through the app.
- Order Placement: Customers can browse the menu, select items, and place orders for dine-in or takeout.
- Payment Integration: Secure payment processing is integrated for seamless transactions.
- Admin Dashboard: A dedicated dashboard for restaurant owners to manage various aspects of the business.
  - Table Management: Add, edit, or remove tables and their configurations.
  - User Access Control: Manage user roles and permissions for staff members.
  - Opening Hours: Set and update the restaurant's opening hours.
  - Menu Items: Create, update, and delete menu items, including their descriptions and prices.
  - Booking List: View and manage the list of bookings, including details and status.

## Technologies Used

- Prisma: A modern database toolkit for working with databases in a type-safe and efficient way.
- Next.js: A React framework for building server-side rendered and static websites.
- tRPC: A TypeScript-first framework for building scalable and type-safe APIs.

## How to Use

1. Clone the repository: `git clone https://github.com/yoho4613/Restaurant-Booking-T3`
2. Install dependencies: `npm install`
3. Configure the environment variables:
   - Rename `.env.example` to `.env` and update the values according to your setup.
4. Set up the Prisma database:
   - Run database migrations: `npx prisma migrate dev`
   - Seed initial data: `npx prisma db seed`
5. Start the development server: `npm run dev`
6. Access the app in your browser at `http://localhost:3000`.

Please note that this is a sample README.md file and you may need to modify it based on your specific project structure and requirements.


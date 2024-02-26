This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


First, add .env file with following environment variables:
POSTGRES_URL=
POSTGRES_DATABASE=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_USER=

Then, pnpm install packages:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the migrations commands:

```bash
pnpm drizzle
# or
yarn drizzle
# or
pnpm drizzle
```

and

```bash
pnpm run seed
# or
yarn seed
# or
pnpm seed
```

Then, insert/update data as specified in carriers-data/db-data-*.sql files using your db editor.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Usage

## Install dependencies
```bash
npm install
```

## Create PSQL DB
Create a DB and use `.env` file to configure the connection to the DB.
The `.env` file should look like this:

```bash
DATABASE_URL="postgres://user:password@localhost:5432/db_drizzle"
```
This configuration will connect to a DB called `db_drizzle` on `localhost` using the user `user` and the password `password`.

## Run migrations
```bash
npm run migrate
```

## Start server
```bash
npm run dev
```

# Tentang Anak Pokedex API

Tentang Anak Pokedex is a backend API service that deals with CRUD in handling Pokemon monsters. Using primarily Node.js, Express.js, as well as TypeScript as its backbone language and mongoDB as its database. Moreover, the API is also using [Prisma](https://www.prisma.io/) to help establish connection with the database and [Yup](https://www.npmjs.com/package/yup) to handle query or body validation. The program will be running on port 9000 however you are able to modify in `app.ts` or add it on your `.env`. I have also intentionally attached `.env` in this repo to make it easier to run.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all the dependencies.

```bash
npm install
```
## Notes
In case any failure in connecting with the database, please create new database from [Mongo Atlas](https://www.mongodb.com/atlas/database) and copy your connection string into `DATABASE_URL` in `.env` file


## Seeding data

For the sake of smooth running program. I have created 2 seeding data that will be needed before you are able to run the program, which are `seed_monster.ts` & `seed_user.ts`.

I order to do seed the data, please follow below instruction:

```javascript
//in terminal console, make sure you are directed at pokedex directory and run: 
npx prisma db seed
```

open `package.json`, then you should find:

```javascript
//"version": "1.0.0"
"prisma": {
    "seed": "ts-node prisma/seed_monster.ts"
  },
```

Now i need you to replace `"seed": "ts-node prisma/seed_user.ts"` to `"seed": "ts-node prisma/seed_monster.ts"`

then rerun:
```javascript
//in terminal console, make sure you are directed at pokedex directory and run: 
npx prisma db seed
```

## Postman
Please download and import this [Postman](https://drive.google.com/file/d/1xscdGyrnyK4_Ns6U2OWXFsLYAw2dVqxh/view?usp=sharing) collection to run and test the API.




## Samples


#Login
<img width="1887" alt="Screen Shot 2023-12-04 at 21 38 21 pm" src="https://github.com/keyzafirstanto/pokedex/assets/82820858/adc2bdff-5bc2-487e-a90c-52842f6b7a8f">


#Index List Pokemon
<img width="1883" alt="Screen Shot 2023-12-04 at 21 38 49 pm" src="https://github.com/keyzafirstanto/pokedex/assets/82820858/2cd8c84e-3a93-4c82-ba30-deb7ea3a0d7c">


#Create Monster (Admin only)
<img width="1886" alt="Screen Shot 2023-12-04 at 21 38 58 pm" src="https://github.com/keyzafirstanto/pokedex/assets/82820858/3a880d97-9d2d-4573-ad83-058254d5354a">


#Find Detail Monster
<img width="1893" alt="Screen Shot 2023-12-04 at 21 39 05 pm" src="https://github.com/keyzafirstanto/pokedex/assets/82820858/1019060a-179d-4a3c-b4e1-4a6e871f7698">


#Update Monster (Admin only)
Case when user's not admin and tried to update monster
<img width="1881" alt="Screen Shot 2023-12-04 at 21 39 28 pm" src="https://github.com/keyzafirstanto/pokedex/assets/82820858/df21c5c2-cc0c-48cb-b573-1f5fe5272d6e">


#Delete Monster (Admin only)
<img width="1886" alt="Screen Shot 2023-12-04 at 21 39 33 pm" src="https://github.com/keyzafirstanto/pokedex/assets/82820858/0b4eee91-7391-43aa-8002-1071f240c3b9">


Thank you!!

Keyza R. Firstanto



# demo-api-rest-nodejs
This repository is a demo for working with Express.js routes, servers, and middlewares. You can build an API, handle errors, and perform data validation.

This project uses 'Single Responsibility Principle' from SOLID principles for routing. See <code>./routes/index.js</code>

## 1) Configuration
Install dependencies:
```bash
# For dev
npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D

# For prod
npm i express

# For generate fake data 
npm i @faker-js/faker

# for errors handler
npm i @hapi/boom

# for data validation
npm i joi

# for managment cors
npm i cors
```

## 2) Run application
You can run:
```bash
# for delevopment
npm run dev

# for production
npm run start
```

const express = require('express');
const { faker } = require('@faker-js/faker');
const routerApi = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

// configuration CORS (Cross-Origin Resource Sharing)
const whitelist = [
  'http://localhost:8080', "https://myapp.com"
]
const options = {
  origin: (origin, callback) => {
    if(whitelist.include(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('domain not permited'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello, my server on express');
});

app.get('/new-route', (req, res) => {
  res.send('Hello, I\'m a new route');
});

// register routes
routerApi(app);

// register middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`My port is ${port}`);
});

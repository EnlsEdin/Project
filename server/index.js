const express = require('express')
const enemies = require('./EnemyList')
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const dbo = require("./db/conn");
const logger = require('./middleware/logger')

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/enemies', require('./routes/api/enemies'));
const PORT = 3500;
app.listen(PORT, () => {
    dbo.connectToServer(function (err) {
      if (err) console.error(err);
     });
     console.log(`Server started on port ${PORT}`);
  });

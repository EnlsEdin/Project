const express = require('express')
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
const path = require("path")
__dirname = path.resolve();
app.use(express.static(path.join(__dirname,'../analyzer/build')))
app.get("*",(req,res)=>{
   res.sendFile(path.resolve(__dirname,"analyzer","build","index.html"));
})
defaultPort = 3500;
const PORT = process.env.PORT || defaultPort;
app.listen(PORT,async() => {
  await dbo.connectToServer(function(err){
    if (err) console.error(err);
   });
     console.log(`Server started on port ${PORT}`);
  });

const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);
 
let _db;
 
module.exports = {
  // connect to the database
  connectToServer: async function (callback) {
    try {
      await client.connect();
    } catch (e) {
      console.error(e);
    }
    _db = client.db("analyzer")
    return (_db === undefined ? false : true);
  },
  // get the database object
  getDb: function () {
      return _db;
  }
};
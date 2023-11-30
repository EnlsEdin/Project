const { MongoClient } = require("mongodb");
const Db = "mongodb+srv://pgkmqail:pkq20021206@cpsc2600-project.gmghotz.mongodb.net/";
const client = new MongoClient(Db);
 
let _db;
 
module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
    } catch (e) {
      console.error(e);
    }
    _db = client.db("analyzer")
    return (_db === undefined ? false : true);
  },
 
  getDb: function () {
      return _db;
  }
};
const MongoClient = require( 'mongodb' ).MongoClient;
const mongoConfig = require('./mongodbConfiguration').mongoConfiguration;

var _db;

module.exports = {
  connectToServer : async () => {
    try {
        _db  = await   MongoClient.connect( mongoConfig.dbUrl ,  { useNewUrlParser: true ,  useUnifiedTopology: true  })
    } catch (error) {
        console.log('Error Connecting MongoDB')
        throw error
    }
  },

  getDb: function() {
    return _db;
  }
};
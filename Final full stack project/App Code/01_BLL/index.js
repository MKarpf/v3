const dal = require('./../00_DAL/index');
const { DbHandler } = { ...require('./dbHandler') };

function connectDb() {
    return dal.connect();
}

function createNewDB() {
   return DbHandler.createDatabase();
}

function dropTables() {
    return DbHandler.dropAllTables();
}

module.exports = {
    connectDb,
    createNewDB,
    dropTables
}
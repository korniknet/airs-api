const sequelize = require('./dbConfig');
const User = require('../model/models');

async function dbTest() {
    try {
        await sequelize.sync();
        console.log('DB synchronized successfully ...')
    } catch (err) {
        console.error(`Got Error during synchronizing : ${err}`);
    } finally {
        await sequelize.close;
    }
};

module.exports = dbTest();
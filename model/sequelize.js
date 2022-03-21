const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

(async () => {
    // await sequelize.sync(); //如果表不存在则 建表
    await sequelize.sync({ force: true }); //如果表存在则删除表然后建表
})(); //一次同步所有模型  也可以传入{ force: true }

module.exports = sequelize
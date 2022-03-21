const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize')

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,       //主键
        autoIncrement: true,   //自增
    },
    //昵称
    username: {
        type: DataTypes.STRING,
        allowNull: false,//不允许为null
        unique: true,
    },
    //账户
    account: {
        type: DataTypes.STRING,
        allowNull: false,//不允许为null
        unique: true,
    },
    //密码
    password: {
        type: DataTypes.STRING,
        allowNull: false,//不允许为null
    },
    //状态
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,//默认值是0
    },
    create_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    //强制表名等于model名称
    freezeTableName: true,
    //去掉默认的添加时间和更新时间
    timestamps: false,
    indexes: [
        //普通索引,默认BTREE
        {
            unique: true,
            fields: ['id']
        },
    ]
})

module.exports = Users

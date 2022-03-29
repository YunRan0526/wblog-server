const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize')

const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,       //主键
        autoIncrement: true,   //自增
    },
    //文章标题
    title: {
        type: DataTypes.STRING,
        allowNull: false,//不允许为null
    },
    //文章描述
    description: {
        type: DataTypes.TEXT,
        allowNull: false,//不允许为null
    },
    //文章封面
    poster: {
        type: DataTypes.STRING,
        allowNull: false,//不允许为null
    },
    //文章内容
    content: {
        type: DataTypes.TEXT,
        allowNull: false,//不允许为null
    },
    //文章撞太
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,//默认值是0
    },
    //文章发布时间
    create_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    //强制表名等于model名称
    freezeTableName: true,
    //去掉默认的添加时间和更新时间
    timestamps: true,
    indexes: [
        //普通索引,默认BTREE
        {
            unique: true,
            fields: ['id']
        },
    ]
})

module.exports = Article

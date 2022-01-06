const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const Similarity = seq.define('similarity_info', {
    // id 会被sequelize自动创建, 管理
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PATIENT_ID1: DataTypes.STRING,
    PATIENT_ID2: DataTypes.STRING,
    SIMILARITY: DataTypes.FLOAT,
    RELATED_NODE: DataTypes.STRING,
    RELATED_NODE_TYPE: DataTypes.STRING,
}, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步    
    timestamps: false
})

// 强制同步数据库(创建数据表)
// User.sync({ force: true })
Similarity.sync()
module.exports = Similarity
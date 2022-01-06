const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const Path = seq.define('path_info', {
    // id 会被sequelize自动创建, 管理
    patient1: DataTypes.STRING,
    patient2: DataTypes.STRING,
    step: DataTypes.STRING,
    internal_node_type1: DataTypes.STRING,
    internal_node_type2: DataTypes.STRING,
    internal_node_type3: DataTypes.STRING,
    internal_node1: DataTypes.STRING,
    internal_patient1: DataTypes.STRING,
    internal_node2: DataTypes.STRING,
    internal_patient2: DataTypes.STRING,
    internal_node3: DataTypes.STRING,

}, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步    
    timestamps: false
})

// 强制同步数据库(创建数据表)
// User.sync({ force: true })
Path.sync()
module.exports = Path
const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const Physician = seq.define('physician_info', {
    // id 会被sequelize自动创建, 管理
    doctor_name: DataTypes.STRING,
    hospital_id: DataTypes.STRING,
    doctor_level: DataTypes.STRING,
    doctor_sex: DataTypes.STRING,
    doctor_title: DataTypes.STRING,
}, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步    
    timestamps: false
})

// 强制同步数据库(创建数据表)
// User.sync({ force: true })
Physician.sync()
module.exports = Physician
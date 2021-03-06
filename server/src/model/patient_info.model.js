const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const Patient = seq.define('patient_info', {
    // id 会被sequelize自动创建, 管理
    name: DataTypes.STRING,
    benefit_group_id: DataTypes.STRING,
    area_id: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.STRING,
    company: DataTypes.STRING,
    id_number: DataTypes.STRING,
    id_type: DataTypes.STRING,
    address: DataTypes.STRING,
    record_count: DataTypes.INTEGER
}, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步    
    timestamps: false
})

// 强制同步数据库(创建数据表)
// User.sync({ force: true })
Patient.sync()
module.exports = Patient
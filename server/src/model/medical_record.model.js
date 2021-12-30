const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const Record = seq.define('medical_record', {
    // id 会被sequelize自动创建, 管理
    ID: DataTypes.INTEGER,
    TIME: DataTypes.STRING,
    PATIENT_ID: DataTypes.STRING,
    PATIENT_NAME: DataTypes.STRING,
    HOSPITAL_ID: DataTypes.STRING,
    HOSPITAL_NAME: DataTypes.STRING,
    PHYSICIAN_ID: DataTypes.STRING,
    PHYSICIAN_NAME: DataTypes.STRING,
    DEPT_ID: DataTypes.STRING,
    DEPT_NAME: DataTypes.STRING,
    ADMISSION_DISEASE_ID: DataTypes.STRING,
    DISCHARGE_DISEASE_ID: DataTypes.STRING,

}, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步    
    timestamps: false
})

// 强制同步数据库(创建数据表)
// User.sync({ force: true })
Record.sync()
module.exports = Record
// const { getUserInfo } = require('../service/user.service')
const Patient = require('../model/patient_info.model')
const Record = require('../model/medical_record.model')
class PatientController {
    async fetchData(ctx, next) {
        const { id, name, type } = ctx.request.body
        console.log(id, name, type)
        var res = null
        var record = null
            // 2. 操作数据库
        if (id !== '') {
            record = await Record.findAll({ where: { PATIENT_ID: id } })
            res = await Patient.findAll({ where: { id: id } })
        } else if (name !== '') {
            res = await Patient.findAll({ where: { name: name } })
            record = await Record.findAll({ where: { PATIENT_NAME: name } })
        } else {
            res = await Patient.findAll()
            record = await Record.findAll()
        }
        // const res = await User.findAll()
        // console.log(res)
        // 3. 返回结果
        console.log(res)
        if (res) {
            ctx.body = {
                code: 0,
                message: "数据查询成功",
                data: {
                    nodeData: res,
                    recordData: record
                },
            }
        }

    }

    async login(ctx, next) {
        const { id, type } = ctx.request.body
            // 2. 操作数据库
        console.log(id, type)
        const res = await Patient.findAll({ where: { id: id } })
            // const res = await User.findAll()
            // console.log(res)
            // 3. 返回结果
        if (res) {
            ctx.body = {
                code: 0,
                message: "数据查询成功",
                data: {
                    nodeData: res
                },
            }
        }

    }
}
module.exports = new PatientController()
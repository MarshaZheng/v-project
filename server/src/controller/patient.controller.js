// const { getUserInfo } = require('../service/user.service')
const Patient = require('../model/patient_info.model')

class PatientController {
    async fetchData(ctx, next) {
        const { id, name, type } = ctx.request.body
        console.log(id, name, type)
        var res = null
            // 2. 操作数据库
        if (id !== '') {
            if (name === '') {
                res = await Patient.findAll({ where: { id: id } })
            } else {
                res = await Patient.findAll({ where: { id: id, name: name } })
            }
        } else if (name !== '') {
            res = await Patient.findAll({ where: { name: name } })
        } else {
            res = await Patient.findAll()
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
                    nodeData: res
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
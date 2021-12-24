// const { getUserInfo } = require('../service/user.service')
const Patient = require('../model/patient_info.model')

class PatientController {
    async fetchData(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body)
        const { id, type } = ctx.request.body
            // 2. 操作数据库
            // const res = await createUser(user_name, password)
            // console.log(res)
            // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: id,
                type: type,
            },
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
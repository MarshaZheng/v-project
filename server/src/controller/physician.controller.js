// const { getUserInfo } = require('../service/user.service')
const Physician = require('../model/physician_info.model')

class PhysicianController {

    async fetchData(ctx, next) {
        const { id, name, type } = ctx.request.body
        console.log(id, name, type)
        var res = null
            // 2. 操作数据库
        if (id !== '') {
            if (name === '') {
                res = await Physician.findAll({ where: { id: id } })
            } else {
                res = await Physician.findAll({ where: { id: id, doctor_name: name } })
            }
        } else if (name !== '') {
            res = await Physician.findAll({ where: { doctor_name: name } })
        } else {
            res = await Physician.findAll()
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
}
module.exports = new PhysicianController()
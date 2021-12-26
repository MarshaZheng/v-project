// const { getUserInfo } = require('../service/user.service')
const Physician = require('../model/physician_info.model')
const Record = require('../model/medical_record.model')
class PhysicianController {

    async fetchData(ctx, next) {
        const { id, name, type } = ctx.request.body
        console.log(id, name, type)
        var res = null
        var record = null
            // 2. 操作数据库
        if (id !== '') {
            record = await Record.findAll({ where: { PHYSICIAN_ID: id } })
            res = await Physician.findAll({ where: { id: id } })
        } else if (name !== '') {
            res = await Physician.findAll({ where: { doctor_name: name } })
            record = await Record.findAll({ where: { PHYSICIAN_NAME: name } })
        } else {
            res = await Physician.findAll()
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
}
module.exports = new PhysicianController()
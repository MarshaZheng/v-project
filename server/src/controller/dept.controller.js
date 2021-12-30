const Record = require('../model/medical_record.model')
class HospitalController {

    async fetchData(ctx, next) {
        const { id, name, type } = ctx.request.body
        console.log(id, name, type)
        var record = null
            // 2. 操作数据库
        if (id !== '') {
            record = await Record.findAll({ where: { DEPT_ID: id } })

        } else if (name !== '') {
            record = await Record.findAll({ where: { DEPT_NAME: name } })
        } else {
            record = await Record.findAll()
        }
        // const res = await User.findAll()
        // console.log(res)
        // 3. 返回结果
        if (record) {
            ctx.body = {
                code: 0,
                message: "数据查询成功",
                data: {
                    nodeData: null,
                    recordData: record
                },
            }
        }

    }
}
module.exports = new HospitalController()
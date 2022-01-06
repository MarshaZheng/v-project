// const { getUserInfo } = require('../service/user.service')
const Patient = require('../model/patient_info.model')
const Record = require('../model/medical_record.model')
class PatientController {
    async fetchData(ctx, next) {
        const { id, name, type } = ctx.request.body
        console.log(id, name, type)
        var res = null
        var record = null
        var graph = {
                rootId: '',
                nodes: [],
                links: []
            }
            // 2. 操作数据库
        if (id !== '') {
            record = await Record.findAll({ where: { PATIENT_ID: id }, raw: true })
            graph.rootId = 'PATIENT_ID' + id
            graph.nodes.push({ id: 'PATIENT_ID' + id, text: id, data: { id: id, type: 'PATIENT_ID' } })
            res = await Patient.findAll({ where: { id: id }, raw: true })
        } else if (name !== '') {
            res = await Patient.findAll({ where: { name: name }, raw: true })
            graph.rootId = 'PATIENT_ID' + res[0]['id']
            for (var i = 0; i < res.length; i++) {
                graph.nodes.push({ id: 'PATIENT_ID' + res[i]['id'], text: res[i]['id'], data: { id: res[i]['id'], type: 'PATIENT_ID' } })
            }
            record = await Record.findAll({ where: { PATIENT_NAME: name }, raw: true })
        } else {
            res = await Patient.findAll({ raw: true })
            graph.rootId = 'PATIENT_ID' + res[0]['id']
            for (var i = 0; i < res.length; i++) {
                graph.nodes.push({ id: 'PATIENT_ID' + res[i]['id'], text: res[i]['id'], data: { id: res[i]['id'], type: 'PATIENT_ID' } })
            }
            record = await Record.findAll({ raw: true })
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
                    recordData: record,
                    graphData: graph
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
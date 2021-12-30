const Record = require('../model/medical_record.model')
const Patient = require('../model/patient_info.model')
const Physician = require('../model/physician_info.model')
const { Op } = require("sequelize")
class AlgorithmController {
    async nodeSimilarity(ctx, next) {
        var { root_node, nodes, type } = ctx.request.body
        if (nodes.length === 0 || nodes === '') { //需要自己找相似节点
            nodes = [2, 3, 4]
        }

        var res = await Patient.findAll({
                where: {
                    id: {
                        [Op.or]: nodes
                    }
                }
            })
            //需要计算这几个节点的相似度，并加入到属性信息里
        let arry = res
        let arryNew = []
        var alpha = 0.95
        arry.map((item, index) => {
            arryNew.push(Object.assign({}, item['dataValues'], { similarity: alpha }))
            alpha = alpha * 0.95
        })
        var graph = {
            rootId: '1',
            nodes: [
                { id: '1', text: '1' },
                { id: '2', text: '2', color: '#43a2f1' },
                { id: '3', text: '3', width: 80, height: 80 },
                { id: '4', text: '4', width: 150, height: 150 }
            ],
            links: [
                { from: '1', to: '2', text: '关系1', color: '#43a2f1' },
                { from: '1', to: '3', text: '关系2' },
                { from: '1', to: '4', text: '关系3' },
                { from: '2', to: '4', color: '#67C23A' }
            ]
        }
        console.log('arryNew', arryNew)
        if (arryNew) {
            ctx.body = {
                code: 0,
                message: "节点相似算法计算成功",
                data: {
                    nodeData: arryNew,
                    graphData: graph
                },
            }
        }
    }
    async communityDiscovery(ctx, next) {
        var { nodes, type } = ctx.request.body
        if (nodes.length === 0) { //需要自己找节点
            nodes = [2, 3, 4]
        }
        var res = await Patient.findAll({
            where: {
                id: {
                    [Op.or]: nodes
                }
            }
        })
        var graph = {
            rootId: '1',
            nodes: [
                { id: '1', text: '1', borderColor: 'yellow' },
                { id: '2', text: '2', color: '#43a2f1', fontColor: 'yellow' },
                { id: '3', text: '3', nodeShape: 1, width: 80, height: 60 },
                { id: '4', text: '4', nodeShape: 0, width: 150, height: 150 }
            ],
            links: [
                { from: '1', to: '2', text: '关系1', color: '#43a2f1' },
                { from: '1', to: '3', text: '关系2' },
                { from: '1', to: '4', text: '关系3' },
                { from: '2', to: '4', color: '#67C23A' }
            ]
        }
        if (res) {
            ctx.body = {
                code: 0,
                message: "社区发现算法计算成功",
                data: {
                    nodeData: res,
                    graphData: graph
                },
            }
        }
    }
    async relativePath(ctx, next) {
        var { nodes, type } = ctx.request.body
        if (nodes.length === 0) { //需要自己找节点
            nodes = [2, 3]
        }
        nodes.sort()
        var res = await Patient.findAll({
            where: {
                id: {
                    [Op.or]: nodes
                }
            }
        })
        var record1 = await Record.findAll({
            where: {
                PATIENT_ID: nodes[0]
            }
        })
        var record2 = await Record.findAll({
            where: {
                PATIENT_ID: nodes[1]
            }
        })
        var path = [{ step: 'step1', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '91795119', internal_patient1: '', internal_node2: '', internal_patient2: '', internal_node3: '' },
            { step: 'step1', internal_node_type: 'dept_id', patient1: '52270981', patient2: '47773074', internal_node1: '33165257', internal_patient1: '', internal_node2: '', internal_patient2: '', internal_node3: '' },
            { step: 'step1', internal_node_type: 'HOSPITAL_ID', patient1: '52270981', patient2: '47773074', internal_node1: '97273705', internal_patient1: '', internal_node2: '', internal_patient2: '', internal_node3: '' },
            { step: 'step2', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '91795119', internal_patient1: '19715103', internal_node2: '73365176', internal_patient2: '', internal_node3: '' },
            { step: 'step2', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '91795119', internal_patient1: '26795645', internal_node2: '73365176', internal_patient2: '', internal_node3: '' },
            { step: 'step2', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '91795119', internal_patient1: '44750953', internal_node2: '73365176', internal_patient2: '', internal_node3: '' },
            { step: 'step2', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '91795119', internal_patient1: '71254731', internal_node2: '73365176', internal_patient2: '', internal_node3: '' },
            { step: 'step2', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '91795119', internal_patient1: '85685040', internal_node2: '73365176', internal_patient2: '', internal_node3: '' },
            { step: 'step2', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '91795119', internal_patient1: '49845795', internal_node2: '73365176', internal_patient2: '', internal_node3: '' },
            { step: 'step3', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '27834695', internal_patient1: '54429128', internal_node2: '93545539', internal_patient2: '25195975', internal_node3: '56874067' },
            { step: 'step3', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '27834695', internal_patient1: '90861324', internal_node2: '93545539', internal_patient2: '65499577', internal_node3: '56874067' },
            { step: 'step3', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '27834695', internal_patient1: '30475840', internal_node2: '93545539', internal_patient2: '54157757', internal_node3: '56874067' },
            { step: 'step3', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '27834695', internal_patient1: '21796758', internal_node2: '93545539', internal_patient2: '91547423', internal_node3: '56874067' },
            { step: 'step3', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '27834695', internal_patient1: '46328399', internal_node2: '93545539', internal_patient2: '72817308', internal_node3: '56874067' },
            { step: 'step3', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '27834695', internal_patient1: '15839280', internal_node2: '93545539', internal_patient2: '41946673', internal_node3: '56874067' },
            { step: 'step3', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '27834695', internal_patient1: '37557580', internal_node2: '93545539', internal_patient2: '93104498', internal_node3: '56874067' },
            { step: 'step3', internal_node_type: 'PHYSICIAN_ID', patient1: '52270981', patient2: '47773074', internal_node1: '27834695', internal_patient1: '57709211', internal_node2: '93545539', internal_patient2: '89215236', internal_node3: '56874067' }
        ]
        var graph = {
            rootId: '1',
            nodes: [
                { id: '1', name: 'xxx', node_type: 'PATIENT_ID', color: '#1E90FF', data: { node_type: 'PATIENT_ID', node_id: '52270981', name: 'xxx', sex: '男', birth: '1986/08/27', benefit_type: '1', benefit_group_id: '68.0', area_id: '0.6', id_type: '17', id_number: 'xxxxxxxxx', company: '金华居民医保虚拟单位', address: '金华市' } },
                { id: '2', name: 'xxx', node_type: 'PATIENT_ID', color: '#1E91FF', data: { node_type: 'PATIENT_ID', node_id: '47773074', name: 'xxx', sex: '男', birth: '1986/08/27', benefit_type: '1', benefit_group_id: '68.0', area_id: '0.6', id_type: '17', id_number: 'xxxxxxxxx', company: '金华居民医保虚拟单位', address: '金华市' } },
                { id: '3', name: 'xxx', node_type: 'PHYSICIAN_ID', color: '#900000' },
                { id: '4', name: 'xxx', node_type: 'PHYSICIAN_ID', color: '#90EE91' },
                { id: '5', name: 'xxx', node_type: 'PHYSICIAN_ID', color: '#90EE92' }
            ],
            links: [

                { from: '1', to: '3' },
                { from: '3', to: '4' },
                { from: '3', to: '5' },
                { from: '4', to: '2' },
                { from: '5', to: '2' }
            ]
        }
        if (res) {
            ctx.body = {
                code: 0,
                message: "关联路径算法计算成功",
                data: {
                    nodeData: res,
                    recordData1: record1,
                    recordData2: record2,
                    pathData: path,
                    graphData: graph
                },
            }
        }
    }
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
module.exports = new AlgorithmController()
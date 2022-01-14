const Record = require('../model/medical_record.model')
const Patient = require('../model/patient_info.model')
const Physician = require('../model/physician_info.model')
const Path = require('../model/path_info.model')
const Similarity = require('../model/similarity_info.model')
const Community = require('../model/community_info.model')
const Dept = require('../model/dept_info.model')
const { Op } = require("sequelize")
const Hospital = require('../model/hospital_info.model')
class AlgorithmController {
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
        var path = []
        var graph = {
            rootId: '1',
            nodes: [],
            links: []
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
    async expandNode(ctx, next) {
        const { id, type, expand_type } = ctx.request.body
        console.log(id, type, expand_type)
        var color = { 'root': '#F56C6C', 'PATIENT_ID': '#67C23A', 'HOSPITAL_ID': '#43a2f1', 'PHYSICIAN_ID': '#E6A23C', 'DEPT_ID': '#909399' }
        var graph = {
            rootId: type + id,
            nodes: [],
            links: []
        }

        if (type === 'PATIENT_ID') {
            var result = await Record.findAll({ where: { PATIENT_ID: id }, attributes: [expand_type], raw: true })
        } else if (type === 'PHYSICIAN_ID') {

            var result = await Record.findAll({ where: { PHYSICIAN_ID: id }, attributes: [expand_type], raw: true })

        } else if (type === 'DEPT_ID') {

            var result = await Record.findAll({ where: { DEPT_ID: id }, attributes: [expand_type], raw: true })

        } else if (type === 'HOSPITAL_ID') {
            var result = await Record.findAll({ where: { HOSPITAL_ID: id }, attributes: [expand_type], raw: true })

        }
        console.log(result)
        var res = [];
        var obj = {};
        for (var i = 0; i < result.length; i++) {
            if (!obj[result[i][expand_type]]) {
                res.push(result[i]);
                obj[result[i][expand_type]] = true;
            }
        }
        console.log(res)
        if (res) {
            for (var i = 0; i < res.length; i++) {
                graph.nodes.push({ id: expand_type + res[i][expand_type], text: res[i][expand_type], color: color[expand_type], data: { id: res[i][expand_type], type: expand_type } })
                graph.links.push({ from: type + id, to: expand_type + res[i][expand_type] })
            }

        }
        if (graph) {
            ctx.body = {
                code: 0,
                message: "展开关联节点成功",
                data: {
                    graphData: graph
                },
            }
        }
    }
    async nodeSimilarity(ctx, next) {
        var { root_node, nodes, type } = ctx.request.body
        var sim_result = null
        console.log('node similarity', root_node, nodes, type)
        if (nodes === undefined || nodes === '' || nodes === []) { //需要自己找相似节点
            console.log('0000')
            sim_result = await Similarity.findAll({ where: { PATIENT_ID1: root_node }, raw: true })
            console.log('simialrity result', sim_result)
            nodes = []
            for (var i = 0; i < sim_result.length; i++) {
                nodes.push(sim_result[i]['PATIENT_ID2'])
            }
            console.log('nodes', nodes)
        } else {
            sim_result = await Similarity.findAll({
                where: {
                    PATIENT_ID1: root_node,
                    PATIENT_ID2: {
                        [Op.or]: nodes
                    }
                },
                raw: true
            })
        }
        var res = await Patient.findAll({
                where: {
                    id: {
                        [Op.or]: nodes
                    }
                },
                raw: true
            })
            //需要查找这几个节点的相似度，并加入到属性信息里
        let arry = res
        let arryNew = []
        for (let item of arry) {
            console.log(item)
            let result = await Similarity.findOne({ where: { PATIENT_ID1: root_node, PATIENT_ID2: item['id'] }, raw: true })
            if (result) {
                arryNew.push(Object.assign({}, item, { similarity: result['SIMILARITY'] }))
            }

        }


        var color = { 'root': '#F56C6C', 'PATIENT_ID': '#67C23A', 'HOSPITAL_ID': '#43a2f1', 'PHYSICIAN_ID': '#E6A23C', 'DEPT_ID': '#909399' }


        var graph = {
            rootId: '',
            nodes: [],
            links: []
        }
        graph['rootId'] = root_node
        graph['nodes'].push({ id: 'PATIENT_ID' + root_node, text: root_node, color: color['root'], data: { id: root_node, type: 'PATIENT_ID' } })
        for (var i = 0; i < sim_result.length; i++) {
            var size = sim_result[i]['SIMILARITY'] * 80
            graph['nodes'].push({ id: 'PATIENT_ID' + sim_result[i]['PATIENT_ID2'], text: sim_result[i]['PATIENT_ID2'], color: color['PATIENT_ID'], width: size, height: size, data: { id: sim_result[i]['PATIENT_ID2'], type: 'PATIENT_ID' } })
            graph.nodes.push({ id: sim_result[i]['RELATED_NODE_TYPE'] + sim_result[i]['RELATED_NODE'], text: sim_result[i]['RELATED_NODE'], color: color[sim_result[i]['RELATED_NODE_TYPE']], data: { id: sim_result[i]['RELATED_NODE'], type: sim_result[i]['RELATED_NODE_TYPE'] } })
            graph.links.push({ from: sim_result[i]['RELATED_NODE_TYPE'] + sim_result[i]['RELATED_NODE'], to: 'PATIENT_ID' + sim_result[i]['PATIENT_ID2'], text: sim_result[i]['SIMILARITY'] })
            graph.links.push({ from: 'PATIENT_ID' + root_node, to: sim_result[i]['RELATED_NODE_TYPE'] + sim_result[i]['RELATED_NODE'] })
                // if (sim_result[i]['RELATED_NODE_TYPE'] === 'PHYSICIAN_ID') {
                //     graph.nodes.push({ id: 'PHYSICIAN' + sim_result[i]['RELATED_NODE'], text: sim_result[i]['RELATED_NODE'], color: '#E6A23C' })
                //     graph.links.push({ from: 'PHYSICIAN' + sim_result[i]['RELATED_NODE'], to: 'PATIENT_ID' + sim_result[i]['PATIENT_ID2'], text: sim_result[i]['SIMILARITY'] })
                //     graph.links.push({ from: 'PATIENT_ID' + root_node, to: 'PHYSICIAN' + sim_result[i]['RELATED_NODE'] })
                // }
                // if (sim_result[i]['RELATED_NODE_TYPE'] === 'HOSPITAL_ID') {
                //     graph.nodes.push({ id: 'HOSPITAL' + sim_result[i]['RELATED_NODE'], text: sim_result[i]['RELATED_NODE'], color: '#43a2f1' })
                //     graph.links.push({ from: 'HOSPITAL' + sim_result[i]['RELATED_NODE'], to: 'PATIENT_ID' + sim_result[i]['PATIENT_ID2'], text: sim_result[i]['SIMILARITY'] })
                //     graph.links.push({ from: 'PATIENT_ID' + root_node, to: 'HOSPITAL' + sim_result[i]['RELATED_NODE'] })
                // }
                // if (sim_result[i]['RELATED_NODE_TYPE'] === 'DEPT_ID') {
                //     graph.nodes.push({ id: 'DEPT' + sim_result[i]['RELATED_NODE'], text: sim_result[i]['RELATED_NODE'], color: '#909399' })
                //     graph.links.push({ from: 'DEPT' + sim_result[i]['RELATED_NODE'], to: 'PATIENT_ID' + sim_result[i]['PATIENT_ID2'], text: sim_result[i]['SIMILARITY'] })
                //     graph.links.push({ from: 'PATIENT_ID' + root_node, to: 'DEPT' + sim_result[i]['RELATED_NODE'] })
                // }

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
        var result = null
        var sorted_nodes = []
        if (nodes === undefined || nodes === '' || nodes === []) { //需要自己找社区节点
            result = await Community.findAll({ raw: true })
        } else if (nodes.length == 1) {
            var res = await Community.findOne({ where: { PATIENT_ID: nodes }, raw: true })
            result = await Community.findAll({ where: { COMMUNITY_ID: res['COMMUNITY_ID'] }, raw: true })
        } else {
            result = await Community.findAll({
                where: {
                    PATIENT_ID: {
                        [Op.or]: nodes
                    }
                },
                raw: true
            })
        }

        function sortBy(field) {
            return function(a, b) {
                return a[field] - b[field]
            }
        }
        result.sort(sortBy("COMMUNITY_ID"))
        console.log('community result', result)
        nodes = []
        var pre_community_id = '0'
        for (var i = 0; i < result.length; i++) {
            nodes.push(result[i]['PATIENT_ID'])
            if (result[i]['COMMUNITY_ID'] !== pre_community_id) {
                sorted_nodes.push([nodes[i]])
                pre_community_id = result[i]['COMMUNITY_ID']
            } else {
                sorted_nodes[sorted_nodes.length - 1].push(nodes[i])
            }

        }
        console.log('nodes', nodes)
        console.log('sorted_nodes', sorted_nodes)
            //现在相同社区的节点是在一个数组，sorted——nodes是二维数组

        var res = await Patient.findAll({
            where: {
                id: {
                    [Op.or]: nodes
                }
            },
            raw: true
        })
        let arry = res
        let arryNew = []
        for (let item of arry) {
            console.log(item)
            let result = await Community.findOne({ where: { PATIENT_ID: item['id'] }, raw: true })
            arryNew.push(Object.assign({}, item, { community_id: result['COMMUNITY_ID'] }))
        }
        var graph = {
            rootId: type + sorted_nodes[0][0],
            nodes: [],
            links: []
        }

        //根据sorted_nodes构建图
        var color = { 'root': '#F56C6C', 'PATIENT_ID': '#67C23A', 'HOSPITAL_ID': '#43a2f1', 'PHYSICIAN_ID': '#E6A23C', 'DEPT_ID': '#909399' }
        var community_color = ['#FF6666', '#FFFF00', '#006699', '#FF6600', '#FF9966', '#339933', '#FFCC33', '#99CC33', '#0099CC']
        for (var k = 0; k < sorted_nodes.length; k++) {
            for (var i = 0; i < sorted_nodes[k].length; i++) {
                graph.nodes.push({ id: type + sorted_nodes[k][i], text: sorted_nodes[k][i], color: community_color[k], data: { id: sorted_nodes[k][i], type: type } })
                for (var j = i + 1; j < sorted_nodes[k].length; j++) {
                    var res = await Path.findOne({ where: { patient1: sorted_nodes[k][i], patient2: sorted_nodes[k][j], step: 'step1' }, raw: true }) //有一阶关系才连线
                    console.log('一接关系查询结果', res)
                    if (res) {
                        graph.links.push({ from: type + sorted_nodes[k][i], to: type + sorted_nodes[k][j] })
                    }
                }
            }
        }
        if (arryNew) {
            ctx.body = {
                code: 0,
                message: "社区发现算法计算成功",
                data: {
                    nodeData: arryNew,
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
        var path = []
        var graph = {
            rootId: '1',
            nodes: [],
            links: []
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
    async getPathData(ctx, next) {
        const { nodes, step, type1, type2, type3 } = ctx.request.body
        console.log(step, type1, type2, type3)
        var path = null
        var graph = {
            rootId: '',
            nodes: [],
            links: []
        }
        var color = { 'root': '#F56C6C', 'PATIENT_ID': '#67C23A', 'HOSPITAL_ID': '#43a2f1', 'PHYSICIAN_ID': '#E6A23C', 'DEPT_ID': '#909399' }

        if (step === 'step1') {
            if (type1 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type1: type1 } })
            } else {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step } })
            }
            if (path.length > 0) {
                graph.rootId = nodes[0]
                graph.nodes.push({ id: 'PATIENT_ID' + nodes[0], text: nodes[0], color: color['root'], data: { id: nodes[0], type: 'PATIENT_ID' } })
                graph.nodes.push({ id: 'PATIENT_ID' + nodes[1], text: nodes[1], color: color['root'], data: { id: nodes[1], type: 'PATIENT_ID' } })
                console.log(path)
                for (var record of path) {
                    console.log(record)
                    graph.nodes.push({ id: record['internal_node_type1'] + record['internal_node1'], text: record['internal_node1'], color: color[record['internal_node_type1']], data: { id: record['internal_node1'], type: record['internal_node_type1'] } })
                    graph.links.push({ from: 'PATIENT_ID' + record['patient1'], to: record['internal_node_type1'] + record['internal_node1'] })
                    graph.links.push({ from: record['internal_node_type1'] + record['internal_node1'], to: 'PATIENT_ID' + record['patient2'] })
                }
            }

        } else if (step === 'step2') {
            if (type1 !== '' && type2 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type1: type1, internal_node_type2: type2 } })
            } else if (type1 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type1: type1 } })
            } else if (type2 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type2: type2 } })
            } else {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step } })
            }

            if (path.length > 0) {
                graph.rootId = nodes[0]
                graph.nodes.push({ id: 'PATIENT_ID' + nodes[0], text: nodes[0], color: color['root'], data: { id: nodes[0], type: 'PATIENT_ID' } })
                graph.nodes.push({ id: 'PATIENT_ID' + nodes[1], text: nodes[1], color: color['root'], data: { id: nodes[1], type: 'PATIENT_ID' } })
                console.log(path)
                for (var record of path) {
                    console.log(record)
                    graph.nodes.push({ id: 'PATIENT_ID' + record['internal_patient1'], text: record['internal_patient1'], color: color['PATIENT_ID'], data: { id: record['internal_patient1'], type: 'PATIENT_ID' } })
                    graph.nodes.push({ id: record['internal_node_type1'] + record['internal_node1'], text: record['internal_node1'], color: color[record['internal_node_type1']], data: { id: record['internal_node1'], type: record['internal_node_type1'] } })
                    graph.nodes.push({ id: record['internal_node_type2'] + record['internal_node2'], text: record['internal_node2'], color: color[record['internal_node_type2']], data: { id: record['internal_node2'], type: record['internal_node_type2'] } })
                    graph.links.push({ from: 'PATIENT_ID' + record['patient1'], to: record['internal_node_type1'] + record['internal_node1'] })
                    graph.links.push({ from: record['internal_node_type1'] + record['internal_node1'], to: 'PATIENT_ID' + record['internal_patient1'] })
                    graph.links.push({ from: 'PATIENT_ID' + record['internal_patient1'], to: record['internal_node_type2'] + record['internal_node2'] })
                    graph.links.push({ from: record['internal_node_type2'] + record['internal_node2'], to: 'PATIENT_ID' + record['patient2'] })
                }
            }

        } else {
            if (type1 !== '' && type2 !== '' && type3 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type1: type1, internal_node_type2: type2, internal_node_type3: type3 }, raw: true })
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type1: type1, internal_node_type2: type2 } })
            } else if (type1 !== '' && type2 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type1: type1, internal_node_type2: type2 } })
            } else if (type1 !== '' && type3 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type1: type1, internal_node_type3: type3 } })
            } else if (type2 !== '' && type3 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type2: type2, internal_node_type3: type3 } })
            } else if (type3 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type3: type3 } })
            } else if (type1 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type1: type1 } })
            } else if (type2 !== '') {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step, internal_node_type2: type2 } })
            } else {
                path = await Path.findAll({ where: { patient1: nodes[0], patient2: nodes[1], step: step } })
            }

            if (path.length > 0) {
                graph.rootId = nodes[0]
                graph.nodes.push({ id: 'PATIENT_ID' + nodes[0], text: nodes[0], color: color['root'], data: { id: nodes[0], type: 'PATIENT_ID' } })
                graph.nodes.push({ id: 'PATIENT_ID' + nodes[1], text: nodes[1], color: color['root'], data: { id: nodes[1], type: 'PATIENT_ID' } })
                console.log(path)
                for (var record of path) {
                    console.log(record)
                    graph.nodes.push({ id: 'PATIENT_ID' + record['internal_patient1'], text: record['internal_patient1'], color: color['PATIENT_ID'], data: { id: record['internal_patient1'], type: 'PATIENT_ID' } })
                    graph.nodes.push({ id: 'PATIENT_ID' + record['internal_patient2'], text: record['internal_patient2'], color: color['PATIENT_ID'], data: { id: record['internal_patient2'], type: 'PATIENT_ID' } })
                    graph.nodes.push({ id: record['internal_node_type1'] + record['internal_node1'], text: record['internal_node1'], color: color[record['internal_node_type1']], data: { id: record['internal_node1'], type: record['internal_node_type1'] } })
                    graph.nodes.push({ id: record['internal_node_type2'] + record['internal_node2'], text: record['internal_node2'], color: color[record['internal_node_type2']], data: { id: record['internal_node2'], type: record['internal_node_type2'] } })
                    graph.nodes.push({ id: record['internal_node_type3'] + record['internal_node3'], text: record['internal_node3'], color: color[record['internal_node_type3']], data: { id: record['internal_node3'], type: record['internal_node_type3'] } })
                    graph.links.push({ from: 'PATIENT_ID' + record['patient1'], to: record['internal_node_type1'] + record['internal_node1'] })
                    graph.links.push({ from: record['internal_node_type1'] + record['internal_node1'], to: 'PATIENT_ID' + record['internal_patient1'] })
                    graph.links.push({ from: 'PATIENT_ID' + record['internal_patient1'], to: record['internal_node_type2'] + record['internal_node2'] })
                    graph.links.push({ from: record['internal_node_type2'] + record['internal_node2'], to: 'PATIENT_ID' + record['internal_patient2'] })
                    graph.links.push({ from: 'PATIENT_ID' + record['internal_patient2'], to: record['internal_node_type3'] + record['internal_node3'] })
                    graph.links.push({ from: record['internal_node_type3'] + record['internal_node3'], to: 'PATIENT_ID' + record['patient2'] })
                }
            }
        }
        if (path) {
            ctx.body = {
                code: 0,
                message: "关联路径筛选成功",
                data: {
                    pathData: path,
                    graphData: graph
                },
            }
        }
    }
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
        var color = { 'root': '#F56C6C', 'PATIENT_ID': '#67C23A', 'HOSPITAL_ID': '#43a2f1', 'PHYSICIAN_ID': '#E6A23C', 'DEPT_ID': '#909399' }
        if (id !== '') {
            //有id就直接查id
            if (type === 'PATIENT_ID') {
                res = await Patient.findAll({ where: { id: id }, raw: true })
                record = await Record.findAll({ where: { PATIENT_ID: id }, raw: true })
            } else if (type === 'PHYSICIAN_ID') {
                res = await Physician.findAll({ where: { id: id }, raw: true })
                record = await Record.findAll({ where: { PHYSICIAN_ID: id }, raw: true })
            } else if (type === 'HOSPITAL_ID') {
                res = await Hospital.findAll({ where: { id: id }, raw: true })
                record = await Record.findAll({ where: { HOSPITAL_ID: id }, raw: true })
            } else {
                res = await Dept.findAll({ where: { id: id }, raw: true })
                record = await Record.findAll({ where: { DEPT_ID: id }, raw: true })
            }
        } else if (name !== '') {
            if (type === 'PATIENT_ID') {
                res = await Patient.findAll({ where: { name: name }, raw: true })
                record = await Record.findAll({ where: { PATIENT_NAME: name }, raw: true })
            } else if (type === 'PHYSICIAN_ID') {
                res = await Physician.findAll({ where: { doctor_name: name }, raw: true })
                record = await Record.findAll({ where: { PHYSICIAN_NAME: name }, raw: true })
            } else if (type === 'HOSPITAL_ID') {
                res = await Hospital.findAll({ where: { name: name }, raw: true })
                record = await Record.findAll({ where: { HOSPITAL_NAME: name }, raw: true })
            } else {
                res = await Dept.findAll({ where: { name: name }, raw: true })
                record = await Record.findAll({ where: { DEPT_NAME: name }, raw: true })
            }
        } else {
            if (type === 'PATIENT_ID') {
                res = await Patient.findAll({ raw: true })
            } else if (type === 'PHYSICIAN_ID') {
                res = await Physician.findAll({ raw: true })
            } else if (type === 'HOSPITAL_ID') {
                res = await Hospital.findAll({ raw: true })
            } else {
                res = await Dept.findAll({ raw: true })
            }
            record = await Record.findAll({ raw: true })
        }
        graph.rootId = type + res[0]['id']
        for (var i = 0; i < record.length; i++) {
            graph.nodes.push({ id: type + record[i][type], text: record[i][type], color: color[type], data: { id: record[i][type], type: type } })
        }
        // const res = await User.findAll()
        // console.log(res)
        // 3. 返回结果
        console.log(res)
        if (record) {
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
}
module.exports = new AlgorithmController()
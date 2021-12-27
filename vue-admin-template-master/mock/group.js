const Mock = require('mockjs')
const fs = require('fs')
const JSON5 = require('json5')
const path = require('path')


const nodeData = Mock.mock({
    'items': [{
        node_id: '65963072',
        name: 'xxx',
        sex: '男',
        birth: '1986/08/27',
        benefit_type: '1',
        benefit_group_id: '68.0',
        area_id: '0.6',
        id_type: '17',
        id_number: 'xxxxxxxxx',
        company: '金华居民医保虚拟单位',
        address: '金华市'
    }]
})
const record = Mock.mock({
    'items|10': [{
        id: '@id',
        time: '@date()',
        HOSPITAL_ID: '93545539',
        HOSPITAL_NAME: 'xxxxx',
        PYSICIAN_ID: '@integer(50000000,80000000)',
        PYSICIAN_NAME: 'xxx',
        dept_id: '48000667',
        DEPT_NAME: 'xxx',
        ADMISSION_DISEASE_ID: 'e@integer(50000,80000)',
        DISCHARGE_DISEASE_ID: 'k@integer(50000,80000)'
    }]
})
const sim_node = Mock.mock({
    'items|20': [{
        node_id: '@integer(50000000,80000000)',
        name: 'xxx',
        'sex|1': ['女', '男'],
        birth: '@date()',
        benefit_type: '1',
        benefit_group_id: '68.0',
        area_id: '0.6',
        id_type: '17',
        id_number: 'xxxxxxxxx',
        company: '金华居民医保虚拟单位',
        address: '金华市金东区'
    }]
})
var gr = fs.readFileSync(path.join(__dirname, './group.json5'), 'utf-8')
const groups = JSON5.parse(gr)
module.exports = [{
    url: '/vue-admin-template/group/list',
    type: 'post',
    response: config => {
        const node = nodeData.items
        const records = record.items
        const sim_nodes = sim_node.items
        const group = groups.items
            // const path_graph = path_graphData.items
        return {
            code: 20000,
            data: {
                node: node,
                records: records,
                sim_nodes: sim_nodes,
                group: group,
                // path_graph: path_graph
            }
        }
    }
}]
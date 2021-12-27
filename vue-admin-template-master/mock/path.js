const Mock = require('mockjs')
const fs = require('fs')
const JSON5 = require('json5')
const path = require('path')

const nodesData = Mock.mock({
    'items': [{
            node_id: '41061500',
            name: 'xxx',
            sex: '男',
            birth: '1978/11/20',
            benefit_type: '1',
            benefit_group_id: '68.0',
            area_id: '0.6',
            id_type: '17',
            id_number: 'xxxxxxxxx',
            company: '金华居民医保虚拟单位',
            address: '金华市'
        },
        {
            node_id: '32286529',
            name: 'xxx',
            sex: '女',
            birth: '1990/04/10',
            benefit_type: '1',
            benefit_group_id: '68.0',
            area_id: '0.6',
            id_type: '17',
            id_number: 'xxxxxxxxx',
            company: '金华居民医保虚拟单位',
            address: '金华市'
        }
    ]
})



var pd = fs.readFileSync(path.join(__dirname, './pathData.json5'), 'utf-8')
const pathData = JSON5.parse(pd)
var pg = fs.readFileSync(path.join(__dirname, './pathGraph.json5'), 'utf-8')
const path_graphData = JSON5.parse(pg)
module.exports = [{
    url: '/vue-admin-template/path/list',
    type: 'post',
    response: config => {
        const node = nodesData.items
        const path = pathData.items
        const path_graph = path_graphData.items
        return {
            code: 20000,
            data: {
                nodes: node,
                path: path,
                path_graph: path_graph
            }
        }
    }
}]
import request from '@/utils/request'

export function getList(query) {
    return request({
        url: '/vue-admin-template/node/list',
        method: 'get',
        params: query
    })
}
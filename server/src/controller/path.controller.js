// const { getUserInfo } = require('../service/user.service')

const Path = require('../model/path_info.model')
class PathController {

    async fetchData(ctx, next) {
        const { id, name, type } = ctx.request.body
        console.log(id, name, type)
        var path = null
        var graph = null
            // 2. 操作数据库

        // const res = await User.findAll()
        // console.log(res)
        // 3. 返回结果
        console.log(res)
        if (res) {
            ctx.body = {
                code: 0,
                message: "数据查询成功",
                data: {
                    pathData: null,
                    graphData: null
                },
            }
        }

    }
}
module.exports = new HospitalController()
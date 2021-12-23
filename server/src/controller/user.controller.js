// const { createUser } = require('../service/user.service')

class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body)
        const { id, type } = ctx.request.body
            // 2. 操作数据库
            // const res = await createUser(user_name, password)
            // console.log(res)
            // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: id,
                type: type,
            },
        }
    }

    async login(ctx, next) {
        const { id, type } = ctx.request.body
            // 2. 操作数据库
            // const res = await createUser(user_name, password)
            // console.log(res)
            // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '查询成功',
            result: {
                id: id,
                type: type,
            },
        }
    }
}
module.exports = new UserController()
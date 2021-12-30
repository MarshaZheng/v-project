const Router = require('koa-router')

const { fetchData } = require('../controller/dept.controller')

const router = new Router({ prefix: '/dept' })

// 注册接口
// router.post('/register', register)

// 登录接口

router.post('/fetchData', fetchData)
module.exports = router
const Router = require('koa-router')

const { fetchData } = require('../controller/physician.controller')

const router = new Router({ prefix: '/physician' })

// 注册接口
// router.post('/register', register)

// 登录接口

router.post('/fetchData', fetchData)
module.exports = router
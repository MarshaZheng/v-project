const Router = require('koa-router')

const { login, fetchData } = require('../controller/patient.controller')

const router = new Router({ prefix: '/patient' })

// 注册接口
// router.post('/register', register)

// 登录接口
router.post('/login', login)
router.post('/fetchData', fetchData)
module.exports = router
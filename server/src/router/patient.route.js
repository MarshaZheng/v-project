const Router = require('koa-router')

const { login } = require('../controller/patient.controller')

const router = new Router({ prefix: '/patient' })

// 注册接口
// router.post('/register', register)

// 登录接口
router.post('/login', login)
module.exports = router
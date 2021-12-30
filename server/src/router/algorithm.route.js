const Router = require('koa-router')

const { nodeSimilarity, communityDiscovery, relativePath } = require('../controller/algorithm.controller')

const router = new Router({ prefix: '/algorithm' })

// 注册接口
// router.post('/register', register)

// 登录接口

router.post('/nodeSimilarity', nodeSimilarity)
router.post('/communityDiscovery', communityDiscovery)
router.post('/relativePath', relativePath)
module.exports = router
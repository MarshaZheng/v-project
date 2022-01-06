const Router = require('koa-router')

const { expandNode, nodeSimilarity, communityDiscovery, relativePath, getPathData } = require('../controller/algorithm.controller')

const router = new Router({ prefix: '/algorithm' })

// 注册接口
// router.post('/register', register)

// 登录接口
router.post('/expandNode', expandNode)
router.post('/nodeSimilarity', nodeSimilarity)
router.post('/communityDiscovery', communityDiscovery)
router.post('/relativePath', relativePath)
router.post('/getPathData', getPathData)
module.exports = router
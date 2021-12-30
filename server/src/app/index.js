const Koa = require('koa')
const KoaBody = require('koa-body')

const patientRouter = require('../router/patient.route')
const physicianRouter = require('../router/physician.route')
const hospitalRouter = require('../router/hospital.route')
const deptRouter = require('../router/dept.route')
const algorithmRouter = require('../router/algorithm.route')
const app = new Koa()

app.use(KoaBody())
app.use(patientRouter.routes())
app.use(physicianRouter.routes())
app.use(hospitalRouter.routes())
app.use(deptRouter.routes())
app.use(algorithmRouter.routes())

module.exports = app
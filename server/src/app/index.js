const Koa = require('koa')
const KoaBody = require('koa-body')

const patientRouter = require('../router/patient.route')
const physicianRouter = require('../router/physician.route')
const app = new Koa()

app.use(KoaBody())
app.use(patientRouter.routes())
app.use(physicianRouter.routes())

module.exports = app
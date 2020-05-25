import app, { mainHandler } from './server';
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const awsServerlessExpress = require('aws-serverless-express')

const router = express.Router()

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

router.get('/*', mainHandler)

app.use('*', router)

const server = awsServerlessExpress.createServer(app)
exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context)
}

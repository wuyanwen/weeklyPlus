'use strict'
require('babel-register')
const config1 = require('./config')
const fs = require('fs')
const path = require('path')
const db = config1.config.db
const mongoose = require('mongoose')
const Koa = require('koa')
const logger = require('koa-logger')
const session = require("koa-session")
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Busboy = require('busboy')
const app = new Koa()

const models_path = path.join(__dirname, '/app/models')
const CONFIG = {key: 'koa:sess', maxAge: 86400000,overwrite: true, httpOnly: true, signed: true, rolling: false}
mongoose.set('debug', true)
mongoose.Promise = global.Promise
mongoose.Promise = require('bluebird')
mongoose.connect(db,{useMongoClient:true})


var walk = function(modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)


const router = require('./config/router')()
app.keys = ['feweekly']

app.use(logger())
app.use(bodyParser())
app.use(session(CONFIG, app));
app.use(cors({
  origin: (ctx)=> ctx.request.header.origin,
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));


app.use(router.routes()).use(router.allowedMethods());
app.listen(1111)
console.log('FeWeekly started at port 1111...');
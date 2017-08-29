'use strict'
var mongoose = require('mongoose')
var Weeklylist = mongoose.model('weeklylist')
import weeklylistHelper from '../dbhelper/weeklylistHelper'
import upload from '../service/upload'
import { config } from '../../config/index'
import fs from 'fs'
import path from 'path'
const Busboy = require('busboy')

exports.add = async (ctx, next) => {
  const cover_url = ctx.request.body.cover_url
  const period = ctx.request.body.period
  const title = ctx.request.body.title
  const info = JSON.stringify(ctx.request.body.info)
  var weeklylist = new Weeklylist({
    cover_url: cover_url,
    period: period,
    title: title,
    info: info,
  })
  var weeklylist2 = await weeklylistHelper.add(weeklylist)
  if (weeklylist2) {
    ctx.body = {
      status: 1,
      message: 'success',
      result: weeklylist2,
    }
  }
}

exports.list = async (ctx, next) => {
  var data = await weeklylistHelper.list()
  ctx.body = {
    status: 1,
    message: 'success',
    result: data,
  }
}

exports.del = async (ctx, next) => {
  const _id = ctx.request.query._id
  var data = await weeklylistHelper.del({ _id })
  ctx.body = {
    status: 1,
    message: 'success',
    result: data,
  }
}
exports.getWeeklyFindById = async (ctx, next) => {
  const period = ctx.request.query.period
  var data = await weeklylistHelper.getWeeklyFindById({ period })
  ctx.body = {
    status: 1,
    message: 'success',
    result: data,
  }
}

exports.update = async (ctx, next) => {
  const _id = ctx.request.body._id
  const cover_url = ctx.request.body.cover_url
  const period = ctx.request.body.period
  const title = ctx.request.body.title
  const info = JSON.stringify(ctx.request.body.info)
  var wherestr = { _id: _id }
  var updatestr = {
    cover_url: cover_url,
    period: period,
    title: title,
    info: info,
  }

  await weeklylistHelper.update(wherestr, updatestr, function(
    error,
    weeklyClassificate,
  ) {
    //查询条件,更新对象
    if (error) {
      console.log(error)
    } else {
      console.log('weeklyClassificate!')
    }
  })
  ctx.body = {
    status: 1,
    message: 'success',
    result: '',
  }
}

const removeCacheFile = (url) => {
  fs.unlink(url, function(err) {
     if (err) {
         return console.error(err);
     }
  });
}

const uploadFile = async (ctx, next) => {
  let req = ctx.request
  let busboy = new Busboy({ headers: req.headers })
  return new Promise((resolve, reject) => {
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      const saveTo = path.join(config.uploadUrl, filename)
      file.pipe(fs.createWriteStream(saveTo))
      upload.upload(fs.createReadStream(saveTo), function(err, result) {
        removeCacheFile(saveTo)
        resolve(result)
      })
    })

    busboy.on('error', function(err) {
      console.log('err...')
      reject(err)
    })

    ctx.req.pipe(busboy)
  })
}

exports.upload = async (ctx, next) => {
  let req = ctx.request
  const result = await uploadFile(ctx, next)

  ctx.body = {
    status: 1,
    message: 'success',
    result: result,
  }
}

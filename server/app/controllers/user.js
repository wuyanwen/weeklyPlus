'use strict'

var xss = require('xss')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var uuid = require('uuid')
import userHelper from '../dbhelper/userHelper'
//登录
exports.findByUsername = async (ctx, next) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  var data = await userHelper.findByUsername({ username })
  if (data) {
    if (data.password == password) {
      ctx.session.user = {
        username,
        password,
      }
      ctx.body = {
        status: 1,
        message: 'success',
      }
    } else {
      ctx.body = {
        status: 2,
        message: '密码不正确',
      }
    }
  } else {
    ctx.body = {
      status: 0,
      message: '用户名不存在',
    }
  }
}
exports.logout = async (ctx, next) => {
  ctx.session = null
  ctx.body = {
    status: 1,
    message: 'success',
  }
}

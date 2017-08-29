'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    versionKey: false,
  },
)

var User = mongoose.model('User', UserSchema)
module.exports = User

/**
 * nodejs中文社区这篇帖子对mongoose的用法总结的不错：https://cnodejs.org/topic/548e54d157fd3ae46b233502
 */

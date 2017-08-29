'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var WeeklyClassificateSchema = new Schema(
  {
    category_id: Number,
    name: String,
  },
  {
    versionKey: false,
  },
)
/**
 * 定义模型WeeklyClassificate
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数WeeklyClassificate 数据库中的集合名称, 不存在会创建.
var WeeklyClassificate = mongoose.model(
  'WeeklyClassificate',
  WeeklyClassificateSchema,
)

module.exports = WeeklyClassificate

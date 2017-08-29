'use strict'
var mongoose = require('mongoose')
var WeeklyClass = mongoose.model('WeeklyClassificate')
import WeeklyClassificateHelper from '../dbhelper/WeeklyClassificateHelper'
//添加分类
exports.add = async (ctx, next) => {
  const category_id = ctx.request.body.category_id
  const name = ctx.request.body.name
  var weeklyClass = new WeeklyClass({
    category_id: category_id,
    name: name,
  })
  var weeklyClass2 = await WeeklyClassificateHelper.add(weeklyClass)
  if (weeklyClass2) {
    ctx.body = {
      status: 1,
      message: 'success',
      result: weeklyClass2,
    }
  }
}
//分类列表
exports.list = async (ctx, next) => {
  var data = await WeeklyClassificateHelper.list()
  ctx.body = {
    status: 1,
    message: 'success',
    result: data,
  }
}
//删除分类
exports.del = async (ctx, next) => {
  const _id = ctx.request.query._id
  var data = await WeeklyClassificateHelper.del({ _id })
  ctx.body = {
    status: 1,
    message: 'success',
    result: data,
  }
}
//更新分类
exports.update = async (ctx, next) => {
  const _id = ctx.request.body._id
  const name = ctx.request.body.name
  const category_id = ctx.request.body.category_id
  var wherestr = { _id: _id }
  var updatestr = { name: name, category_id: category_id }
  await WeeklyClassificateHelper.update(wherestr, updatestr, function(
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

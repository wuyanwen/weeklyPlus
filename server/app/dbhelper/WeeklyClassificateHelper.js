'use strict'

var mongoose = require('mongoose')
var WeeklyClassificate = mongoose.model('WeeklyClassificate')
//添加分类
exports.add = async WeeklyClassificate => {
  WeeklyClassificate = await WeeklyClassificate.save()
  return WeeklyClassificate
}
//分类列表
exports.list = async () => {
  var query = WeeklyClassificate.find({})
  var res = []
  await query.exec(function(err, WeeklyClassificate) {
    if (err) {
      res = []
    } else {
      res = WeeklyClassificate
    }
  })
  return res
}
//删除分类
exports.del = async ({ _id }) => {
  var flag = false
  await WeeklyClassificate.remove({ _id }, function(err) {
    if (err) {
      flag = false
    } else {
      flag = true
    }
  })
  return flag
}
//根据id找到分类
exports.find = async ({ _id }) => {
  var res = []
  await WeeklyClassificate.find({ _id: _id }, function(
    err,
    WeeklyClassificate,
  ) {
    if (err) {
      res = []
    } else {
      res = WeeklyClassificate
    }
  })
  return res
}
//更新分类
exports.update = async (wherestr, updatestr) => {
  var res = []
  await WeeklyClassificate.update(wherestr, updatestr, function(
    err,
    WeeklyClassificate,
  ) {
    if (err) {
      res = []
    } else {
      return WeeklyClassificate
    }
  })
}

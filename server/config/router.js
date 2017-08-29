'use strict'
const Router = require('koa-router')
const user = require('../app/controllers/user')
const weeklyClassificate = require('../app/controllers/weeklyClassificate')
const weeklylist = require('../app/controllers/weeklylist')
var auth = require('../app/service/auth');
module.exports = function(){
	var router = new Router({
      prefix: '/api'
  })
  //分类
  router.post('/weeklyClassificate/add',auth.userRequired,weeklyClassificate.add)
  router.get('/weeklyClassificate/list',auth.userRequired,weeklyClassificate.list)
  router.get('/weeklyClassificate/del',auth.userRequired,weeklyClassificate.del)
  router.post('/weeklyClassificate/update',auth.userRequired,weeklyClassificate.update)
  //周刊
  router.post('/weeklylist/add',auth.userRequired,weeklylist.add)
  router.post('/weeklylist/upload',weeklylist.upload)
  router.get('/weeklylist/del',auth.userRequired,weeklylist.del)
  router.post('/weeklylist/update',auth.userRequired,weeklylist.update)
  //登录
  router.post('/user/login',user.findByUsername)
  router.get('/user/logout',user.logout)
  //周刊列表全部(对外暴露接口)
  router.get('/weeklylist/list',weeklylist.list)
  //根据周刊期号返回某一期(对外暴露接口)
  router.get('/weeklylist/getWeeklyFindById',weeklylist.getWeeklyFindById)
  return router
}

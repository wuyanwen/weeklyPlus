'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var weeklylistSchema = new Schema(
  {
    cover_url: String,
    period: String,
    title: String,
    info: String,
  },
  {
    versionKey: false,
  },
)
var weeklylist = mongoose.model('weeklylist', weeklylistSchema)

module.exports = weeklylist

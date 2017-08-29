<template>
  <div style="position:relative">
  <div class="weekly">
    <div class="cover_container">
      <div class="cover" ref="cover" v-bind:style="{background: 'url(' + weekly.cover_url + ') no-repeat center center'}"></div>
      <h3 v-bind:style="{color:randomColor()}">FEweekly</h3>
    </div>
    <div class="main">
      <div class="category"  v-for="info in weekly.info">
        <h2 :class="{'category_title': true, 'hot': info.type_name === '***热点***'}">👍🏼{{info.type_name}}</h2>
        <ul class="list">
          <li v-for="list in info.list" >
            <h3><a :href="list.url">{{list.title}}</a></h3>
            <p class="desc">{{list.describe}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <el-menu :default-active="activeIndex2" class="history" mode="horizontal" @select="handleSelect" style="width:116px; position:fixed; right:10px; top:10px;  border-top:1px solid #e5e5e5; background:#fff; ">
      <el-submenu index="2">
            <template slot="title">往期内容</template>
            <div  v-for="data in weeklyPeriod">
                 <el-menu-item :index="data.period">第{{data.period}}期</el-menu-item>
            </div>
      </el-submenu>
   </el-menu>
  </div>
</template>
<script>
import http from '../utils/http'
import {frontUrl} from '../../config/frontUrl'
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to FEweekly',
      period:"1",
      activeIndex: '1',
      activeIndex2: '1',
      weekly:{
          cover_url: '', 
          period: '', 
          title: '',
          info:[
            {
              type_name:''
            }
          ]
      },
      weeklyPeriod:{

      }
    }
  },

  methods: {
    handleSelect(key, keyPath) {
        this.list(key);
    },
    randomColor(){
      let colorArr = ['#0b7c39','#3488e3','#ca34e3','#e39f34','#be2152'];
      return colorArr[Math.floor(Math.random() * colorArr.length)]
    },
		//获得每期内容
		list:async function(period){
        let that = this
        let para = { period: period }
        const res = await http.get(frontUrl+'/api/weeklylist/getWeeklyFindById',para)
				if(res.data.result[0]){
              that.weekly = res.data.result[0];
              that.weekly.info=JSON.parse(res.data.result[0].info)
        } 
    },
    sortInfo: function(info){
      let hot = null;

      for(let i=0; i<info.length; i++){
        let cur = info[i];
        if(cur && cur.type_name === '***热点***'){
          hot = cur;
          info.splice(i,1)
          info.unshift(hot)
        }
      }
      
    },
    //获得期数列表
    listPeriod:async function(){
        let that = this
        const res = await http.get(frontUrl+'/api/weeklylist/list')
				if(res.data.result[0]){
              that.weeklyPeriod = res.data.result;
              that.weekly = res.data.result[0];
              that.weekly.info=JSON.parse(res.data.result[0].info)
              console.log(that.weekly.info)
              that.sortInfo(that.weekly.info)

        }
    }
  },
  mounted() {
		// this.list(this.period);
    this.listPeriod();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import (reference) "../shared.less";
  .weekly{
    width:@bodyWdith;
    margin: 22px auto 0;
    border: 1px solid #ccc;
    background: #fff;
    @media (max-width: @bodyWdith) {
      width: 100%;
      margin: 0;
      border: none;
    }
  }
  .history{
    @media (max-width: @bodyWdith) {
      display: none
    }
  }
  .main{
    padding: 40px;
  }
  .category{
    .category_title{
      color: @defaultColor;
      margin-bottom: 8px;
      &.hot{
        color: red
      }
    }
    .desc{
      margin: 8px  0;
      padding-left: 8px;
      border-left: 3px solid @lightColor;
      margin-left: 15px;
    }
    .list{
      li{
        margin-bottom: 25px;
      }
    }
  }
  .cover_container{
    height: 220px;
    position: relative;
    .cover{
      height: 100%;
      background-size: cover !important;
      overflow: hidden;
      -webkit-filter: blur(2px);
      img{
        min-width: 100%;
        min-height: 100%;
        vertical-align: middle;
      }
    }
    h3{
      position: absolute;
      bottom: 10px;
      left: 20px;
      font-size: 32px;
      @media (max-width: @bodyWdith) {
        font-size: 22px;
      }
    }
  }

</style>

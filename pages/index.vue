<template>
  <div style="position:relative">
    <div class="weekly">
      <div class="cover_container">
        <div class="cover" ref="cover" v-bind:style="{background: 'url(' + weekly.cover_url + ') no-repeat center center'}"></div>
        <h3 v-bind:style="{color:randomColor()}">weeklyPlus</h3>
      </div>
      <div class="main">
        <div class="category" v-for="info in weekly.info">
          <h2 :class="{'category_title': true, 'hot': info.type_name === '***热点***'}">👍🏼{{info.type_name}}</h2>
          <ul class="list">
            <li v-for="list in info.list">
              <h3>
                <a :href="list.url">{{list.title}}</a>
              </h3>
              <p class="desc">{{list.describe}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-menu :default-active="activeIndex2" class="history" mode="horizontal" @select="handleSelect" style="width:116px; position:fixed; right:10px; top:10px;  border-top:1px solid #e5e5e5; background:#fff; ">
      <el-submenu index="2">
        <template slot="title">往期内容</template>
        <div v-for="data in weeklyPeriod">
          <el-menu-item :index="data.period">第{{data.period}}期</el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'
import { Button, Select } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to FEweekly',
      period: "1",
      activeIndex: '1',
      activeIndex2: '1',
      weekly: {
        cover_url: '',
        period: '',
        title: '',
        info: [
          {
            type_name: ''
          }
        ]
      },
      weeklyPeriod: {

      }
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      this.list(key);
    },
    randomColor() {
      let colorArr = ['#0b7c39', '#3488e3', '#ca34e3', '#e39f34', '#be2152'];
      return colorArr[Math.floor(Math.random() * colorArr.length)]
    },
    //获得每期内容
    list: async function(period) {
      let that = this
      let para = { period: period }
      const res = await axios.get('http://127.0.0.1:1111/api/weeklylist/getWeeklyFindById?period=' + period)
      if (res.data.result[0]) {
        that.weekly = res.data.result[0];
        that.weekly.info = JSON.parse(res.data.result[0].info)
      }
    },
  },
  async asyncData(context) {
    console.log(context.isClient);
    const res = await axios.get('http://127.0.0.1:1111/api/weeklylist/list')
    if (res.data.result[0]) {
      return {
        weeklyPeriod: res.data.result,
        weekly: res.data.result[0],
        weekly: {
          info: JSON.parse(res.data.result[0].info),
          cover_url:res.data.result[0].cover_url
        }
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import (reference) "shared.less";
.weekly {
  width: @bodyWdith;
  margin: 22px auto 0;
  border: 1px solid #ccc;
  background: #fff;
  @media (max-width: @bodyWdith) {
    width: 100%;
    margin: 0;
    border: none;
  }
}

.history {
  @media (max-width: @bodyWdith) {
    display: none
  }
}

.main {
  padding: 40px;
}

.category {
  .category_title {
    color: @defaultColor;
    margin-bottom: 8px;
    &.hot {
      color: red
    }
  }
  .desc {
    margin: 8px 0;
    padding-left: 8px;
    border-left: 3px solid @lightColor;
    margin-left: 15px;
  }
  .list {
    li {
      margin-bottom: 25px;
    }
  }
}

.cover_container {
  height: 220px;
  position: relative;
  .cover {
    height: 100%;
    background-size: cover !important;
    overflow: hidden;
    -webkit-filter: blur(2px);
    img {
      min-width: 100%;
      min-height: 100%;
      vertical-align: middle;
    }
  }
  h3 {
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-size: 32px;
    @media (max-width: @bodyWdith) {
      font-size: 22px;
    }
  }
}

body,
ul,
li,
div,
p,
h1,
h2,
h3,
h4,
h5,
img,
a {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a:hover,
a:visited,
a:active,
a:link {
  text-decoration: none;
  color: #4db3ff
}
</style>

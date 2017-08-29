import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Footer from '@/components/Footer'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'
import Index from '../views/Index.vue'
import WeeklyClassificate from '../views/WeeklyClassificate.vue'
import Weeklylist from '../views/Weeklylist.vue'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      components: {
        default: Hello,
        footer: Footer
      },
      hidden: true
    },
    {
      path: '/admin',
      component: Login,
      name: '',
      hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/admin',
        component: Home,
        name: '周刊分类',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: 'index', component: Index,name: '周刊', hidden: true  },
            { path: 'weeklyClassificate', component:WeeklyClassificate, name: '周刊分类'}
            // { path: '/table', component: Table, name: 'Table' },
            // { path: '/form', component: Form, name: 'Form' },
            // { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/admin',
        component: Home,
        name: '周刊列表',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: 'weeklylist', component: Weeklylist, name: '周刊列表' }
            // { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
  ]
})

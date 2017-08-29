<template>
   <full-calendar :events="fcEvents" lang="zh"></full-calendar> 
</template>
<script>
import Vue from 'vue'
import fullCalendar from 'vue-fullcalendar'
Vue.component('full-calendar', fullCalendar)
var demoEvents = [
    
]
export default {
  data () {
    return {
      fcEvents : demoEvents
    }
  },
  components : {
    'full-calendar': require('vue-fullcalendar')	
  }
}
</script>


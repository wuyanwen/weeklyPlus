<template>
  <div class="footer">
    <div class="footer_decs">
      <img src="../../static/qrcode.jpg" alt="qrcode">
      <div class="">
        <h3>👈🏼VueJs中文社区微信公众号</h3>
        👈🏼关注VueJs中文社区微信公众号</br>
        👈🏼随时随地了解前端最新资讯
      </div>
    </div>
    <p class="copyright">Copyright© 2017 <a href="https://www.vue-js.com">vueClub</a>. All Rights Reserved.<a href="https://github.com/vueClub/FEweekly">源码地址</a></p>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import (reference) "../shared.less";
  .footer_decs{
    width:@bodyWdith;
    margin: 22px auto 0;
    border: 1px solid #ccc;
    background: #fff;
    padding:20px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }
    div{
      font-size: 12px;
      color: #ccc
    }
    @media (max-width: @bodyWdith) {
      width: 100%;
      border: none;
      border-top: 1px solid #f1f1f1
    }
  }
  .copyright{
    padding: 15px;
    font-size: 12px;
    text-align: center;
  }

</style>

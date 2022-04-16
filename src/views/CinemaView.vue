<template>
  <div class="cinema" v-if="cinemas">
    <header class="header">
      <div class="left">
        <div class="city">北京<i class="icofont-curved-down"></i></div>
      </div>
      <div class="title">影院</div>
      <div class="right">
        <div class="cinema-search"><i class="icofont-search"></i></div>
      </div>
    </header>

    <div class="cinema-list-nav">
      <label class="cinema-district">
        全城<i class="icofont-curved-down"></i>
      </label>
      <label class="book-ticket-method">
        APP订票<i class="icofont-curved-down"></i>
      </label>
      <label class="cinema-sort-type">
        最近去过<i class="icofont-curved-down"></i>
      </label>
    </div>

    <div class="pad-top"></div>
    <div class="cinema-list-wrap" :style="myStyle">
      <ul class="cinema-list">
        <li class="cinema-list-item" v-for="(cinema, index) in cinemas" :key="index">
          {{cinema.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  data () {
    return {
      cinemas: [],
      myStyle: {
        height: '0px'
      }
    }
  },
  mounted () {
    this.myStyle.height = document.documentElement.clientHeight - 50 + 'px'

    const url = 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5264352'
    const myRequest = new Request(url, {
      method: 'GET',
      headers: new Headers({
        'X-Host': 'mall.film-ticket.cinema.list',
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"164994640625984552140801","bc":"110100"}'
      })
    })
    fetch(myRequest).then(res => res.json()).then(res => {
      console.log(res.data)
      this.cinemas = res.data.cinemas

      // 异步获取数据完毕后执行better scroll
      // const wrapper = document.querySelector('.cinema-list-wrap')
      this.$nextTick(() => {
        BScroll('.cinema-list-wrap', {
          scrollBar: {
            fade: true,
            interactive: false
          }
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
 *{
  font-family: "Microsoft YaHei", Tahoma, Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-stretch: normal;
  font-style: normal;
  font-variant-caps: normal;
  font-weight: normal;
  margin: 0;
  padding: 0;
 }
 ul{
   list-style: none;
 }
 .pad-top{
   padding-top:94px;
   display: block;
 }
 header {
   z-index: 2000;
   position: fixed;
   display: flex;
   line-height: 44px;
   height: 44px;
   vertical-align: middle;
   width: 100%;
   border-bottom: 1px solid rgb(235, 235, 235);
   .left {
      height: 44px;
      justify-content: flex-start;
      margin-left: 15px;
      min-width: 15%;
      flex: 1;
   }
   .title {
      display: block;
      font-size: 17px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      flex: 1;
   }
   .right {
      height: 44px;
      justify-content: flex-end;
      line-height: 44px;
      margin-right: 15px;
      flex: 1;
      text-align: right;
      i{
        font-size: 16px;
      }
   }
 }
//  选择影院
 .cinema-list-nav{
   z-index: 2000;
   box-sizing: border-box;
   text-align: center;
   display: flex;
   position: fixed;
   top: 44px;
   height: 50px;
   line-height: 50px;
   border-bottom: 1px solid rgb(235, 235, 235);
   width: 100%;
   label{
     flex:1
   }
 }
 // 影院列表外包层
 .cinema-list-wrap{
   box-sizing: border-box;
   width: 100%;
   position: fixed;
  //  height: 500px;
   display: block;
   padding-bottom: 49px;
   z-index: 100;
   overflow: hidden;
  //  ul {
    //  margin: 94px 0;
    //  height: 800px;
    //  overflow: hidden;
    //  position: relative;
    //  backface-visibility: hidden;
    //  perspective: 1000;
    //  -webkit-overflow-scrolling: touch;
  //  }

   li{
     padding: 15px;
     height: 45px;
     font-size: 15px;
   }
 }
</style>

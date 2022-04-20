<template>
  <div class="cinema" v-if="cinemas">
    <header class="header">
      <div class="left">
        <div class="city" @click="handleSelectCity">{{currentCity}}<i class="icofont-curved-down"></i></div>
      </div>
      <div class="title">影院</div>
      <div class="right">
        <div class="cinema-search"><i class="icofont-search"></i></div>
      </div>
    </header>

    <div class="cinema-list-nav">
      <label class="cinema-district">
        <nut-popover v-model:visible="visible.Customized" @click="onOpen">
          <template #reference>
            {{currentDistrict}}<i class="select-district icofont-curved-down"></i>
          </template>

          <template #content>
            <div class="district">
              <div class="district-item" v-for="(item, index) in districts" :key="index">
                <div class="district-desc"  v-bind:class="{ current: currnetDistrictId===item.districtId }" @click="handleDistrictClick(item)">
                  {{ item.districtName }}
                </div>
              </div>
            </div>
          </template>
        </nut-popover>
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
          <div class="cinema-name">{{cinema.name}}</div>
          <div class="cinema-address">{{cinema.address}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import BScroll from '@better-scroll/core'
import { getDistricts } from '@/libs/DataHandler'
// import { Popover } from '@nutui/nutui'

export default {
  data () {
    return {
      currentCity: '北京',
      currentDistrict: '全城',
      currnetDistrictId: '100100',
      allCinemas: [],
      cinemas: [],
      myStyle: {
        height: '0px'
      }
    }
  },
  methods: {
    handleSelectCity () {
      this.$router.push('/city')
    },
    onOpen () {
      console.log('open')
    },
    handleDistrictClick (district) {
      this.cinemas = this.allCinemas.filter(c => c.districtId === district.districtId)
      console.log(this.cinemas)
      this.currentDistrict = district.districtName
      this.currnetDistrictId = district.districtId
      localStorage.districtId = district.districtId
    }
  },
  mounted () {
    if (localStorage.cityName) this.currentCity = localStorage.cityName
    this.myStyle.height = document.documentElement.clientHeight - 50 + 'px'
    const cityId = localStorage.getItem('cityId')
    const url = `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=5264352`
    const myRequest = new Request(url, {
      method: 'GET',
      headers: new Headers({
        'X-Host': 'mall.film-ticket.cinema.list',
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"164994640625984552140801","bc":"110100"}'
      })
    })
    fetch(myRequest).then(res => res.json()).then(res => {
      this.allCinemas = res.data.cinemas.slice()
      this.cinemas = res.data.cinemas
      this.districts = getDistricts(res.data.cinemas)
      console.log(this.allCinemas)

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
  },

  setup () {
    const visible = ref({
      Customized: false
    })
    const districts = reactive([])

    return {
      visible,
      districts
    }
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
      .city{
        cursor: pointer;
      }
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
   .cinema-list-item{
     padding: 15px;
     height: 45px;
     .cinema-name{
       font-size: 16px;
       color:rgb(25,25,25)
     }
     .cinema-address {
       font-size: 13px;
       color:rgba(25,25,25,0.6)
     }
   }
 }
 // 选择区弹出层
 .district {
  width: calc(100% - 10px);
  position: fixed;
  left:0;
  top:94px;
  background:white;
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0 20px 5px;
  // padding-bottom: 20px;
  &-item {
    height: 30px;
    line-height: 30px;
    width: calc(25vw - 12.5px);
    flex-shrink: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 10px 15px 0;
  }
  &-desc {
    color: rgb(125,125,125);
    width: calc(25vw - 15px);
    font-size: 13px;
    text-align: center;
    border:1px solid rgb(210,210,210);
    border-radius: 4px;
    height: 30px;
    line-height: 28px;
  }
  .current {
    color: orange;
    border-color:orange;
  }
}
</style>

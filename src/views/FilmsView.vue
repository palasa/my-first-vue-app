<template>
  <div class="films">
    <!--  -->
    <swiper ref="swiper" :slides-per-view="1" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">
      <swiper-slide v-for="slider in sliders" :key=slider>
        <img :src="slider.materialVOList[0].value"/>
      </swiper-slide>
    </swiper>
    <nav class="onShow" :class="isFixed?'fixed':''">
      <router-link to="/films/nowplaying">正在上映</router-link>
      <router-link to="/films/comingsoon">即将上映</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      sliders: [],
      isFixed: false
    }
  },
  mounted () {
    // 获取slider数据
    const url = 'https://show.maoyan.com/maoyansh/myshow/ajax/ad/detail?uuid=n6rkg8rradti667lbi9i9r1rab0h32xzbi1rwxm2hfas8qe7q52y1pw28gmckxo9&clientType=4&os=2&sellChannel=13&cityId=1&lng=121.4822&lat=31.2624'
    const myRequest = new Request(url, {
      method: 'GET',
      // mode: 'cors',
      headers: new Headers({
        'M-APPKEY': 'fe_com.sankuai.movie.showf2e.mmh5',
        'M-TRACEID': '2659718205366641310'
      })
    })
    fetch(myRequest).then(res => res.json()).then(res => { this.sliders = res.data.middleBannerAds[0].adVOList })
    // 单页面应用会影响其他页面，在进入该页面的时候绑定，离开时解绑
    window.onscroll = this.handleScroll
  },
  beforeUnmount () {
    window.onscroll = null
  },
  methods: {
    handleScroll () {
      if (document.documentElement.scrollTop >= this.$refs.swiper.$el.offsetHeight) {
        // console.log('fixed')
        this.isFixed = true
        // console.log(document.documentElement.scrollTop, this.$refs.swiper.$el.offsetHeight)
      } else {
        // console.log('scroll')
        this.isFixed = false
      }
    }
  },
  setup () {
    const onSwiper = (swiper) => {
      // console.log(swiper)
    }
    const onSlideChange = () => {
      // console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper {
    img{
      width: 100%;
    }
  }
  .fixed{
      position: fixed;
      left: 0;
      top:0;
      width: 100%;
      background: white;
  }
  nav{
    display: flex;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid rgb(235,235,235);
    a{
      flex: 1;
      text-align: center;
      line-height: 50px;
      text-decoration: none;
      font-size: 16px;
      &.router-link-active {
        color: rgb(255,95,22);
      }
      // &.router-link-exact-active {
      //   color: rgb(255,95,22);
      // }
    }
  }
</style>

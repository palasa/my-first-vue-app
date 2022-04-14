<template>
  <div class="films">
    <swiper ref="swiper" :modules="modules" :pagination="{ clickable: true }" :autoplay="{ delay: 3500, disableOnInteraction: on }">
      <swiper-slide v-for="n in 5" :key=n>Slide {{n}}</swiper-slide>
    </swiper>
    <nav :class="isFixed?'fixed':''">
      <router-link to="/films/nowplaying"><i class="icofont-movie"></i>正在上映</router-link>
      <router-link to="/films/comingsoon">即将上映</router-link>
    </nav>
    <hr/>
    <router-view/>
  </div>
</template>

<script>
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

// import swiper module styles
import 'swiper/css'
import 'swiper/css/pagination'
// more module style...

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      isFixed: false
    }
  },
  mounted () {
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
    return {
      modules: [Pagination]
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper {
    height: 200px;
  }
  .fixed{
      position: fixed;
      left: 0;
      top:0;
      width: 100%;
      background: lightblue;
  }
  nav{
    display: flex;
    height: 50px;
    width: 100%;
    a{
      flex: 1;
      text-align: center;
      line-height: 50px;
      text-decoration: none;
      font-size: 16px;
    }
  }
</style>

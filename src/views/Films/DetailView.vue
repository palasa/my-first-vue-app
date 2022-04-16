<template>
  <div class="detail" v-if="filmInfo">
    <i class="back icofont-square-left" @click="handleGoBackClick()"></i>
    <img class="poster" :src="filmInfo.poster" />
    <section class="film-info">
      <h3>
        <span>{{filmInfo.name}}</span>
        <span class="grade">{{filmInfo.grade}}<small>分</small></span>
      </h3>
      <div class="film-info-category">{{filmInfo.category}}</div>
      <div class="film-on-cinema">{{ getDate(filmInfo.premiereAt) }}上映 </div>
      <div class="film-info-nation">{{filmInfo.nation}} | {{filmInfo.runtime}}分钟 </div>
      <div class="film-info-synopsis">{{filmInfo.synopsis}}</div>
    </section>
    <section class="actors">
      <h3>演职人员</h3>
      <swiper class="my-swiper" :slidesPerView="'auto'" :spaceBetween="5">
        <swiper-slide class="my-swiper-slide" v-for="actor in filmInfo.actors" :key="actor">
          <img class="actor-pic" :src="actor.avatarAddress"/>
          <div class="actor-name">{{actor.name}}</div>
          <div class="actor-role">{{actor.role}}</div>
        </swiper-slide>
      </swiper>
    </section>
    <section class="stage-photo">
      <h3>剧照</h3>
      <swiper class="swiper-stage-photo" :slidesPerView="'auto'" :spaceBetween="5">
        <swiper-slide class="swiper--stage-photo-slide" v-for="photo in filmInfo.photos" :key="photo">
           <img class="each-stage-photo" :src="photo"/>
        </swiper-slide>
      </swiper>
    </section>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
// import bus from 'vue3-eventbus'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      filmInfo: null
    }
  },
  computed: {
    getDate: () => {
      return (timeStamp) => {
        const time = new Date(timeStamp * 1000)
        // console.log(timeStamp, time)
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const date = time.getDate()
        return `${year}年${month}月${date}日`
      }
    }
  },
  methods: {
    handleGoBackClick () {
      this.$router.back(-1)
    }
  },
  beforeMount () {
    // bus.emit('bottomNavibar', false)
    // this.$store.state.isNavibarShow = false

    // 使用mutation
    this.$store.commit('HideNavibar', false)
  },
  mounted () {
    // console.log(this.$route.params.filmId)
    const url = 'https://m.maizuo.com/gateway?k=233517&filmId=' + this.$route.params.filmId
    const myRequest = new Request(url, {
      method: 'GET',
      headers: new Headers({
        'X-Host': 'mall.film-ticket.film.info',
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"164994640625984552140801","bc":"110100"}'
      })
    })
    fetch(myRequest).then(res => res.json()).then(res => { console.log(res.data); this.filmInfo = res.data.film })
    // console.log(this.filmInfo)
  },
  unmounted () {
    // bus.emit('bottomNavibar', true)
    this.$store.commit('ShowNavibar', true)
  },
  setup () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  *{
    font-family: '微软雅黑';
  }
  .poster {
    width: 100%;
    margin-top: -100%;
  }
  .back {
    position: fixed;
    font-size: 30px;
    left: 8px;
    top: 8px;
    color: gray;
    z-index: 10000;
    opacity: 0.8;
  }
  .film-info{
    padding: 5px;
    color: gray;
    padding: 15px;
    .film-info-nation, .film-info-category, .film-on-cinema, .film-info-synopsis{
      font-size: 13px;
      height: 19px;
      line-height: 19px;
      margin-top: 4px;
      vertical-align: middle;
    }
    .film-info-synopsis{
      margin-top: 12px;
      line-height: 19px;
      height: 38px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  h3{
    color: black;
    height: 24px;
    line-height: 24px;
    vertical-align: middle;
    font-weight: 400;
    font-size: 18px;
  }
  .grade {
    float: right;
    color: orange;
    font-style: italic;
  }
  .actors{
    padding: 15px;
    .my-swiper{
      text-align: center;
      .my-swiper-slide{
        width: 105px;
      }
      .actor-pic {
        height: 100px;
        width: 100px;
        margin: 8px 0;
      }
      .actor-name {
        font-size : 12px;
      }
      .actor-role {
        font-size : 10px;
        color : gray;
      }
    }
  }
  .stage-photo{
    padding: 0 15px;
    h3{
      padding: 15px 0;
    }
    .swiper--stage-photo-slide{
      width: 270px;
    }
    .each-stage-photo{
      height: 150px;
    }
  }
</style>

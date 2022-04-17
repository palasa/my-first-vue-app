<template>
  <div class="now-playing">
    <nut-infiniteloading
        containerId = 'scroll'
        :use-window='false'
        :has-more="isHasMore"
        :is-loading="isLoading"
        :threshold="500"
        :is-show-mod="true"
        @loadmore="loadMore">
    <ul class="now-playing-wrap" id="scroll">
      <!-- <li class="now-playing-item" v-for="film in items" :key="film" @click="handleChangePage(film.filmId)">
        <a class="now-playing-item-wrap">
          <div class="now-playing-item-image">
            <img class="target-img" :src='film.poster'/>
          </div>
          <div class="now-playing-item-info">
            <div class="now-playing-film-name info-col">
              <span class="name">{{film.name}}</span>
              <span class="item">{{film.item.name}}</span>
            </div>
            <div class="now-playing-film-grade info-col">
              <span class="label">观众评分：<span class="grade">{{film.grade}}</span></span>
            </div>
            <div class="now-playing-film-actors info-col">
              <span class="label">主演：<span v-for="actor in film.actors" :key="actor">{{actor.name}}&nbsp;</span></span>
            </div>
            <div class="now-playing-film-detail info-col">
              <span class="label">{{film.nation}} | <span>{{film.runtime}}分钟</span></span>
            </div>
          </div>
        </a>
      </li> -->
      <li style="height:100px" class="infiniteLi" v-for="(item, index) of data" :key="index">我是测试数据{{ index + 1 }}</li>
    </ul>
    </nut-infiniteloading>
  </div>
</template>

<script>
// import { reactive, ref, onMounted, toRefs } from 'vue'
export default {
  data () {
    return {
      items: [],
      data: new Array(30),
      page: 2,
      num: 30,
      isHasMore: true,
      isLoading: false,
      isErr: false,
      timer: null
    }
  },
  mounted () {
    const url = 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5080875'
    const myRequest = new Request(url, {
      method: 'GET',
      // mode: 'cors',
      headers: new Headers({
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"164994640625984552140801","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.list'
      })
    })
    fetch(myRequest).then(res => res.json()).then(res => { console.log(res.data.films); this.items = res.data.films })
  },
  methods: {
    handleChangePage (filmId) {
      // console.log(index)
      // 编程式导航，通过路径跳转
      // this.$router.push(`/detail/${index}`)

      // 编程式导航， 通过name 跳转
      // console.log(item)
      this.$router.push({
        name: 'filmDetail',
        params: {
          filmId: filmId
        }
      })
    },
    loadMore () {
      console.log('begin load')
      this.isLoading = true
      this.timer = setTimeout(() => {
        if (this.page <= 5) {
          this.data = new Array(this.num * this.page)
          this.page = this.page + 1
        } else {
          this.isHasMore = false
        }
        this.isLoading = false
      }, 500)
    }
  },
  setup () {
    // const hasMore = ref(true)
    // const data = reactive({
    //   defaultList: []
    // })
    // const loadMore = done => {
    //   console.log('load more')
    //   setTimeout(() => {
    //     const curLen = data.defaultList.length
    //     for (let i = curLen; i < curLen + 10; i++) {
    //       data.defaultList.push(`${i}`)
    //     }
    //     if (data.defaultList.length > 30) hasMore.value = false
    //     done()
    //   }, 500)
    // }
    // const init = () => {
    //   for (let i = 0; i < 10; i++) {
    //     data.defaultList.push(`${i}`)
    //   }
    // }
    // onMounted(() => {
    //   init()
    // })
    // return { loadMore, hasMore, ...toRefs(data) }
  },
  unmounted () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>

*{
  margin: 0;
  padding: 0;
}
.now-playing-wrap{
  list-style: none;
  margin-left: 15px;
  width: 100%;
  .now-playing-item {
    padding: 15px 30px 15px 0;
    border-bottom: 1px solid rgb(235, 235, 235);
    &-wrap {
      display: flex;
      -webkit-box-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      align-items: center;
      .now-playing-item-image{
        float: left;
        width:66px;
        height: 94px;
        .target-img{
          width: 64px;
          border-radius: 2px;
        }
      }
      .now-playing-item-info{
        float:left;
        padding: 0 10px;
        width: calc(100% - 116px);
        .now-playing-film-name{
          .name{
            height: 22px;
            line-height: 22px;
            margin-right: 5px;
            color: rgb(25,25,25);
            max-width: calc(100% - 25px);
          }
          .item{
            color: white;
            background-color: rgb(200,200,200);
            font-size: 9px;
            height: 22px;
            line-height: 22px;
            vertical-align: middle;
            padding: 2px;
            border: 2px;
            border-radius: 2px;
          }
        }
        .now-playing-film-grade{
          .grade{
            color: orange;
            font-size: 15px;
          }
        }
        .info-col{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          .label{
            font-size: 13px;
            color: rgb(120,120,120);
          }
        }
      }
    }
  }
}
</style>

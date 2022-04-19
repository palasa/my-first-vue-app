<template>
  <div class="now-playing">
    <!-- <nut-cell title="Loading带透明罩" is-link @click="textToast('加载中')"></nut-cell> -->
    <ul class="now-playing-wrap" >
      <nut-infiniteloading
        :use-window='true'
        :has-more="hasMore"
        @load-more="loadMore">
        <li class="now-playing-item" v-for="film in films" :key="film" @click="handleChangePage(film.filmId)">
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
      </li>
      </nut-infiniteloading>
    </ul>
  </div>
</template>

<script>
import { Toast } from '@nutui/nutui'
import { reactive, ref, onMounted, toRefs } from 'vue'

export default {

  methods: {
    handleChangePage (filmId) {
      // console.log(index)
      // 编程式导航，通过路径跳转
      // this.$router.push(`/detail/${index}`)

      // 编程式导航， 通过name 跳转
      this.$router.push({
        name: 'filmDetail',
        params: {
          filmId: filmId
        }
      })
    }
  },
  setup (props) {
    let pageNum = 1
    const data = reactive({
      films: []
    })
    let hasMore = ref(true)

    const textToast = msg => {
      Toast.loading(msg, {
        cover: true,
        duration: 30000,
        bgColor: 'rgba(0, 0, 0, 0.65)'
      })
    }

    const getData = pageNum => {
      return new Promise((resolve, reject) => {
        textToast('加载中')
        const url = `https://m.maizuo.com/gateway?cityId=110100&pageNum=${pageNum}&pageSize=10&type=1&k=5080875`
        const myRequest = new Request(url, {
          method: 'GET',
          // mode: 'cors',
          headers: new Headers({
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"164994640625984552140801","bc":"110100"}',
            'X-Host': 'mall.film-ticket.film.list'
          })
        })
        fetch(myRequest).then(res => res.json()).then(res => {
          resolve(res.data)
          Toast.hide()
        }).catch(err => {
          reject(err)
        })
      })
    }

    const loadMore = done => {
      console.log('now loading')
      getData(++pageNum).then(res => {
        const newData = res.films
        data.films = [...data.films, ...newData]
        // console.log(pageNum, data.films)
        if (data.films.length >= res.total) {
          hasMore = false
        }
        done()
      })
    }
    onMounted(() => {
      getData(pageNum).then(res => {
        data.films = res.films
      })
    })
    return { hasMore, getData, textToast, loadMore, ...toRefs(data) }
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

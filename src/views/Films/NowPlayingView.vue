<template>
  <div class="now-playing">
    <ul class="now-playing-wrap">
      <li class="now-playing-item" v-for="item in items" :key="item" @click="handleChangePage(item.filmId)">
        <a class="now-playing-item-wrap">
          <div class="now-playing-item-image">
            <img class="target-img" :src='item.poster'/>
          </div>
          <div class="now-playing-item-info">
            <div class="now-playing-film-name info-col">
              <span class="name">{{item.name}}</span>
              <span class="item">{{item.item.name}}</span>
            </div>
            <div class="now-playing-film-actors info-col">
              <span class="label">主演：<span v-for="actor in item.actors" :key="actor">{{actor.name}}&nbsp;</span></span>
            </div>
            <div class="now-playing-film-detail info-col">
              <span class="label">上映日期：<span>{{item.premiereAt}}</span></span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
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
    fetch(myRequest).then(res => res.json()).then(res => { this.items = res.data.films })

    // fetch('/ajax/movieOnInfoList').then(res => res.json()).then(data => { this.items = data.movieList; console.log(this.items) })
    // axios({
    //   url: url,
    //   headers: {
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"164994640625984552140801","bc":"110100"}',
    //     'X-Host': 'mall.film-ticket.film.list'
    //   }
    // }).then(res => { console.log(res.data.data); this.items = res.data.data.films })
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
    }
  }
}
</script>

<style lang="scss" scoped>
  ul{
    margin: 0;
    padding: 0;
    li{
      padding: 0;
      margin: 0;
      overflow: hidden;
      height: 150px;
      text-align: left;
      text-indent: 20px;
      img{
        float:left;
        width:20%;
      }
      p{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
      }
      h3{
        margin: 0;
        font-weight: 400;
        color: rgb(25,25,25)
      }
    }
  }
</style>

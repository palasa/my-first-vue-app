<template>
  <div class="now-playing">
    <ul>
      <li v-for="item in items" :key="item" @click="handleChangePage(item)">
        <img :src="item.img" />
        <h3>{{item.nm}}</h3>
        <p>观众评分：{{item.sc}}</p>
        <p alt="{{item.star}}">主演：{{item.star}}</p>
        <p>{{item.showInfo}}</p>
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
    // const url = '/maizuo/gateway?cityId=110100&pageNum=1&pageSize=1&type=1&k=4271989'
    // const myRequest = new Request(url, {
    //   method: 'GET',
    //   // mode: 'cors',
    //   cache: 'default',
    //   headers: new Headers({
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
    //     'X-Host': 'mall.film.ticket.film.list'
    //   })
    // })
    // fetch(myRequest).then(res => { console.log(res); return res.json() }).then(data => console.log(data))
    fetch('/ajax/movieOnInfoList').then(res => res.json()).then(data => { this.items = data.movieList; console.log(this.items) })
  },
  methods: {
    handleChangePage (item) {
      // console.log(index)
      // 编程式导航，通过路径跳转
      // this.$router.push(`/detail/${index}`)

      // 编程式导航， 通过name 跳转
      // console.log(item)
      this.$router.push({
        name: 'filmDetail',
        params: {
          filmId: item.id
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
      }
    }
  }
</style>

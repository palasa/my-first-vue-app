
<template>
  <nav v-if="$store.state.isNavibarShow">
    <router-link to="/films" ><i class="icofont-movie"></i></router-link>
    <router-link to="/cinema"><i class="icofont-bank-alt"></i></router-link>
    <router-link to="/center"><i class="icofont-home"></i></router-link>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{item}}</li>
    </ul>
  </nav>

  <!-- 为路由预留的位置，会把对应的View渲染在这里 -->
  <router-view/>
</template>

<script>
// import bus from 'vue3-eventbus'
// import SideBar from './components/SideBar'
// import NaviBar from './components/NaviBar'
// import { vue } from 'vue'
// vue.component()

export default {
  // components: { NaviBar, SideBar },
  data () {
    return {
      items: [],
      isShow: true
    }
  },
  // methods: {
  //   handleAdd () {
  //     console.log('1111')
  //     this.items.push(this.$refs.myText.value)
  //   }
  // },
  mounted () {
    // 跨域，需要在vue.config.js中配置反向代理
    // fetch('/maoyan/movieOnInfoList').then(res => res.json()).then(data => console.log(data))
    // bus.on('bottomNavibar', (state) => {
    //   this.isShow = state
    // })
    // console.log()
  }
}
</script>

<style lang="css">
a:visited {
  color: rgb(25,25,25);
}
</style>
<style lang="scss" scoped >
*{
  margin: 0 ;
  padding: 0;
  font-family: 'Microsoft YaHei',Tahoma, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
html{
  height: 100%;
}
li{
  list-style-type: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: white;
  z-index: 5000;
  // padding: 30px;
  display: flex;
    a{
      flex:1;
      line-height: 50px;
      text-align: center;
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;
      font-size: 30px;
        &.router-link-exact-active {
          color: hsl(0, 100%, 36%);
        }
    }
  a {

    &.router-link-active {
      color: rgb(255,95,22);
    }
    &.router-link-exact-active {
      color: rgb(255,95,22);
    }
  }
}

/* app中添加样式 */
// ul{
//   list-style-type: none;
//   li{
//     background: yellow;
//   }
// }
</style>

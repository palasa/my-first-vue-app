
<template>
  <nav>
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> | -->
    <router-link to="/films" ><i class="icofont-movie"></i></router-link>
    <router-link to="/cinema"><i class="icofont-bank-alt"></i></router-link>
    <router-link to="/center"><i class="icofont-home"></i></router-link>
    <!-- hello vue
    <input type="text" ref="myText"/>
    <button @click="handleAdd()">+</button> -->

    <ul>
      <li v-for="(item, index) in items" :key="index">{{item}}</li>
    </ul>

 <!--    <navi-bar>
      <button @click="isShow=!isShow">click</button>
    </navi-bar>
    <side-bar v-show="isShow"></side-bar> -->
  </nav>

  <!-- 为路由预留的位置，会把对应的View渲染在这里 -->
  <router-view/>
</template>

<script>

// import SideBar from './components/SideBar'
// import NaviBar from './components/NaviBar'
// import { vue } from 'vue'
// vue.component()

export default {
  // components: { NaviBar, SideBar },
  data () {
    return {
      items: [],
      isShow: false
    }
  },
  methods: {
    handleAdd () {
      console.log('1111')
      this.items.push(this.$refs.myText.value)
    }
  },
  mounted () {
    // 跨域，需要在vue.config.js中配置反向代理
    // fetch('/maoyan/movieOnInfoList').then(res => res.json()).then(data => console.log(data))
  }
}
</script>

<style lang="scss" scoped >
*{
  margin: 0;
  padding: 0;
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
a:visited{
  color: black;
}
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: white;
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
  // a {
  //   font-weight: bold;
  //   color: #2c3e50;

  //   &.router-link-exact-active {
  //     color: #42b983;
  //   }
  // }
}

/* app中添加样式 */
// ul{
//   list-style-type: none;
//   li{
//     background: yellow;
//   }
// }
</style>

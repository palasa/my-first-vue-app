
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/films">Films</router-link> |
    <router-link to="/cinema">Cinema</router-link> |
    <router-link to="/center">Center</router-link> |
    hello vue
    <input type="text" ref="myText"/>
    <button @click="handleAdd()">+</button>

    <ul>
      <li v-for="(item, index) in items" :key="index">{{item}}</li>
    </ul>

    <navi-bar>
      <button @click="isShow=!isShow">click</button>
    </navi-bar>
    <side-bar v-show="isShow"></side-bar>
  </nav>

  <!-- 为路由预留的位置，会把对应的View渲染在这里 -->
  <router-view/>
</template>

<script>

import SideBar from './components/SideBar'
import NaviBar from './components/NaviBar'
// import { vue } from 'vue'
// vue.component()

export default {
  components: { NaviBar, SideBar },
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
    fetch('/ajax/movieOnInfoList').then(res => res.json()).then(data => console.log(data))
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/* app中添加样式 */
ul{
  list-style-type: none;
  li{
    background: yellow;
  }
}
</style>

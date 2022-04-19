import { createStore } from 'vuex'
import axios from 'axios'
import { HIDE_NAVIBAR_MUTATION, SHOW_NAVIBAR_MUTATION, FILL_COMING_SOON_LIST_MUTATION } from '@/mutation-types/index'

export default createStore({
  // 在组件中通过this.$store.state中使用
  // 自定义共享状态
  state: {
    // render component
    isNavibarShow: true,
    comingSoonList: []
  },
  getters: {
  },
  mutations: {
    // 唯一允许修改状态的位置
    // mutation state , mutation中必须是同步函数，异步置于action中
    [HIDE_NAVIBAR_MUTATION] (state, data) {
      state.isNavibarShow = data
    },
    [SHOW_NAVIBAR_MUTATION] (state, data) {
      state.isNavibarShow = data
    },
    [FILL_COMING_SOON_LIST_MUTATION] (state, data) {
      state.comingSoonList = data
      // console.log('data:', state.comingSoonList)
      // state.comingSoonList.forEach(element => {
      //   console.log(element)
      // })
    }
  },
  // asyncs
  actions: {
    getComingSoonListAction (store) {
      axios({
        url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=8997091',
        headers: {
          'X-Host': 'mall.film-ticket.film.list',
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"164994640625984552140801","bc":"110100"}'
        }
      }).then(res => {
        console.log(res.data.data.films)
        store.commit(FILL_COMING_SOON_LIST_MUTATION, res.data.data.films) // commit to mutation
      })
    }
  },
  modules: {
  }
})

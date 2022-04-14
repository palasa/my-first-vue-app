<template>
  <div class="now-playing">
    now playing
    <ul>
      <li v-for="(item, index) in items" :key="item" @click="handleChangePage(index)">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: ['11111', '22222', '33333']
    }
  },
  methods: {
    handleChangePage (index) {
      // console.log(index)
      // 编程式导航，通过路径跳转
      // this.$router.push(`/detail/${index}`)

      // 编程式导航， 通过name 跳转
      this.$router.push({
        name: 'filmDetail',
        params: {
          filmId: index
        }
      })
    }
  }
}
</script>

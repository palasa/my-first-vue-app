<template>
  <ul class="infiniteUl" id="refreshScroll" style='height: 300px;'>
    <nut-infiniteloading
      pull-icon="JD"
      container-id="refreshScroll"
      :use-window="false"
      :is-open-refresh="true"
      :has-more="refreshHasMore"
      @load-more="refreshLoadMore"
      @refresh="refresh"
    >
      <li
        class="infiniteLi"
        v-for="(item, index) in refreshList"
        :key="index"
        >{{ item }}</li
      >
    </nut-infiniteloading>
  </ul>
</template>

<script>
import { ref, reactive, onMounted, toRefs } from 'vue'
import { Toast } from '@nutui/nutui'
export default {
  setup (props) {
    const refreshHasMore = ref(true)
    const data = reactive({
      refreshList: []
    })
    const refreshLoadMore = done => {
      setTimeout(() => {
        const curLen = data.refreshList.length
        for (let i = curLen; i < curLen + 10; i++) {
          data.refreshList.push(
              `${i}`
          )
        }
        if (data.refreshList.length > 30) refreshHasMore.value = false
        done()
      }, 500)
    }

    const refresh = (done) => {
      setTimeout(() => {
        Toast.success('刷新成功')
        done()
      }, 1000)
    }
    const init = () => {
      for (let i = 0; i < 10; i++) {
        data.refreshList.push(`${i}`)
      }
    }
    onMounted(() => {
      init()
    })
    return { refreshLoadMore, refreshHasMore, refresh, ...toRefs(data) }
  }
}
</script>

<style>
.infiniteUl {
  height: 300px;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background:#eee
}
.infiniteLi {
  margin-top: 10px;
  font-size: 14px;
  color: rgba(100, 100, 100, 1);
  text-align: center;
}
</style>

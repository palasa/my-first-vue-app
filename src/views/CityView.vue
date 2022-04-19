<template>
    <div class="city" ref="container">
        <nut-navbar @on-click-back="back" title="当前城市">
            <template #left>
                <div>返回</div>
            </template>
        </nut-navbar>
            <nut-searchbar v-model="searchValue">
            <template v-slot:leftin>
            <nut-icon size="14" name="search"></nut-icon>
            </template>
        </nut-searchbar>

        <nut-row>
            <nut-col :span="24">
                <div class="flex-content">GPS定位你所在的城市</div>
            </nut-col>
        </nut-row>
        <nut-row>
            <nut-col :span="24">
                <div class="flex-content"><nut-button type="default">定位失败</nut-button></div>
            </nut-col>
        </nut-row>
        <nut-row>
            <nut-col :span="24">
                <div class="flex-content">热门城市</div>
            </nut-col>
        </nut-row>
        <nut-row>
            <nut-col :span="8">
                <div class="flex-content"><nut-button type="default">北京</nut-button></div>
            </nut-col>
            <nut-col :span="8">
                <div class="flex-content"><nut-button type="default">上海</nut-button></div>
            </nut-col>
            <nut-col :span="8">
                <div class="flex-content"><nut-button type="default">广州</nut-button></div>
            </nut-col>
        </nut-row>
        <nut-row>
            <nut-col :span="8">
                <div class="flex-content"><nut-button type="default">深圳</nut-button></div>
            </nut-col>
            <nut-col :span="8">
                <div class="flex-content"><nut-button type="default">上海</nut-button></div>
            </nut-col>
            <nut-col :span="8">
                <div class="flex-content"><nut-button type="default">广州</nut-button></div>
            </nut-col>
        </nut-row>

        <nut-elevator :index-list="cityList" :height="300" :showIndicator="true" @click-item="clickItem" @click-index="clickIndex"></nut-elevator>
    </div>
</template>

<script>
import { toRefs, reactive } from 'vue'
import { formatCities } from '@/libs/DataHandler'
import { SHOW_NAVIBAR_MUTATION, HIDE_NAVIBAR_MUTATION } from '@/mutation-types/index'
// import { Elevator } from '@nutui/nutui'
export default {
  beforeMount () {
    this.$store.commit(HIDE_NAVIBAR_MUTATION, false)
  },
  unmounted () {
    this.$store.commit(SHOW_NAVIBAR_MUTATION, true)
  },
  mounted () {
    // const url = 'https://m.maizuo.com/gateway?k=7106603'
    const url = 'maoyan/api/dianying/cities.json'
    // const headers = {
    // 'X-Host': 'mall.film-ticket.city.list',
    // 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"164994640625984552140801"}'
    // }
    fetch(url).then(res => res.json()).then(res => {
      this.cityList = formatCities(res)
    })
  },
  setup () {
    const state = reactive({
      searchValue: '',
      acceptKey: 'num',
      cityList: []
    })

    const container = ''

    const methods = {
      back () {
        alert('点击返回')
      },
      clickItem (key, item) {
        console.log(key, JSON.stringify(item))
      },
      clickIndex (key) {
        console.log(key)
      }
    }

    return {
      container, ...methods, ...toRefs(state)
    }
  }
}
</script>

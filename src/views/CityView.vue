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
            <nut-col :span="6" v-for="hotCity in hotCities" :key="hotCity">
                <div class="flex-content">
                  <nut-button type="default" @click="clickHotCity(hotCity)" >
                    {{hotCity.name}}
                  </nut-button>
                </div>
            </nut-col>
        </nut-row>

        <nut-elevator :index-list="cityList" :height="250" :showIndicator="true" @click-item="clickItem" @click-index="clickIndex"></nut-elevator>
    </div>
</template>

<script>
import { toRefs, reactive } from 'vue'
import { formatMaizuoCities, getMaizuoHotCities } from '@/libs/DataHandler'
import { useRouter } from 'vue-router'
// import { Elevator } from '@nutui/nutui'
export default {
  mounted () {
    const url = 'maizuo/gateway?k=6882711'
    const headers = {
      'X-Host': 'mall.film-ticket.city.list',
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"164994640625984552140801"}'
    }
    fetch(url, { headers }).then(res => res.json()).then(res => {
      this.hotCities = getMaizuoHotCities(res)
      this.cityList = formatMaizuoCities(res)
      console.log(this.cityList)
    })
  },
  setup () {
    const router = useRouter()
    const state = reactive({
      searchValue: '',
      acceptKey: 'num',
      hotCities: [],
      cityList: []
    })

    const container = ''

    const methods = {
      back () {
        router.go(-1)
      },
      clickItem (key, item) {
        // console.log(key, JSON.stringify(item))
        localStorage.setItem('cityId', item.id)
        localStorage.setItem('cityName', item.name)
        router.push('/cinema')
      },
      clickIndex (key) {
        console.log(key)
      },
      clickHotCity (hotCity) {
        // console.log(cityId)
        localStorage.setItem('cityId', hotCity.cityId)
        localStorage.setItem('cityName', hotCity.name)
        router.push('/cinema')
      }
    }

    return {
      container, ...methods, ...toRefs(state)
    }
  }
}
</script>

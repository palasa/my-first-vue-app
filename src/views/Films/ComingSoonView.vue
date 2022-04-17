<template>
  <div class="coming-soon">
    <ul class="coming-soon-wrap">
      <li class="coming-soon-item" v-for="item in $store.state.comingSoonList" :key="item.filmId">
        <a class="coming-soon-item-wrap">
          <div class="coming-soon-item-image">
            <img class="target-img" :src='item.poster'/>
          </div>
          <div class="coming-soon-item-info">
            <div class="coming-soon-film-name info-col">
              <span class="name">{{item.name}}</span>
              <span class="item">{{item.item.name}}</span>
            </div>
            <div class="coming-soon-film-actors info-col">
              <span class="label">主演：<span v-for="actor in item.actors" :key="actor">{{actor.name}}&nbsp;</span></span>
            </div>
            <div class="coming-soon-film-detal info-col">
              <span class="label">上映日期：
                <span>{{getWeekday(item.premiereAt)}}&nbsp;</span>
                <span>{{getMonthAndDay(item.premiereAt)}}</span>
              </span>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <div class="no-more">- 无更多电影 -</div>
  </div>
</template>

<script>
import { getMonthAndDay, getWeekday } from '@/libs/DateTime'
export default {

  mounted () {
    if (this.$store.state.comingSoonList.length === 0) {
      // Vue Component dispatch to action
      this.$store.dispatch('getComingSoonListAction').then()
    } else {
      // use cache
      // console.log('use cache')
    }
  },
  computed: {
    getMonthAndDay, getWeekday
  }

}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.coming-soon-wrap{
  list-style: none;
  margin-left: 15px;
  width: 100%;
  .coming-soon-item {
    padding: 15px 30px 15px 0;
    border-bottom: 1px solid rgb(235, 235, 235);
    &-wrap {
      display: flex;
      -webkit-box-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      align-items: center;
      .coming-soon-item-image{
        float: left;
        width:66px;
        height: 94px;
        .target-img{
          width: 64px;
          border-radius: 2px;
        }
      }
      .coming-soon-item-info{
        float:left;
        padding: 0 10px;
        width: calc(100% - 116px);
        .coming-soon-film-name{
          .name{
            height: 22px;
            line-height: 22px;
            margin-right: 5px;
            color: rgb(25,25,25);
            max-width: calc(100% - 25px);
          }
          .item{
            color: white;
            background-color: rgb(200,200,200);
            font-size: 9px;
            height: 22px;
            line-height: 22px;
            vertical-align: middle;
            padding: 2px;
            border: 2px;
            border-radius: 2px;
          }
        }
        .info-col{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          .label{
            font-size: 13px;
            color: rgb(120,120,120);
          }
        }
      }
    }
  }
}
.no-more{
  height: 60px;
  line-height: 60px;
  color: rgb(200,200,200);
  background-color: rgb(237,237,237);
  margin:auto;
  text-align: center;
  font-size: 13px;
}
</style>

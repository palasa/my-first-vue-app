
<template>
  <div>
      sidebar
      <ul>
        <li>11111</li>
        <li>22222</li>
        <li>33333</li>
      </ul>
  </div>
</template>

<script>
export default {

}
</script>

/* 样式覆盖  scoped属性确保仅被在组件中使用 */
<style lang="scss" scoped>
  ul{
    list-style-type: none;
    li{
      background: blue;
    }
  }
</style>

<template>
  <div class="center">
    <img alt="Vue logo" src="../assets/logo.png">
    center
  </div>
</template>

<script>
const auth = {
  isLogin: () => {
    return false
  }
}

export default {
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 comfirm前调用
    // 不能获取组件实例 this
    // 因为当守卫执行前，组件实例还没被创建
    // 局部盘查
    console.log('局部盘查')
    if (!auth.isLogin()) {
      next()
    } else {
      next('/login')
    }
  }
}
</script>

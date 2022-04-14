<template>
  <div class="detail">detai view</div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$route.params.filmId)
  }
}
</script>

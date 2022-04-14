<template>
  <div class="detail">detail view</div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$route.params.filmId)
  }
}
</script>

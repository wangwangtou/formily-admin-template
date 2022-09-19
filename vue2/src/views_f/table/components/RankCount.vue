<template>
  <span>
    <svg-icon
      v-for="n in +value"
      :key="n"
      icon-class="star"
      class="icon-star"
    />
  </span>
</template>

<script>
export default {
  name: 'RankCount',
  props: {
    value: {
      type: Number,
      default() {
        return 0
      }
    }
  }
}
</script>
<style scoped>
.icon-star {
  margin-right: 2px;
}
</style>
<template>
  <div ref='div'></div>
</template>

<script>
export default {
  name: 'Designable',
  data() {
    return {
      playground: null
    }
  },
  async mounted() {
    const { default: Playground } = await window.System.import('playground')
    debugger
    this.playground = new Playground()
    this.playground.render(this.$refs.div)
  },
  destroyed() {
    this.playground && this.playground.unmount()
  }
}
</script>

<style>

</style>
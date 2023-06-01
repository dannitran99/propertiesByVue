<template>
  <div>
    <bread-crumb v-bind:items="breadCrumb"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadCrumb: [
        'Tin tức'
      ]
    }
  }
}
</script>

<style>

</style>

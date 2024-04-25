<template>
  <div>
    <div :class="[{'point-event' : isLoading},'wrapper']">
      <div class="content">
        asdasd
      </div>
      <div class="user-info">
        sad
      </div>
    </div>
    <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading: {
      get () {
        return this.$store.getters['properties/isLoading']
      }
    },
    data: {
      get () {
        return this.$store.getters['properties/data']
      }
    }
  },
  async created () {
    await this.$store.dispatch('properties/getPropertiesDetail', {
      id: this.$route.path.split('/')[2]
    })
  }
}
</script>

<style scoped>
.wrapper{
  position: relative;
  display: flex;
  margin: 0 auto;
  max-width: 1140px;
}
.content{
  width: 848px;
  /* margin-right: 30px */
}
.user-info{
  width: 262px
}
.loading{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
.point-event{
  filter: blur(1px);
  pointer-events: none;
}
</style>

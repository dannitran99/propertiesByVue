<template>
  <div class="wrapper"
      :class="[{'show' : isDisplay}]">
    <img v-bind:src="data.thumbnail">
    <p><b>{{ data.name }}</b></p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    isDisplay: {
      get () {
        const current = this.$store.getters['news/previewNewsItem']
        if (current) {
          return current._id === this.data._id
        }
        return false
      }
    }
  }
}
</script>

<style scoped>
  .wrapper{
    display: flex;
    flex-direction: column;
    gap: 0;
    cursor: pointer;
    transition: opacity .222s ease-in-out;
    width: 0;
    overflow: hidden;
    opacity: 0;
  }
  img{
    border-radius: 4px;
    width: 458px;
    height: 257px;
    margin-bottom: 16px;
  }
  p{
    text-align: left;
    font-size: 24px;
    line-height: 32px;
    font-weight: normal !important;
    letter-spacing: -0.2px;
    margin-top: 0;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p:hover{
    color: #999;
  }
  .show{
    width: 458px;
    opacity: 1;
  }
</style>

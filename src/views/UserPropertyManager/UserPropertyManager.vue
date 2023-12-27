<template>
  <div class="content">
    <side-bar/>
    <div class="main-area">
      <div>
        <p>{{ state }}</p>
        <button @click="changeState">Change State</button>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../../components/SideBar'
export default {
  components: { SideBar },
  data () {
    return {
      state: 'initial state'
    }
  },
  methods: {
    changeState () {
      this.state = 'new state'
    }
  }
}
</script>

<style scoped>
.content{
  display: flex;
}
.main-area{
  background-color: rgb(249, 249, 249);
  width: 100%;
}
</style>

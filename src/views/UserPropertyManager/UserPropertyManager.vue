<template>
  <div class="content">
    <side-bar/>
    <div class="main-area" :class="[{'hide' : !drawer}]">
      <div class="header">
        <div class="content-main">
          <h2>Danh sách tin</h2>
        </div>
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
      // state: 'initial state'
    }
  },
  computed: {
    drawer: {
      get () {
        return this.$store.getters['user/drawer']
      }
    }
  }
  // methods: {
  //   changeState () {
  //     this.state = 'new state'
  //   }
  // }
}
</script>

<style scoped>
.content{
  display: flex;
}
.main-area{
  background-color: rgb(249, 249, 249);
  width: calc(100vw - 256px);
  transition: all .2s ease;
}
.hide{
  width: 100vw;
}
.header{
  background-color: white;
  height: 150px;
  border-bottom: 1px solid rgb(242, 242, 242);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
}
.content-main{
  width: 1320px;
}
</style>

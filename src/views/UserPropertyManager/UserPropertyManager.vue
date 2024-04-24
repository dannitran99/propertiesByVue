<template>
  <div class="content">
    <side-bar/>
    <div class="main-area" :class="[{'hide' : !drawer}]">
      <div class="header">
        <div class="content-main">
          <h2>Danh sách tin</h2>
        </div>
      </div>
      <div class="content-main">
        <template v-if="isLoading">
          <properties-skeleton/>
          <properties-skeleton/>
          <properties-skeleton/>
          <properties-skeleton/>
        </template>
        <properties :hideInfo="true" v-for="item in properties" :key="item.ID" :data="item" v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../../components/SideBar'
import PropertiesSkeleton from '../../components/Properties/PropertyCardSkeleton.vue'
export default {
  components: { SideBar, PropertiesSkeleton },
  computed: {
    drawer: {
      get () {
        return this.$store.getters['user/drawer']
      }
    },
    isLoading: {
      get () {
        return this.$store.getters['properties/isLoading']
      }
    },
    properties: {
      get () {
        return this.$store.getters['properties/propertiesList']
      }
    }
  },
  async created () {
    await this.$store.dispatch('properties/getPostedProperty', {
      user: localStorage.getItem('username')
    })
  }
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
  overflow: auto;
  height: calc(100vh - 72px) ;
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
  margin: 20px auto 0;
}
.content-main >:not(:last-child){
  margin-bottom: 30px;
}
</style>

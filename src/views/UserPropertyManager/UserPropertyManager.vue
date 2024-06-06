<template>
  <div class="content">
    <side-bar />
    <div class="main-area" :class="[{ 'hide': !drawer }]">
      <div class="header">
        <div class="content-main">
          <h2>Danh sách tin</h2>
        </div>
      </div>
      <div class="content-main">
        <template v-if="isLoading">
          <properties-skeleton />
          <properties-skeleton />
          <properties-skeleton />
          <properties-skeleton />
        </template>
        <template v-else>
          <template v-if="properties.length">
            <properties :hideInfo="true" v-for="item in properties" :key="item.ID" :data="item" />
          </template>
          <div class="none-data" v-else>
            <p>Tin đăng của bạn sẽ được tiếp cận hơn 6 triệu người <br /> tìm mua/thuê bất động sản mỗi tháng</p>
            <router-link :to="{ name: 'PostProperty' }" class="btn-submit">Đăng tin ngay</router-link>
          </div>
        </template>
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
      get() {
        return this.$store.getters['user/drawer']
      }
    },
    isLoading: {
      get() {
        return this.$store.getters['properties/isLoading']
      }
    },
    properties: {
      get() {
        return this.$store.getters['properties/propertiesListPosted']
      }
    }
  },
  async created() {
    await this.$store.dispatch('properties/getPostedProperty', {
      user: localStorage.getItem('username')
    })
  }
}
</script>

<style scoped>
h2 {
  font-weight: 400;
}

.content {
  display: flex;
}

.main-area {
  background-color: rgb(249, 249, 249);
  width: calc(100vw - 256px);
  transition: all .2s ease;
  overflow: auto;
  height: calc(100vh - 72px);
}

.hide {
  width: 100vw;
}

.header {
  background-color: white;
  height: 150px;
  border-bottom: 1px solid rgb(242, 242, 242);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
}

.content-main {
  width: 1320px;
  margin: 20px auto 0;
}

.content-main>:not(:last-child) {
  margin-bottom: 30px;
}

.none-data {
  margin-top: 100px;
  text-align: center;
}

.none-data p {
  font-family: 'Roboto-Regular', sans-serif;
}

.btn-submit {
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgb(224, 60, 49);
  padding: 12px 6px;
  color: rgb(255, 255, 255);
  opacity: 1;
  border: none;
  transition: opacity .2s ease;
}

.btn-submit:hover {
  opacity: .7;
}
</style>

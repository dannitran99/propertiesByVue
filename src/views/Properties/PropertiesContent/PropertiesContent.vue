<template>
  <div>
    <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
    <div class="wrapper" v-else>
      <div class="content">
        <carousel :imageList="data.images"/>
      </div>
      <div class="user-info">
        <img :src="data.avatar" alt="avatar"  class="avatar-img" v-if="data.avatar">
        <v-avatar color="rgb(255, 236, 235)" size="64" v-else>
          <span class="text-h6 avt-text">{{ data.name.split(' ').reverse()[0][0].toUpperCase() }}</span>
        </v-avatar>
        <p class="txt-name">{{ data.name }}</p>
        <button class="btn-reveal" @click="handleReveal">
          <icon-phone/>{{ phoneReveal? data.phoneNumber : phoneNumber }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phoneReveal: false
    }
  },
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
    },
    phoneNumber: function () {
      return `${this.data.phoneNumber.slice(0, -3)}*** Hiện số`
    }
  },
  async created () {
    await this.$store.dispatch('properties/getPropertiesDetail', {
      id: this.$route.path.split('/')[2]
    })
  },
  methods: {
    handleReveal: function () {
      this.phoneReveal = true
    }
  }
}
</script>

<style scoped>
.wrapper{
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1140px;
  margin-top: 16px;
}
.content{
  width: 848px;
  /* margin-right: 30px */
}
.user-info{
  width: 262px;
  height:fit-content ;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loading{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
.avt-text{
  font-weight: 500;
  color: rgb(116, 21, 15);
}

.avatar-img{
  border-radius: 100%;
  width: 64px;
  height: 64px;
  object-fit: cover;
}
.txt-name{
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -.2px;
  white-space: nowrap;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  color: #2C2C2C;
  margin-top: 4px;
  margin-bottom: 16px;
}
.btn-reveal{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: #fff;
  background: #009BA1;
  font-size: 14px;
  line-height: 20px;
  padding: 14px 16px;
  border-radius: 4px;
}
</style>

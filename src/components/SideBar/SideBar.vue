<template>
    <v-navigation-drawer v-model="drawer" class="drawer">
      <div class="user-info">
        <img :src="avatar" alt="avatar"  class="avatar-img" v-if="avatar">
        <v-avatar color="rgb(255, 236, 235)" size="64" v-else>
          <span class="text-h5 avt-text">{{ username.split(' ').reverse()[0][0].toUpperCase() }}</span>
        </v-avatar>
        <p class="txt-user">{{ username }}</p>
      </div>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" @click="navigate(item)" class="list-item" :class="[{'active' : current.includes(item.path)}]">
          <v-list-item-content>
            <v-list-item-title class="txt-item">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="btn-hide" @click="hideDrawer">
        <icon-leftarrow />
      </div>
    </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Đăng mới', path: '/dang-tin' },
      { title: 'Danh sách tin', path: '/danh-sach' },
      { title: 'Quản lý tài khoản', path: '/tai-khoan' }
    ],
    username: undefined,
    current: ''
  }),
  computed: {
    avatar: {
      get () {
        return this.$store.getters['user/avatar']
      }
    }
  },
  methods: {
    navigate (item) {
      !this.current.includes(item.path) && this.$router.push(item.path)
    },
    hideDrawer () {
      this.drawer = false
    }
  },
  created () {
    this.current = this.$route.path
    this.username = localStorage.getItem('username')
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .drawer{
    background-color: transparent;
    height: calc(100vh - 72px) !important;
    overflow: visible;
  }
  .avt-text{
    font-weight: 600;
    color: rgb(116, 21, 15);
  }
  .user-info{
    display: flex;
    padding: 16px;
    align-items: center;
  }
  .txt-user{
    margin: 0 0 0 15px;
    font-weight: 700;
  }
  .btn-hide{
    position: absolute;
    top: 16px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(50%,0);
    margin-top: 16px;
    z-index: 99;
    box-shadow: rgba(182, 182, 182, 0.18) 0px 4px 8px;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    background-color: white;
    cursor: pointer;
  }
  .list-item{
    height: 48px;
    padding: 14px 16px 14px 52px;
    border-left: 2px solid transparent;
  }
  .txt-item{
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }
  .active{
    background-color: rgb(242, 242, 242);
    border-left: 2px solid red;
  }
  .avatar-img{
    border-radius: 100%;
    width: 64px;
    height: 64px;
    object-fit: cover;
  }
</style>

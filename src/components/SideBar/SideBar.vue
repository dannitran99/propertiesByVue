<template>
  <div class="wrapper">
    <v-navigation-drawer :value="drawer" class="drawer" :class="[{ 'hide': !drawer }]">
      <div class="user-info">
        <img :src="avatar" alt="avatar" class="avatar-img" v-if="avatar">
        <v-avatar color="rgb(255, 236, 235)" size="64" v-else>
          <span class="text-h5 avt-text">{{ username.split(' ').reverse()[0][0].toUpperCase() }}</span>
        </v-avatar>
        <p class="txt-user">{{ username }}</p>
      </div>
      <v-list>
        <div v-for="(item, i) in items" :key="i">
          <template v-if="item.role ? item.role.includes(role) : true">
            <v-list-item class="list-sub-header" name="asdasd">
              <component :is="item.icon" />
              {{ item.subHeader }}
            </v-list-item>
            <template v-for="(subitem, j) in item.sub">
              <v-list-item @click="navigate(subitem)" class="list-item" :key="j"
                :class="[{ 'active': current.includes(subitem.path) }]"
                v-if="subitem.role ? subitem.role.includes(role) : true">
                <v-list-item-content>
                  <v-list-item-title class="txt-item">{{ subitem.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </template>
        </div>
      </v-list>
    </v-navigation-drawer>
    <div class="btn-hide" :class="[{ 'active-hide': !drawer }]" @click="hideDrawer">
      <icon-leftarrow />
    </div>
  </div>
</template>

<script>
import { parseJwt } from '@/helpers/JWTVerify'
export default {
  data: () => ({
    items: [
      {
        subHeader: 'Quản lý tin đăng',
        icon: 'icon-menulist',
        sub: [
          { title: 'Đăng mới', path: '/dang-tin' },
          { title: 'Danh sách tin', path: '/danh-sach' }
        ]
      },
      {
        subHeader: 'Quản lý TK Cá nhân',
        icon: 'icon-person',
        sub: [
          { title: 'Chỉnh sửa thông tin cá nhân', path: '/tai-khoan' },
          { title: 'Cài đặt tài khoản', path: '/doi-mat-khau' },
          { title: 'Môi giới chuyên nghiệp', path: '/dang-ky-moi-gioi', role: ['user', 'agency'] }
        ]
      },
      {
        subHeader: 'Quản lý TK Doanh nghiệp',
        icon: 'icon-building',
        sub: [
          { title: 'Đăng ký tài khoản Doanh nghiệp', path: '/dang-ky-doanh-nghiep' }
        ],
        role: ['user', 'enterprise']
      },
      {
        subHeader: 'Quản trị viên',
        icon: 'icon-box',
        sub: [
          { title: 'Yêu cầu đăng ký môi giới', path: '/yeu-cau-moi-gioi' },
          { title: 'Yêu cầu xóa tài khoản', path: '/yeu-cau-xoa-tai-khoan' },
          { title: 'Quản lý doanh nghiệp', path: '/quan-ly-doanh-nghiep' },
          { title: 'Đăng tin tức', path: '/tao-tin' }
        ],
        role: ['admin']
      }
    ],
    username: undefined,
    current: '',
    role: undefined
  }),
  computed: {
    avatar: {
      get() {
        return this.$store.getters['user/avatar']
      }
    },
    drawer: {
      get() {
        return this.$store.getters['user/drawer']
      }
    }
  },
  methods: {
    navigate(item) {
      !this.current.includes(item.path) && this.$router.push(item.path)
    },
    hideDrawer() {
      this.$store.dispatch('user/toggleDrawer')
    }
  },
  watch: {
    '$route'() {
      this.current = this.$route.path
    }
  },
  created() {
    this.current = this.$route.path
    this.username = localStorage.getItem('username')
    const parseToken = parseJwt(localStorage.token)
    this.role = parseToken.role
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.wrapper {
  position: relative;
}

.drawer {
  background-color: transparent;
  height: calc(100vh - 72px) !important;
  overflow: visible;
}

.hide {
  width: 0 !important;
}

.avt-text {
  font-weight: 600;
  color: rgb(116, 21, 15);
}

.user-info {
  display: flex;
  padding: 16px;
  align-items: center;
}

.txt-user {
  margin: 0 0 0 15px;
  font-weight: 700;
}

.btn-hide {
  position: absolute;
  top: 16px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(50%, 0);
  margin-top: 16px;
  z-index: 10;
  box-shadow: rgba(182, 182, 182, 0.18) 0px 4px 8px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background-color: white;
  cursor: pointer;
}

.btn-hide svg {
  transition: .5s;
}

.active-hide {
  right: -20px;
}

.active-hide svg {
  transform: rotate(180deg);
}

.list-item {
  height: 48px;
  padding: 14px 16px 14px 52px;
  border-left: 2px solid transparent;
}

.txt-item {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}

.active {
  background-color: rgb(242, 242, 242);
  border-left: 2px solid red;
}

.avatar-img {
  border-radius: 100%;
  width: 64px;
  height: 64px;
  object-fit: cover;
}

.list-sub-header {
  width: 100%;
  height: 48px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  user-select: none;
}
</style>

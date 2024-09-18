<template>
  <v-navigation-drawer fixed right :value="isShow" class="drawer" width="312" v-click-outside="{
    handler: toggleDrawer,
  }" overlay-opacity=".6">
    <div v-if="login" class="user-info">
      <router-link to="/danh-sach" class="route-main">
        <img :src="avatar" alt="avatar" class="avatar-img" v-if="avatar">
        <v-avatar color="rgb(255, 236, 235)" size="48" v-else>
          <span class="text-h6 avt-text">{{ username.split(' ').reverse()[0][0].toUpperCase() }}</span>
        </v-avatar>
        <p class="txt-user">{{ username }}</p>
      </router-link>
      <router-link :to="{ name: 'PostProperty' }" class="btn-post">
        Đăng tin
      </router-link>
    </div>
    <login-button :isMobile="true" v-else />
    <v-list class="menu-item">
      <template v-if="login">
        <v-list-item class="drawer-item" link>
          <router-link to="/danh-sach" class="route-link">
            <icon-list class="menu-item-icon" />
            <v-list-item-content>
              <v-list-item-title class="menu-item-label">Quản lý tin đăng</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
        <v-list-item class="drawer-item" link>
          <router-link to="/tai-khoan" class="route-link">
            <icon-user class="menu-item-icon" />
            <v-list-item-content>
              <v-list-item-title class="menu-item-label">Thay đổi thông tin cá nhân</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
        <v-list-item class="drawer-item" link>
          <router-link to="/doi-mat-khau" class="route-link">
            <icon-lock class="menu-item-icon" />
            <v-list-item-content>
              <v-list-item-title class="menu-item-label">Thay đổi mật khẩu</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
        <v-list-item class="drawer-item" link v-if="beforeRouteEnter(['user', 'agency'])">
          <router-link to="/dang-ky-moi-gioi" class="route-link">
            <icon-case class="menu-item-icon" />
            <v-list-item-content>
              <v-list-item-title class="menu-item-label">Môi giới chuyên nghiệp</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </template>
      <template v-for="(item, idx) in menu">
        <v-list-group v-if="item.sub" :key="idx" class="drawer-menu-item"
          :class="[{ 'active-drawer': item.path && path === `/${item.path[0]}` }]">
          <template v-slot:activator>
            <router-link :to="{ name: item.href }" class="route-link" v-if="item.href">
              <component :is="item.icon" class="menu-item-icon" />
              <v-list-item-content>
                <v-list-item-title class="menu-item-label">{{ item.label }}</v-list-item-title>
              </v-list-item-content>
            </router-link>
            <template v-else>
              <component :is="item.icon" class="menu-item-icon" />
              <v-list-item-content>
                <v-list-item-title class="menu-item-label">{{ item.label }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </template>
          <v-list-item v-for="(subitem, i) in item.sub" :key="i" link class="drawer-item"
            :class="[{ 'active-item': (item.path && path === `/${item.path[0]}?category=${subitem.path}`) || path === subitem.href }]">
            <router-link
              :to="subitem.href ? { path: subitem.href } : { name: item.href, query: { category: subitem.path } }"
              v-if="subitem.path || subitem.href" class="sub-route">
              <v-list-item-content class="pl-4">
                <v-list-item-title class="menu-item-label">{{ subitem.label }}</v-list-item-title>
              </v-list-item-content>
            </router-link>
            <v-list-item-content class="pl-4" v-else>
              <v-list-item-title class="menu-item-label">{{ subitem.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.label" link
          :class="[{ 'active-item': item.path && path === `/${item.path[0]}` }]" class="drawer-item">
          <router-link :to="{ name: item.href }" class="route-link" v-if="item.href">
            <component :is="item.icon" class="menu-item-icon" />
            <v-list-item-content>
              <v-list-item-title class="menu-item-label">{{ item.label }}</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </template>
      <v-list-item class="drawer-item dark-bg" link v-if="login" @click="logout">
        <v-list-item-content>
          <v-list-item-title class="menu-item-label">Đăng xuất</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { beforeRouteEnter } from '@/helpers/JWTVerify'
import { MENU_ITEM } from '@/consts/label.js'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      menu: MENU_ITEM,
      path: undefined,
      login: false,
      username: undefined
    }
  },
  computed: {
    avatar: {
      get() {
        return this.$store.getters['user/avatar']
      }
    }
  },
  created() {
    this.login = !!localStorage.token
    this.username = localStorage.getItem('username')
  },
  watch: {
    '$route'() {
      this.path = this.$route.fullPath
    }
  },
  methods: {
    toggleDrawer() {
      typeof this.isShow === 'boolean' && !this.isShow && this.$emit('toggle')
    },
    logout: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('avatar')
      location.reload()
    },
    beforeRouteEnter
  }
}
</script>

<style scoped lang="scss">
.drawer {
  z-index: 999;
  background: #F2F2F2;
}

.menu-item {
  padding: 0;
  background-color: #fff !important;
}

.route-link {
  display: flex;
  align-items: center;
  width: 100%;
}

.menu-item-label {
  font-family: 'Roboto-Regular', sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #2C2C2C;
  margin-top: 2px;
  margin-left: 18px;
}

.menu-item-icon {
  margin-left: 2px;
  width: 20px;
  height: 20px;
  color: #2C2C2C;
}

.sub-route {
  width: 100%;
}

.drawer-menu-item {
  >:first-child {
    border-left: 2px solid transparent;
  }
}

.drawer-item {
  border-left: 2px solid transparent;
}

.active-drawer {
  >:first-child {
    border-left: 2px solid #E03C31;
    background-color: #F2F2F2;
  }
}

.active-item {
  border-left: 2px solid #E03C31;
  background-color: #F2F2F2;
}

.user-info {
  padding: 16px;
  background-color: #fff !important;
}

.route-main {
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -.2px;
  color: #505050 !important;
  margin-bottom: 16px;
}

.avatar-img {
  border-radius: 100%;
  width: 48px;
  height: 48px;
  object-fit: cover;
}

.btn-post {
  text-align: center;
  display: block;
  color: #fff;
  background: #E03C31;
  border: solid 1px #E03C31;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -.2px;
  padding: 13px 15px;
  border-radius: 8px;
}

.dark-bg {
  background: #F2F2F2;

  .menu-item-label {
    margin-left: 0;
  }
}
</style>

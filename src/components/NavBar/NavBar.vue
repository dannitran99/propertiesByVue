<template>
  <div class="nav-wrapper">
    <div v-if="isMobile" class="drawer-navbar">
      <button @click.stop="$emit('toggle')" class="navbar-toggle-button">
        <icon-menu />
      </button>
    </div>
    <div class="nav-header" data-app v-else>
      <ul class="menu-list">
        <nav-bar-button v-for="(item, idx) in menu" v-bind:key="idx" v-bind:label="item.label" v-bind:href="item.href"
          v-bind:submenu="item.sub" v-bind:path="item.path" :showFullMenu="showFullMenu" :index="idx" />
        <div v-if="!showFullMenu" class="menu-extend">
          <div class="icon-extend">
            <icon-threedot />
          </div>
          <ul class="sub-menu">
            <sub-menu-button v-for="(item, idx) in menuExtend" v-bind:key="idx" v-bind:label="item.label"
              :hrefName="item.path[0]" class="sub-d1">
              <ul class="sub-menu sub-d2">
                <sub-menu-button v-for="(subItem, idx) in item.sub" v-bind:key="idx" v-bind:label="subItem.label"
                  v-bind:navLink="item.href" v-bind:query="subItem.path" v-bind:path="item.path"
                  :hrefName="subItem.href" />
              </ul>
            </sub-menu-button>
          </ul>
        </div>
      </ul>
      <div ref="info" class="right-navbar">
        <div v-if="login" class="account-info">
          <div class="user-info">
            <router-link to="/danh-sach">
              <img :src="avatar" alt="avatar" class="avatar-img" v-if="avatar">
              <v-avatar color="rgb(255, 236, 235)" size="40" v-else>
                <span class="text-h6 avt-text">{{ username.split(' ').reverse()[0][0].toUpperCase() }}</span>
              </v-avatar>
              <p class="txt-user">{{ username }}</p>
              <icon-downtriangle />
            </router-link>
            <ul class="sub-menu-user">
              <li>
                <router-link to="/danh-sach">
                  <icon-list />Quản lý tin đăng
                </router-link>
              </li>
              <li>
                <router-link to="/tai-khoan">
                  <icon-user />Thay đổi thông tin cá nhân
                </router-link>
              </li>
              <li>
                <router-link to="/doi-mat-khau">
                  <icon-lock />Thay đổi mật khẩu
                </router-link>
              </li>
              <li v-if="beforeRouteEnter(['user', 'agency'])">
                <router-link to="/dang-ky-moi-gioi">
                  <icon-case />Môi giới chuyên nghiệp
                </router-link>
              </li>
              <div class="divider-li"></div>
              <li>
                <button @click="logout"><icon-logout />Đăng xuất</button>
              </li>
            </ul>
          </div>
          <router-link :to="{ name: 'PostProperty' }" class="btn-post">
            Đăng tin
          </router-link>
        </div>
        <login-button :isMobile="isMobile" v-else />
      </div>
    </div>
    <div v-if="isSale || isRent" class="search-nav">
      <div class="btn-tab">
        <router-link :to="{ name: 'PropertiesForSale' }" :class="[{ 'active': isSale }]">
          Bán
        </router-link>
        <router-link :to="{ name: 'PropertiesForRent' }" :class="[{ 'active': isRent }]">
          Cho thuê
        </router-link>
      </div>
      <div class="input-search">
        <icon-magnify />
        <input :value="searchKeyword" type="text" @keyup.enter="handleSearch" @input="handleSearchChange" />
      </div>
      <div class="divider"></div>
      <filter-category class="wide" />
      <div class="divider"></div>
      <filter-location class="wide" />
      <div class="divider"></div>
      <filter-price class="normal" />
      <div class="divider"></div>
      <filter-square class="normal" />
      <div class="divider"></div>
      <div class="filter">
        <div class="title-dv">
          <icon-tune />
          <p>Lọc thêm</p>
        </div>
      </div>
      <div class="divider"></div>
      <button class="filter" @click="clearFilter">
        <div class="title-dv">
          <icon-cached />
          <p>Đặt lại</p>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { beforeRouteEnter } from '@/helpers/JWTVerify'
import { cloneDeep } from '@/helpers/arrayHandler'
import { FILTER_SALE_ID, MENU_ITEM } from '@/consts/label.js'
import NavBarButton from './NavBarButton'
import SubMenuButton from './NavBarButton/SubMenuButton.vue'
import FilterCategory from './NavBarFilter/FilterCategory.vue'
import FilterLocation from './NavBarFilter/FilterLocation.vue'
import FilterPrice from './NavBarFilter/FilterPrice.vue'
import FilterSquare from './NavBarFilter/FilterSquare.vue'

export default {
  name: 'NavBar',
  components: {
    'nav-bar-button': NavBarButton,
    'filter-category': FilterCategory,
    'filter-location': FilterLocation,
    'filter-price': FilterPrice,
    'filter-square': FilterSquare,
    'sub-menu-button': SubMenuButton
  },
  props: {
    isMobile: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      isSale: false,
      isRent: false,
      menu: MENU_ITEM,
      menuExtend: MENU_ITEM.slice(MENU_ITEM.length - 2),
      login: false,
      username: undefined,
      showFullMenu: true
    }
  },
  computed: {
    avatar: {
      get() {
        return this.$store.getters['user/avatar']
      }
    },
    searchKeyword: {
      get() {
        return this.$store.getters['properties/searchKeyword']
      }
    },
    categoryIdFilter: {
      get() {
        let tmp = cloneDeep(this.$store.getters['properties/categoryIdFilter'])
        return tmp.length === FILTER_SALE_ID.length ? [] : tmp
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResizeWindow)
    this.login = !!localStorage.token
    this.username = localStorage.getItem('username')
  },
  mounted() {
    this.handleResizeWindow()
  },
  watch: {
    '$route'(to, from) {
      this.isSale = this.$route.path === '/nha-dat-ban'
      this.isRent = this.$route.path === '/nha-dat-cho-thue'
      if (to.path !== from.path) {
        this.$store.dispatch('properties/clearFilter')
      }
    }
  },
  methods: {
    handleResizeWindow() {
      if (this.$refs['info']) { this.showFullMenu = window.innerWidth - this.$refs['info'].offsetWidth > 1400 }
    },
    beforeRouteEnter,
    logout: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('avatar')
      location.reload()
    },
    handleSearchChange: function (e) {
      this.$store.dispatch('properties/searchChange', e.target.value)
    },
    handleSearch: function () {
      this.$store.dispatch('properties/submitFilter')
    },
    clearFilter: function () {
      this.$store.dispatch('properties/clearFilter')
      this.$store.dispatch('properties/submitFilter')
    }
  }
}
</script>

<style scoped lang="scss">
.menu-list {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 62px;
  padding: 17px 15px 7px 15px;
  margin: 0;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.drawer-navbar {
  height: 72px;
  padding: 15px 0;

  .navbar-toggle-button {
    width: 40px;
    height: 40px;
    padding: 4px;
    margin-right: 5px;
    float: right;

    svg {
      width: 32px;
      height: 32px;
    }
  }
}

.right-navbar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}

.menu-extend {
  position: relative;
  border-radius: 8px;

  .icon-extend {
    padding: 0px 15px 5px 15px;
  }

  svg {
    width: 25px;
    height: 25px;
    color: #999;
  }

  &:hover {
    background: #FAFAFA;

    >.sub-menu {
      display: block;
    }
  }
}

.sub-menu {
  display: grid;
  position: absolute;
  display: none;
  min-width: 240px;
  height: auto;
  border-radius: 8px;
  margin: 0;
  padding-inline: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: #fff;
  box-shadow: 0 8px 20px hsla(0, 0%, 71%, .3);
  text-align: left;
}

.sub-d1 {
  &:hover {
    .sub-d2 {
      display: block;
    }
  }
}

.sub-d2 {
  left: -100%;
  top: 0;
}

.nav-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0 4px 10px hsla(0, 0%, 71%, .18);
}

.nav-header {
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
}

.search-nav {
  font-family: 'Roboto-Regular', sans-serif;
  border-top: 1px solid #F2F2F2;
  height: 57px;
  display: flex;
}

.btn-tab {
  margin: 12px 16px;
  width: 160px;
  display: flex;
}

.btn-tab a {
  height: 32px;
  width: 80px;
  color: #999;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-tab :first-child {
  margin-right: -1px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn-tab :last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.active {
  color: #fff !important;
  background: #505050 !important;
  border-color: #505050 !important;
}

.input-search {
  width: calc((100% - 108px - 108px - 16px - 159px - 16px - 16px - 16px) * 0.3) !important;
  margin: 12px 16px 12px 0;
  background: #F2F2F2;
  border-radius: 4px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  gap: 15px;
}

.input-search input {
  background: #F2F2F2;
  border: none;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  outline: none;
  width: 100%;
}

.divider {
  background: #f2f2f2;
  width: 1px;
  height: 32px;
  margin: 12px 0px;
}

.filter {
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wide {
  width: calc((100% - 108px - 108px - 16px - 159px - 16px - 16px - 16px) * 0.2) !important;
}

.normal {
  width: calc((100% - 108px - 108px - 16px - 159px - 16px - 16px - 16px) * 0.15) !important;
}

.filter:hover {
  background: #F2F2F2;
}

.filter p {
  margin: 0;
}

.filter>:first-child {
  font-size: 12px;
  line-height: 16px;
  color: #2C2C2C;
  margin-bottom: 4px;
  flex-shrink: 0
}

.filter>:last-child {
  font-size: 14px;
  line-height: 20px;
  color: #2C2C2C;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-dv {
  display: flex;
  gap: 5px;
}

.account-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.btn-post {
  color: #2C2C2C;
  border: solid 1px #ccc;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -.2px;
  padding: 13px 15px;
  border-radius: 8px;
}

.user-info {
  position: relative;
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
}

.user-info:hover .sub-menu-user {
  display: block;
}

.sub-menu-user {
  font-family: 'Roboto-Regular', sans-serif;
  list-style-type: none;
  position: absolute;
  display: none;
  width: 250px;
  border-radius: 8px;
  margin: 0;
  padding-inline: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: #fff;
  box-shadow: 0 8px 20px hsla(0, 0%, 71%, .3);
  text-align: left;
  left: -50%;
  bottom: 0;
  transform: translate(0%, 100%);
}

.sub-menu-user li {
  font-size: 14px;
  line-height: 20px;
  padding: 5px 20px;
}

.sub-menu-user li:hover {
  background: #F2F2F2;
}

.sub-menu-user li,
button,
a {
  color: #000 !important;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.avt-text {
  font-weight: 500;
  color: rgb(116, 21, 15);
}

.txt-user {
  font-family: 'Roboto-Regular', sans-serif;
  margin: 0;
  max-width: 100px;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.divider-li {
  border-bottom: 1px solid #f2f2f2;
  margin: 3px 0;
}

.avatar-img {
  border-radius: 100%;
  width: 40px;
  height: 40px;
  object-fit: cover;
}
</style>

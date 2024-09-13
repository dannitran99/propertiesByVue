<template>
  <v-navigation-drawer fixed right :value="isShow" class="drawer" width="312" v-click-outside="{
    handler: toggleDrawer,
  }" overlay-opacity=".6">
    <div class="drawer-content">
      <div class="login-user">
        <button class="btn-user">Đăng nhập</button>
        <button class="btn-user">Đăng ký</button>
      </div>
      <button class="btn-user outline">Đăng tin</button>
    </div>
    <v-list class="menu-item">
      <v-list-group v-for="(item, idx) in menu" :key="idx">
        <template v-slot:activator>
          <v-list-item-content>
            <!-- <v-list-item-icon>
              <component :is="'icon-box'" />
            </v-list-item-icon> -->
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
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
      menu: MENU_ITEM
    }
  },
  methods: {
    toggleDrawer() {
      typeof this.isShow === 'boolean' && !this.isShow && this.$emit('toggle')
    }
  }
}
</script>

<style scoped lang="scss">
.drawer {
  z-index: 999;
  background: #F2F2F2;
}

.drawer-content {
  padding: 16px;
  background-color: #fff;
}

.login-user {
  margin-bottom: 16px;
  display: flex;

  >:first-child {
    margin-right: 8px;
    color: #2C2C2C;
    background: #fff;
    border: solid 1px #ccc;
  }

  >:last-child {
    margin-left: 8px;
    color: #fff;
    background: #E03C31;
    border: solid 1px #E03C31;
  }
}

.outline {
  color: #2C2C2C;
  background: #fff;
  border: solid 1px #ccc;
  width: 100% !important;
}

.btn-user {
  width: calc(50% - 8px);
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -.2px;
  padding: 13px 15px;
  border-radius: 8px;
}

.menu-item {
  padding: 0;
  background-color: #fff !important;
}
</style>

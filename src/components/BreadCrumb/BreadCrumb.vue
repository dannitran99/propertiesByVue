<template>
  <div>
    <div v-if="category.subItem" class="nav-breadcrumb">
      <ul class="nav-container">
        <li>
          <router-link :to="{ path: `/${category.value}` }">{{ category.label }}</router-link>
          <div class="divider-breadcrumb" :class="[{ 'active-divider': currentRoute === category.value }]"></div>
        </li>
        <li v-for="(item, idx) in category.subItem" :key="idx">
          <router-link v-if="item.value || item.href"
            :to="{ path: item.href ? item.href : `/${category.value}?category=${item.value}` }">
            {{ item.label }}
            <div class="divider-breadcrumb" :class="[{ 'active-divider': currentRoute === item.value }]"></div>
          </router-link>
          <div v-else>
            <p>{{ item.label }}</p>
            <div class="divider-breadcrumb" :class="[{ 'active-divider': currentRoute === item.value }]"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="wrapper-breadcrumb">
      <div class="bread-crumb-content" v-if="isSearching">
        <div class="search-input">
          <icon-search />
          <input type="text" placeholder="Nhập từ khóa và nhấn Enter để tìm kiếm" :value="searchKeyword"
            @input="handleSearchChange" @keyup.enter="handleSubmitSearch">
          <button v-on:click="clearInputSearch" class="clear-btn">
            <icon-close :class="[{ 'hide': clearHide }]" />
          </button>
        </div>
        <button v-on:click="onChangeSearchState" class="cancel-button">
          Hủy bỏ
        </button>
      </div>
      <div class="bread-crumb-content" v-else>
        <bread-crumb-item v-bind:items="items" />
        <div class="search-menu" v-on:click="onChangeSearchState">
          <icon-search />
          <span>
            Hướng dẫn tìm kiếm
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbItem from './BreadCrumbItem.vue'
import { handleNewsRoute } from '@/helpers/arrayHandler'
export default {
  components: {
    'bread-crumb-item': BreadCrumbItem
  },
  props: {
    items: {
      type: Array
    },
    categoryNav: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isSearching: false,
      clearHide: true,
      currentRoute: ''
    }
  },
  computed: {
    searchKeyword: {
      get() {
        return this.$store.getters['news/searchKeyword']
      }
    },
    category() {
      const lastPath = this.$route.path.split('/')[1]
      const { rootCategory } = handleNewsRoute(lastPath)
      return rootCategory
    }
  },
  watch: {
    '$route'() {
      this.handleInit()
    },
    searchKeyword(val) {
      this.clearHide = val === ''
    },
    categoryNav() {
      this.handleInit()
    }
  },
  created() {
    this.handleInit()
  },
  methods: {
    handleSearchChange: function (e) {
      this.$store.dispatch('news/searchChange', e.target.value)
    },
    onChangeSearchState() {
      this.isSearching = !this.isSearching
    },
    clearInputSearch() {
      this.$store.dispatch('news/searchChange', '')
      this.$store.dispatch('news/submitFilter', this.$route)
    },
    handleSubmitSearch() {
      this.$store.dispatch('news/submitFilter', this.$route)
    },
    async handleInit() {
      this.currentRoute = this.categoryNav || this.$route.query.category || this.$route.path.split('/')[1]
      await this.$route.query.k ? this.$store.dispatch('news/searchChange', this.$route.query.k) : this.$store.dispatch('news/searchChange', '')
    }
  }
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

span {
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #505050;
}

input {
  flex-grow: 1;
  border: none;
  outline: none
}

button {
  background-color: #fff;
  border: none;
}

.clear-btn {
  display: flex;
}

.cancel-button {
  border-left: 1px solid #ccc;
  cursor: pointer;
  height: 28px;
  padding-left: 15px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #505050
}

.nav-breadcrumb {
  height: 60px;
  background: #1c1f22;
}

.nav-container {
  * {
    font-family: 'Lexend-medium', sans-serif;
  }

  padding-left: 30px;
  display: flex;
  gap: 20px;
  width: 1350px;
  height: 100%;
  max-width: 1350px;
  margin: auto;
  list-style: none;

  a {
    color: #fff !important;
  }

  li {
    font-size: 14px;
    line-height: 22px;
    margin-top: 19px;
    cursor: pointer;
    color: #fff;

    &:hover {
      .divider-breadcrumb {
        background-size: 100% 100%;
      }
    }
  }
}

.wrapper-breadcrumb {
  height: 46px;
  border-bottom: 1px solid #ccc;
}

.bread-crumb-content {
  margin: 0 auto;
  padding: 0 12px;
  max-width: 1140px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.search-input {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.hide {
  visibility: hidden;
}

.search-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.divider-breadcrumb {
  height: 2px;
  background: linear-gradient(to left, red, red) no-repeat 0 0;
  background-size: 0% 100%;
  transition: .3s;
}

.active-divider {
  background-size: 100% 100%;
}
</style>

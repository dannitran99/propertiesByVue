<template>
  <div class="wrapper">
    <div class="bread-crumb-content" v-if="isSearching">
      <div class="search-input">
        <icon-search />
        <input type="text" placeholder="Nhập từ khóa và nhấn Enter để tìm kiếm" v-model="keyword">
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
</template>

<script>
import BreadCrumbItem from './BreadCrumbItem.vue'
export default {
  components: {
    'bread-crumb-item': BreadCrumbItem
  },
  data() {
    return {
      isSearching: false,
      clearHide: true,
      keyword: ''
    }
  },
  props: {
    items: {
      type: Array
    }
  },
  watch: {
    keyword(val) {
      this.clearHide = val === ''
    }
  },
  methods: {
    onChangeSearchState() {
      this.isSearching = !this.isSearching
    },
    clearInputSearch() {
      this.keyword = ''
    }
  }
}
</script>

<style scoped>
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

.wrapper {
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
</style>

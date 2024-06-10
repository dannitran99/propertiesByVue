<template>
  <div class="container-sort">
    <div class="wrapper-sort" @click="onClickPopup" v-click-outside="handleClickOutside">
      <p>{{ selected.label }}</p>
      <icon-downtriangle />

    </div>
    <ul class="sort-selector" v-if="isShow">
      <li v-for="item in itemsSort" :key="item.id">
        <router-link class="item-page icon right" :class="[{ 'active-selector': item.id === selected.id }]"
          :to="{ path: $route.path, query: { ...query, sort: item.id } }">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      sort: '',
      itemsSort: [
        { label: 'Thông thường', id: 0 },
        { label: 'Giá thấp đến cao', id: 1 },
        { label: 'Giá cao đến thấp', id: 2 },
        { label: 'Giá trên m² thấp đến cao', id: 3 },
        { label: 'Giá trên m² cao đến thấp', id: 4 },
        { label: 'Diện tích bé đến lớn', id: 5 },
        { label: 'Diện tích lớn đến bé', id: 6 }
      ],
      selected: { label: 'Thông thường', id: 0 },
      query: {}
    }
  },
  watch: {
    '$route'() {
      this.selected = this.$route.query.sort ? this.itemsSort.find(item => item.id === Number(this.$route.query.sort)) : { label: 'Thông thường', id: 0 }
      const { p, l, ...rest } = this.$route.query
      this.query = rest
    },
    total() {
      this.handleCalculateTotalPage()
      this.handleRenderPageList()
    },
    page() {
      this.handleRenderPageList()
    }
  },
  created() {
    this.selected = this.$route.query.sort ? this.itemsSort.find(item => item.id === Number(this.$route.query.sort)) : { label: 'Thông thường', id: 0 }
    const { p, l, ...rest } = this.$route.query
    this.query = rest
  },
  methods: {
    handleClickOutside: function () {
      this.isShow = false
    },
    onClickPopup() {
      this.isShow = !this.isShow
    }
  }
}
</script>
<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

p {
  margin: 0;
}

.wrapper-sort {
  width: 192px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  color: #999;
  padding: 5px 16px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.container-sort {
  position: relative;

}

.wrapper-sort svg {
  width: 20px;
  height: 20px;
  opacity: .5;
}

.sort-selector {
  top: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  padding: 8px 0;
  list-style: none;
  border-radius: 8px;
  box-shadow: 0px 8px 20px rgba(182, 182, 182, 0.3);
  background: #fff;
  z-index: 50;
}

.sort-selector li {
  font-size: 14px;
  line-height: 20px;
  padding: 6px 16px;
  cursor: pointer;
}

.sort-selector li a {
  width: 100%;
  height: 100%;
  display: block;
  color: #2C2C2C;
}

.sort-selector li:hover {
  background: #F2F2F2;
}

.active-selector {
  color: #74150F !important;
}
</style>

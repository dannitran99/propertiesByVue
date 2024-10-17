<template>
  <div class="f-wrapper">
    <div class="switch-container">
      <p :class="[{ 'active-t': verify }]">Môi giới chuyên nghiệp</p>
      <v-switch v-model="verify" inset color="#07A35D" class="switch" dense outlined hide-details
        @change="handleChangeSwitch"></v-switch>
    </div>
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
      query: {},
      verify: false
    }
  },
  watch: {
    '$route'() {
      this.selected = this.$route.query.sort ? this.itemsSort.find(item => item.id === Number(this.$route.query.sort)) : { label: 'Thông thường', id: 0 }
      this.verify = this.$route.query.f
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
    this.verify = this.$route.query.f
    const { p, l, ...rest } = this.$route.query
    this.query = rest
  },
  methods: {
    handleClickOutside: function () {
      this.isShow = false
    },
    onClickPopup() {
      this.isShow = !this.isShow
    },
    handleChangeSwitch() {
      const { f, ...rest } = this.query
      const query = this.verify ? { ...rest, f: 'agency' } : { ...rest }
      this.$router.push({ path: this.$route.path, query })
    }
  }
}
</script>
<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.f-wrapper {
  display: flex;
  gap: 8px;

  @include responsive(xs) {
    flex-direction: column;
    width: 100%;

    >:nth-child(n) {
      width: 100%;
    }
  }
}

.active-t {
  color: #2C2C2C !important;
  font-weight: 600;
}

.switch-container {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  align-items: center;
  border-radius: 4px;
  height: 32px;
  background-image: url('../../assets/ic_agent_verification.svg');
  background-position: 12px;
}

.switch-container p {
  font-size: 14px;
  line-height: 20px;
  margin: 0 0 0 32px;
  color: #999;
}

.switch {
  margin: 0 0 0 11px;
  padding: 0;
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
  cursor: pointer;

  @include responsive(xs) {
    width: 100%;
  }
}

.wrapper-sort p {
  margin: 0;
  max-width: 130px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

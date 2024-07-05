<template>
  <div class="container-sort">
    <div class="wrapper-sort" @click="onClickPopup" v-click-outside="handleClickOutside">
      <p>{{ selected.label }}</p>
      <icon-downtriangle />
    </div>
    <ul class="sort-selector" v-if="isShow">
      <li v-for="item in items" :key="item.id" @click="() => $emit('handleSelect', item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    },
    selected: {
      type: Object
    }
  },
  data() {
    return {
      isShow: false
    }
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
.wrapper-sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  color: #999;
  padding: 5px 10px 5px 16px;
  cursor: pointer;
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
  width: 144px;
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
  color: #2C2C2C;
}

.sort-selector li:hover {
  background: #F2F2F2;
}
</style>

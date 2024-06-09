<template>
  <div class="wrapper-sort">
    <select v-model="sort" @change="onChangeSort" class="selector-sort">
      <option v-for="item in itemsSort" :key="item.id">{{ item.label }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sort: '',
      itemsSort: [
        { label: 'Thông thường', id: 0 },
        { label: 'Giá thấp đến cao', id: 1 },
        { label: 'Giá cao đến thấp', id: 2 },
        { label: 'Diện tích bé đến lớn', id: 3 },
        { label: 'Diện tích lớn đến bé', id: 4 }

      ]
    }
  },
  methods: {
    onChangeSort: function () {

    }
  }
}
</script>
<style>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.wrapper-sort {
  width: 192px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.selector-sort {
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  color: #999;
  outline: unset;
  padding: 5px 32px 5px 16px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid #ccc;
}
</style>

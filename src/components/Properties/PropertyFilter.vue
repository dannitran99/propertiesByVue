<template>
  <div class="wrapper-filter">
    <h4 class="filter-title">{{ title }}</h4>
    <ul class="list-wrapper">
      <li v-for="item in list" :key="item.label" :class="[{ 'selector-active': item.min === min && item.max === max }]"
        @click="() => $emit('handleSelect', item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    list: {
      type: Array
    },
    min: {
      type: Number || null
    },
    max: {
      type: Number || null
    }
  }
}
</script>

<style scoped>
.wrapper-filter {
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  padding: 15px;
}

.list-wrapper {
  padding: 0;
  list-style: none;
}

.list-wrapper :not(:last-child) {
  margin-bottom: 12px;
}

.list-wrapper li {
  width: 100%;
  font-family: 'Roboto-Regular', sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #2C2C2C;
  cursor: pointer;
}

.filter-title {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: -.2px;
  color: #2C2C2C;
  margin-bottom: 16px;
}

.selector-active {
  color: #74150F !important;
}
</style>

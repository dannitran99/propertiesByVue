<template>
  <div class="list-breadcrumb">
    <router-link :to="{ name: 'HomePage' }" class="home-ico">
      <icon-home />
    </router-link>
    <div v-for="(item, index) in items" :key="index">
      <icon-righttriangle />
      <router-link :to="{ path: item.href }" v-if="item.href">
        {{ item.label }}
      </router-link>
      <span v-else>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    }
  }
}
</script>

<style scoped>
.list-breadcrumb {
  display: flex;
  align-items: center;
  gap: 5px;
}

.home-ico {
  height: 15px;
}

span,
a {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #999 !important;
}
</style>

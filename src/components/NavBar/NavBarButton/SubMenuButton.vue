<template>
  <li v-if="query || hrefName">
    <router-link :to="hrefName ? { path: hrefName } : { name: navLink, query: { category: query } }"
      :class="[{ 'active': isActive }]">
      {{ label }}
    </router-link>
    <slot></slot>
  </li>
  <li v-else class="li-item">{{ label }}</li>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    query: {
      type: String,
      default: ''
    },
    navLink: {
      type: String,
      default: ''
    },
    path: {
      type: Array,
      default: null
    },
    hrefName: {
      type: String,
      default: ''
    }
  },
  watch: {
    '$route'() {
      this.isActive = !!(this.path && this.$route.query.category && this.$route.path.includes(this.path) && this.$route.query.category === this.query) || !!(this.hrefName && this.$route.path.includes(this.hrefName))
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

li {
  width: 100%;
  position: relative;
  list-style-type: none;
  white-space: nowrap;
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

li a,
.li-item {
  display: block;
  width: 100%;
  text-decoration: none;
  color: #2c3e50;
  padding: 6px 16px;
}

li:hover {
  background: #F2F2F2;
}

.active {
  color: #74150F;
}
</style>

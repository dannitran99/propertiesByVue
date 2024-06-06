<template>
  <router-link :to="{ name: navLink, query: { category: query } }" v-if="query">
    <li :class="[{ 'active': isActive }]">
      {{ label }}
    </li>
  </router-link>
  <li v-else>{{ label }}</li>
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
      type: String,
      default: ''
    }
  },
  watch: {
    '$route'() {
      this.isActive = !!(this.path && this.$route.query.category && this.$route.path.includes(this.path) && this.$route.query.category === this.query)
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

li {
  padding: 6px 16px;
  list-style-type: none;
  white-space: nowrap;
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

li a {
  text-decoration: none;
  color: #2c3e50
}

li:hover {
  background: #F2F2F2;
}

.active {
  color: #74150F;
}
</style>

<template>
  <router-link :to="{ name: routeName, params: { newsId: data.ID, } }" class="wrapper" :class="[{ 'show': isDisplay }]">
    <img v-bind:src="data.thumbnail">
    <p class="title">{{ data.title }}</p>
    <div class="time">
      <icon-clock />
      <p class="time">{{ moment() }}</p>
    </div>
  </router-link>
</template>

<script>
import { formatTimeHumanize } from '@/helpers/formater'
import { handleNewsRoute } from '@/helpers/arrayHandler.js'
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    isDisplay: {
      get() {
        const current = this.$store.getters['news/previewNewsItem']
        if (current) {
          return current.ID && current.ID === this.data.ID
        }
        return false
      }
    },
    routeName() {
      return handleNewsRoute(this.data.category).rootCategory.pathName
    }
  },
  methods: {
    moment: function () {
      return formatTimeHumanize(this.data.createdAt)
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
  cursor: pointer;
  transition: opacity .222s ease-in-out;
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
}

img {
  border-radius: 4px;
  width: 458px;
  height: 257px;
  margin-bottom: 16px;
}

a {
  text-decoration: none;
  color: #2C2C2C !important;
}

.title {
  font-family: 'Lexend-Medium', sans-serif !important;
  font-weight: 400;
  text-align: left;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.2px;
  margin-top: 0;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.time {
  font-family: 'Roboto-Regular', sans-serif;
  display: flex;
  align-items: center;
  gap: 5px;
}

.time p {
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  color: #999
}

p:hover {
  color: #999;
}

.show {
  width: 458px;
  height: auto;
  opacity: 1;
}
</style>

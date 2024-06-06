<template>
  <div class="card-new">
    <img v-bind:src="data.thumbnail" alt="thumbnail" />
    <div class="card-info">
      <p>{{ formatDateTime }}</p>
      <h3>{{ data.name }}</h3>
      <p>{{ data.content }}</p>
    </div>
  </div>
</template>

<script>

import { formatDateTime } from '@/helpers/formater'
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    formatDateTime: function () {
      return formatDateTime(this.data.createdAt)
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.card-new {
  display: flex;
  gap: 12px;
  border-bottom: 1px solid #dfdddd;
  padding-bottom: 15px;
  margin-bottom: 25px;
}

.card-new img {
  height: 150px;
  width: 260px;
  object-fit: cover;
  border-radius: 8px;
}

.card-info p:first-child {
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #999;
}

.card-info h3 {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  margin: 5px 0 10px 0;
  cursor: pointer;
}

.card-info h3:hover {
  color: #999;
}

.card-info p:last-child {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}
</style>

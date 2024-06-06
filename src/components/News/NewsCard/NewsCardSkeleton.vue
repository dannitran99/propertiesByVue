<template>
  <div class="card-new">
    <v-skeleton-loader class="img" type="image" />
    <v-skeleton-loader class="card-info" type="article" />
  </div>
</template>

<style scoped>
.card-new {
  display: flex;
  gap: 12px;
  border-bottom: 1px solid #dfdddd;
  padding-bottom: 15px;
  margin-bottom: 25px;
}

.card-new .img {
  height: 150px;
  width: 260px;
  border-radius: 8px;
}

.card-info {
  flex-grow: 1;
}
</style>

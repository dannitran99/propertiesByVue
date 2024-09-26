<template>
  <div class="card-wrapper-skeleton">
    <v-skeleton-loader class="img" type="image" />
    <v-skeleton-loader class="card-info" type="article" />
    <v-skeleton-loader class="card-info" type="article" />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.card-wrapper-skeleton {
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  padding: 16px;
  display: flex;

  @include responsive(sm) {
    border: none;
    border-bottom: 1px solid #F2F2F2;

    >:last-child {
      display: none;
    }
  }
}

.img {
  height: 120px;
  width: 120px;
  margin-right: 16px;

  @include responsive(sm) {
    margin-top: 18px;
    height: 76px;
    width: 76px;
  }
}

.card-info {
  flex-grow: 1;
  height: 120px;
}
</style>

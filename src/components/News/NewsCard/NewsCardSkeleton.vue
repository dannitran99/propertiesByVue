<template>
  <div class="card-new">
    <v-skeleton-loader class="img" type="image" height="150px" />
    <v-skeleton-loader class="card-info" type="article" />
  </div>
</template>

<style scoped lang="scss">
.card-new {
  display: flex;
  gap: 12px;
  border-bottom: 1px solid #dfdddd;
  padding-bottom: 15px;
  margin-bottom: 25px;

  @include responsive(sm) {
    display: block;
    border: none;
    padding: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .11);
    border: 1px solid #eff1f5;
    border-radius: 8px;
    cursor: pointer;
  }
}

.card-new .img {
  height: 150px;
  width: 260px;
  border-radius: 8px;

  @include responsive(sm1) {
    flex: 20% 1;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  @include responsive(sm) {
    width: 100%;
  }
}

.card-info {
  flex-grow: 1;

  @include responsive(sm1) {
    flex: 80% 1;
  }
}
</style>

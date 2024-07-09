<template>
  <div class="wrapper-skeleton">
    <v-row class="img-gallery" no-gutters>
      <v-col cols="8">
        <v-skeleton-loader type="image" height="284" />
      </v-col>
      <v-col cols="4">
        <v-row no-gutters class="grid-gallery">
          <v-col cols="12">
            <v-skeleton-loader type="image" height="140" />
          </v-col>
          <v-col cols="6">
            <v-skeleton-loader type="image" height="140" />
          </v-col>
          <v-col cols="6">
            <v-skeleton-loader type="image" height="140" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-skeleton-loader type="article"></v-skeleton-loader>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.wrapper-skeleton {
  border: 1px solid #F2F2F2;
  border-radius: 10px;
}

.img-gallery>* {
  padding: 2px !important;
}

.grid-gallery>:first-child {
  padding-bottom: 2px !important;
}

.grid-gallery>:nth-child(2) {
  padding: 2px 2px 0 0;
}

.grid-gallery>:nth-child(3) {
  padding: 2px 0 0 2px;
}
</style>

<template>
  <div class="wrapper-skeleton">
    <v-row class="img-gallery" no-gutters>
      <v-col cols="8">
        <v-skeleton-loader type="image" class="img-loader" :style="[isMobile && { height: `${heightImage}px` }]" />
      </v-col>
      <v-col cols="4">
        <v-row no-gutters class="grid-gallery">
          <v-col cols="12">
            <v-skeleton-loader type="image" class="img-loader-sm"
              :style="[isMobile && { height: `${heightImage / 2 - 2}px` }]" />
          </v-col>
          <v-col cols="6">
            <v-skeleton-loader type="image" class="img-loader-sm"
              :style="[isMobile && { height: `${heightImage / 2 - 2}px` }]" />
          </v-col>
          <v-col cols="6">
            <v-skeleton-loader type="image" class="img-loader-sm"
              :style="[isMobile && { height: `${heightImage / 2 - 2}px` }]" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-skeleton-loader type="article"></v-skeleton-loader>
  </div>
</template>

<script>
export default {
  props: {
    heightImage: {
      type: Number,
      default: undefined
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper-skeleton {
  border: 1px solid #F2F2F2;
  border-radius: 10px;
}

.img-loader {
  height: 284px;

  @include responsive(xl) {
    height: 233px;
  }
}

.img-loader-sm {
  height: 140px;

  @include responsive(xl) {
    height: 114.5px;
  }
}

.img-gallery {
  @include responsive(xs) {
    padding: 16px 16px 0;
  }
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

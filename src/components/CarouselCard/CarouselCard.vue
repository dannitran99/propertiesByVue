<template>
  <div class="carousel-c-wrapper">
    <div class="carousel-c-container" @mousemove="handleMouseMove" @mousedown="handleMouseDown"
      @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave">
      <div class="carousel-c-gallery"
        :style="{ transform: `translate3d(${-235 * 3 * page + currentTranslateX + (page && page + 1 === total ? 143 + extra * 235 : 0)}px, 0px, 0px)`, transitionDuration: `${isTrans ? '300ms' : '0ms'}` }">
        <property-item v-for="item in data" :key="item.ID" :data="item" :small="true" />
      </div>
    </div>
    <div class="gradient-right" v-if="page !== total - 1"></div>
  </div>
</template>

<script>
import PropertyItem from '@/components/PropertiesHomePage/PropertyItem'
export default {
  components: {
    'property-item': PropertyItem
  },
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      isTrans: false,
      page: 0,
      isDragging: false,
      startPosX: 0,
      currentTranslateX: 0,
      total: Math.ceil((this.data.length + 1) / 4),
      extra: this.data.length % 3 ? 3 - this.data.length % 3 : this.data.length % 3
    }
  },
  methods: {
    handleMouseDown: function (e) {
      this.isDragging = true
      this.startPosX = e.clientX
    },
    handleMouseMove: function (e) {
      if (!this.isDragging) return
      this.currentTranslateX = e.clientX - this.startPosX
    },
    handleMouseLeave: function (e) {
      if (!this.isDragging) return
      this.isDragging = false
      if (this.currentTranslateX > 429 && this.page > 0) {
        this.page--
      }
      if (this.currentTranslateX < -429 && this.page + 1 < this.total) {
        this.page++
      }
      this.currentTranslateX = 0
      this.isTrans = true
      setTimeout(() => { this.isTrans = false }, 300)
    }
  }
}
</script>

<style scoped>
.carousel-c-wrapper {
  position: relative;
}

.carousel-c-container {
  height: 335px;
  padding-bottom: 40px;
  overflow: hidden;
}

.gradient-right {
  position: absolute;
  top: 144px;
  right: -143px;
  height: 8px;
  width: 295px;
  z-index: 2;
  background: linear-gradient(180deg, rgba(44, 44, 44, 0) 0%, #2c2c2c 108.75%);
  mix-blend-mode: multiply;
  opacity: 0.15;
  transform: rotate(-90deg);
}

.carousel-c-gallery {
  display: flex;
  gap: 15px;
  width: fit-content;
}
</style>

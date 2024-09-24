<template>
  <div>
    <div class="title-carousel-c">
      <slot></slot>
      <div class="button-container">
        <button class="btn-carousel" :class="[{ 'disable-btn': page === 0 }]" :disabled="page === 0"
          @click="() => handlePage(false)">
          <icon-leftarrow />
        </button>
        <button class="btn-carousel go-right" :class="[{ 'disable-btn': page + 1 === total }]"
          :disabled="page + 1 === total" @click="() => handlePage(true)">
          <icon-leftarrow />
        </button>
      </div>
    </div>
    <div class="carousel-c-wrapper" ref="card-slider">
      <div class="carousel-c-container" @mousemove="handleMouseMove" @mousedown="handleMouseDown"
        @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave">
        <div class="carousel-c-gallery"
          :style="{ transform: `translate3d(${-cardWidth * 3 * page + currentTranslateX + (page && page + 1 === total ? (sliderWidth - cardWidth * 3) + extra * cardWidth : 0)}px, 0px, 0px)`, transitionDuration: `${isTrans ? '300ms' : '0ms'}` }">
          <property-item v-for="item in data" :key="item.ID" :data="item" :small="true"
            :class="[{ 'disable-link': preventAction }]" />
        </div>
      </div>
      <div class="gradient-right" v-if="page + 1 !== total"></div>
    </div>
  </div>
</template>

<script>
import PropertyItem from '@/components/PropertiesHomePage/PropertyItem'
import { useBreakpoints } from '@vueuse/core'
import { breakpoints } from '@/consts/breakpoints.js'

const definedBreakpoint = useBreakpoints(breakpoints)
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
      total: Math.ceil((this.data.length) / 3),
      extra: this.data.length % 3 ? 3 - this.data.length % 3 : 0,
      preventAction: false,
      sliderWidth: undefined,
      cardWidth: undefined
    }
  },
  created() {
    window.addEventListener('resize', this.handleResizeWindow)
  },
  mounted() {
    this.handleResizeWindow()
  },
  methods: {
    handleResizeWindow() {
      this.sliderWidth = this.$refs['card-slider'] ? this.$refs['card-slider'].offsetWidth : undefined
      switch (true) {
        case definedBreakpoint.smaller('sm2').value:
          this.cardWidth = 275
          break
        case definedBreakpoint.smaller('xl').value:
          this.cardWidth = 227
          break
        default:
          this.cardWidth = 235
          break
      }
    },
    handleMouseDown: function (e) {
      this.isDragging = true
      this.startPosX = e.clientX
    },
    handleMouseMove: function (e) {
      if (!this.isDragging) return
      this.currentTranslateX = e.clientX - this.startPosX
      this.preventAction = !!this.currentTranslateX
    },
    handleMouseLeave: function () {
      this.preventAction = false
      if (!this.isDragging) return
      this.isDragging = false
      if (this.currentTranslateX > this.sliderWidth / 2 && this.page > 0) {
        this.page--
      }
      if (this.currentTranslateX < -(this.sliderWidth / 2) && this.page + 1 < this.total) {
        this.page++
      }
      this.currentTranslateX = 0
      this.isTrans = true
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handlePage(goRight) {
      goRight ? this.page++ : this.page--
      this.isTrans = true
      setTimeout(() => { this.isTrans = false }, 300)
    }
  }
}
</script>

<style scoped lang="scss">
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

  @include responsive(sm2) {
    display: none;
  }
}

.carousel-c-gallery {
  display: flex;
  gap: 15px;
  width: fit-content;
  user-select: none;

  @include responsive(sm2) {
    gap: 24px;
  }
}

.disable-link {
  pointer-events: none;
}

.title-carousel-c {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.title-carousel-c h4 {
  margin: 8px 0 0 0;
}

.button-container {
  display: flex;
  gap: 8px;

  @include responsive(sm2) {
    display: none;
  }
}

.btn-carousel {
  color: #2C2C2C;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.go-right svg {
  transform: rotate(180deg);
}

.disable-btn {
  color: #999;
}
</style>

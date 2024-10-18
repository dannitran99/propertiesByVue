<template>
  <div>
    <div class="title-carousel-c">
      <slot></slot>
      <div class="button-container">
        <button class="btn-carousel" :class="[{ 'disable-btn': !canScrollPrev }]" :disabled="!canScrollPrev"
          @click="() => emblaApi.scrollPrev()">
          <icon-leftarrow />
        </button>
        <button class="btn-carousel go-right" :class="[{ 'disable-btn': !canScrollNext }]" :disabled="!canScrollNext"
          @click="() => emblaApi.scrollNext()">
          <icon-leftarrow />
        </button>
      </div>
    </div>
    <div class="carousel-c-wrapper">
      <div class="carousel-c-container" ref="card-slider">
        <div class="carousel-c-gallery">
          <property-item v-for="item in data" :key="item.ID" :data="item" :small="true"
            class="carousel-c-gallery--item" />
        </div>
      </div>
      <div class="gradient-right" v-if="canScrollNext"></div>
    </div>
  </div>
</template>

<script>
import EmblaCarousel from 'embla-carousel'
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
      emblaApi: null,
      canScrollNext: false,
      canScrollPrev: false
    }
  },
  created() {
  },
  mounted() {
    const emblaRef = this.$refs['card-slider']
    this.emblaApi = EmblaCarousel(emblaRef, { align: 'start', duration: 40, slidesToScroll: 'auto' })
    this.canScrollNext = this.emblaApi.canScrollNext()
    this.canScrollPrev = this.emblaApi.canScrollPrev()
    this.emblaApi.on('select', () => {
      this.canScrollNext = this.emblaApi.canScrollNext()
      this.canScrollPrev = this.emblaApi.canScrollPrev()
    })
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
  user-select: none;

  &--item {
    flex-shrink: 0;
  }

  @include responsive(sm2) {
    gap: 24px;
  }
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

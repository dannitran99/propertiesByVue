<template>
  <div>
    <div class="wrapper-gallery" ref="gallery">
      <ul @click="handlePopup">
        <li v-for="item in imageList" :key="item.name">
          <div class="image-overlay">
            <img :src="item.url" alt="img" draggable="false" />
          </div>
          <div class="image-layout" :style="{ backgroundImage: `url(${item.url})` }"></div>
        </li>
      </ul>
      <div class="pagination">{{ `${currentIdx + 1} / ${imageList.length}` }}</div>
      <button class="btn-nav go-right" @click="() => emblaApiGallery.scrollNext()"
        v-if="currentIdx < imageList.length - 1">
        <div>
          <icon-leftarrow />
        </div>
      </button>
      <button class="btn-nav go-left" @click="() => emblaApiGallery.scrollPrev()" v-if="currentIdx > 0">
        <div>
          <icon-leftarrow />
        </div>
      </button>
    </div>
    <div class="slick-wrapper">
      <div ref="slick">
        <ul class="slick">
          <li v-for="(item, idx) in imageList" :key="item.name" @click="() => changeSlide(idx)">
            <img :src="item.url" alt="img" draggable="false" :class="[{ 'active': idx === currentIdx }]" />
          </li>
        </ul>
      </div>
    </div>
    <div class="popup" :class="[{ 'show-popup': popup }]">
      <div class="navigate-btn">
        <div class="pagination-popup">{{ `${currentIdx + 1} / ${imageList.length}` }}</div>
        <div class="action-btn">
          <button @click="handleZoomOut">
            <icon-zoomout />
          </button>
          <button @click="scale++">
            <icon-zoomin />
          </button>
          <button @click="popup = false">
            <icon-closewb />
          </button>
        </div>
      </div>
      <div class="content-popup">
        <div class="popup-wrapper" @click="popup = false">
          <div class="gallery-holder" ref="gallery-popup">
            <ul class="gallery-popup">
              <li v-for="(item, idx) in imageList" :key="item.name"
                :style="[scale > 1 && idx === currentIdx && { 'transform': `translate3d(${currentTranslateX}px, ${currentTranslateY}px, 0)` }]">
                <img :src="item.url" alt="img" draggable="false" v-if="scale === 1 || idx === currentIdx"
                  @click="clickImage" @mousedown="handleMouseDown" @mousemove="handleMouseMove"
                  @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"
                  :style="{ transform: `scale3d(${idx === currentIdx ? scale : 1}, ${idx === currentIdx ? scale : 1}, 1)` }" />
              </li>
            </ul>
          </div>
          <button class="btn-nav-popup go-right" @click="handleGoRight" v-if="currentIdx < imageList.length - 1">
            <icon-leftarrow />
          </button>
          <button class="btn-nav-popup go-left" @click="handleGoLeft" v-if="currentIdx > 0">
            <icon-leftarrow />
          </button>
        </div>
        <div class="slick-popup fade-animation" ref="slick-popup">
          <ul class="slick slick-popup-gallery">
            <li v-for="(item, idx) in imageList" :key="item.name" @click="() => changeSlidePopup(idx)">
              <img :src="item.url" alt="img" draggable="false" :class="[{ 'active-popup': idx === currentIdx }]" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmblaCarousel from 'embla-carousel'
export default {
  props: {
    imageList: {
      type: Array
    }
  },
  data() {
    return {
      emblaApiGallery: null,
      emblaApiSlick: null,
      emblaApiGalleryPopup: null,
      emblaApiSlickPopup: null,
      popup: false,
      currentIdx: 0,
      scale: 1,
      isDragging: false,
      startPosX: 0,
      startPosY: 0,
      currentTranslateX: 0,
      currentTranslateY: 0
    }
  },
  mounted() {
    const emblaRefGallery = this.$refs['gallery']
    this.emblaApiGallery = EmblaCarousel(emblaRefGallery, { align: 'start', duration: 40 })
    const emblaRefSlick = this.$refs['slick']
    this.emblaApiSlick = EmblaCarousel(emblaRefSlick, { align: 'start', duration: 40 })
    const emblaRefSlickPopup = this.$refs['slick-popup']
    this.emblaApiSlickPopup = EmblaCarousel(emblaRefSlickPopup, { align: 'start', duration: 40 })
    const emblaRefGalleryPopup = this.$refs['gallery-popup']
    this.emblaApiGalleryPopup = EmblaCarousel(emblaRefGalleryPopup, { align: 'start', duration: 40 })
    this.emblaApiGalleryPopup.on('select', () => {
      this.scale = 1
      this.currentIdx = this.emblaApiGalleryPopup.selectedScrollSnap()
      this.emblaApiGallery.scrollTo(this.currentIdx, true)
    })
    this.emblaApiGallery.on('select', () => {
      this.currentIdx = this.emblaApiGallery.selectedScrollSnap()
      this.emblaApiGalleryPopup.scrollTo(this.currentIdx)
    })
  },
  watch: {
    scale() {
      if (this.scale === 1) {
        this.emblaApiGalleryPopup.reInit({ watchDrag: true })
        this.currentTranslateX = 0
        this.currentTranslateY = 0
      } else {
        this.emblaApiGalleryPopup.reInit({ watchDrag: false })
      }
    }
  },
  methods: {
    handleGoRight: function (e) {
      e.stopPropagation()
      this.emblaApiGalleryPopup.scrollNext()
    },
    handleGoLeft: function (e) {
      e.stopPropagation()
      this.emblaApiGalleryPopup.scrollPrev()
    },
    changeSlide(idx) {
      this.emblaApiGallery.scrollTo(idx)
      this.emblaApiGalleryPopup.scrollTo(idx)
    },
    changeSlidePopup(idx) {
      this.scale = 1
      this.emblaApiGallery.scrollTo(idx)
      this.emblaApiGalleryPopup.scrollTo(idx)
    },
    clickImage: function (e) {
      e.stopPropagation()
    },
    handleZoomOut: function () {
      this.scale > 1 && this.scale--
    },
    handlePopup() {
      this.popup = true
      this.scale = 1
      setTimeout(() => {
        this.emblaApiGalleryPopup.scrollTo(this.currentIdx, true)
      }, 100)
    },
    handleMouseDown(e) {
      if (this.scale === 1) return
      this.isDragging = true
      this.startPosX = e.clientX - this.currentTranslateX
      this.startPosY = e.clientY - this.currentTranslateY
    },
    handleMouseMove(e) {
      if (this.scale === 1) return
      if (!this.isDragging) return
      this.currentTranslateX = e.clientX - this.startPosX
      this.currentTranslateY = e.clientY - this.startPosY
    },
    handleMouseLeave() {
      this.isDragging = false
    }
  }
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.wrapper-gallery {
  position: relative;
  width: 848px;
  height: calc(848px* 472 / 840);
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  list-style: none;

  @include responsive(xl) {
    width: 696px;
    height: calc(696px* 472 / 840);
  }

  @include responsive(sm2) {
    width: 100%;
    height: calc(848px* 472 / 840);
    aspect-ratio: 472 / 840;
    border-radius: 0px;
  }

  @include responsive(xs) {
    height: calc(100vw* 210 / 360);
    aspect-ratio: unset;
  }
}

.wrapper-gallery ul {
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
  list-style: none;
}

.wrapper-gallery li {
  flex-shrink: 0;
  width: 848px;
  margin-right: 10px;
  height: 100%;
  position: relative;

  @include responsive(xl) {
    width: 696px;
  }

  @include responsive(sm2) {
    width: 100%;
  }
}

.image-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 9;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  display: block;
  z-index: 10;
  background: rgba(0, 0, 0, 0.65);
  text-align: center;
}

.image-overlay img {
  min-height: 100%;
  cursor: pointer;
  height: 100%;
  user-select: none;
}

.pagination {
  position: absolute;
  right: 16px;
  bottom: 16px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  color: #fff;
  padding: 0px 8px;
  font-size: 14px;
  line-height: 20px;
}

.btn-nav {

  position: absolute;
  top: 0;
  height: 100%;
}

.btn-nav>div {
  background-color: #fff;
  border: solid 1px #ccc;
  padding: 8px;
  border-radius: 4px;
  display: flex;
}

.btn-nav-popup {
  background-color: #fff;
  border: solid 1px #ccc;
  padding: 11px;
  border-radius: 4px;
  position: absolute;
  display: flex;
  top: 50%;
}

.btn-nav-popup svg {
  width: 25px;
  height: 25px;
}

.go-right {
  right: 0;
  transform: translate(-50%, 0);
}

.go-left {
  transform: translate(50%, 0);
  left: 0;

}

.go-right svg {
  transform: rotate(180deg);
}

.slick {
  height: 80px;
  padding: 0;
  list-style: none;
  display: flex;

  @include responsive(sm2) {
    padding-left: 8px;
  }
}

.slick-popup-gallery {
  height: 64px;
}

.slick-popup-gallery img {
  width: 86px !important;
  opacity: 0.64;
}

.slick>:not(:last-child) {
  margin-right: 8px;
}

.slick img {
  width: 111px;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
  transition: all .3s ease;
}

.active-popup {
  opacity: 1 !important;
  border: 2px solid #fff;
}

.active {
  border: 2px solid #2C2C2C;
}

.popup {
  display: none;
  z-index: 1000;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  top: 0;
  left: 0;
}

.show-popup {
  display: block;
}

.navigate-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
  height: 56px;
  text-align: center;
  position: absolute;
  width: 100%;
  z-index: 2;
  padding: 12px 0px;
  background-color: #000;
}

.pagination-popup {
  font-size: 14px;
  line-height: 20px;
  padding-left: 24px;
  color: #fff;
}

.action-btn {
  display: flex;
  gap: 10px;
  align-items: center;
  padding-right: 24px;
}

.action-btn svg {
  width: 24px;
  height: 24px;
}

.content-popup {
  position: fixed;
  height: calc(100vh - 56px);
  width: 100%;
  top: 56px;
}

.popup-wrapper {
  position: relative;
  height: calc(100% - 112px);
}

.gallery-holder {
  height: 100%;
  opacity: 0;
  transform: scale(0.5);
  animation: fade-in 0.2s ease .3s forwards;
}

.gallery-popup {
  position: absolute;
  padding: 0;
  display: flex;
  list-style: none;
  width: 100%;
  height: 100%;
}

.gallery-popup li {
  justify-content: center;
  flex-shrink: 0;
  width: 100%;
  display: flex;
  align-items: center;
}

.gallery-popup img {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  max-height: 100%;
  width: auto !important;
  height: auto !important;
  cursor: grab;
  transition: all .2s ease;
}

.slick-wrapper {
  overflow: hidden;

  @include responsive(xs) {
    display: none;
  }
}

.slick-popup {
  height: 112px !important;
  padding: 24px 10px !important;
  background-color: #000;
}

@keyframes fade-in {
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-animation {
  animation-name: fade-in-down;
  animation-iteration-count: 1;
  animation-delay: 0.6s;
  animation-duration: .3s;
  animation-fill-mode: both;
}

@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>

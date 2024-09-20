<template>
  <div>
    <div class="wrapper-gallery" @mousemove="handleMouseMove" @mousedown="handleMouseDown" @mouseup="handleMouseLeave"
      @mouseleave="handleMouseLeave" ref="gallery">
      <ul
        :style="{ transform: `translate3d(${-(imageWidth + 10) * currentIdx + gallery.currentTranslateX}px, 0px, 0px)`, transitionDuration: `${isTrans ? '300ms' : '0ms'}` }">
        <li v-for="item in imageList" :key="item.name">
          <div class="image-overlay">
            <img :src="item.url" alt="img" draggable="false" />
          </div>
          <div class="image-layout" :style="{ backgroundImage: `url(${item.url})` }"></div>
        </li>
      </ul>
      <div class="pagination">{{ `${currentIdx + 1} / ${imageList.length}` }}</div>
      <button class="btn-nav go-right" @click="handleGoRight" v-if="currentIdx < imageList.length - 1">
        <div>
          <icon-leftarrow />
        </div>
      </button>
      <button class="btn-nav go-left" @click="handleGoLeft" v-if="currentIdx > 0">
        <div>
          <icon-leftarrow />
        </div>
      </button>
    </div>
    <div @mousedown="handleDownSlick" @mousemove="handleMoveSlick" @mouseup="handleSlickLeave"
      @mouseleave="handleSlickLeave">
      <ul class="slick" ref="slick">
        <li v-for="(item, idx) in imageList" :key="item.name" @click="handleChangeSlide(idx)">
          <img :src="item.url" alt="img" draggable="false" :class="[{ 'active': idx === currentIdx }]" />
        </li>
      </ul>
    </div>
    <div class="popup" v-if="popup">
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
        <div class="popup-wrapper" @click="clickOutSide">
          <div class="gallery-holder">
            <ul class="gallery-popup"
              :style="{ transform: `translate3d( calc(${100 * -currentIdx}% + ${galleryPopup.currentTranslateX}px), ${scale === 1 ? '0px' : `${galleryPopup.currentTranslateY}px`}, 0px)`, transitionDuration: `${isTrans ? '600ms' : '0ms'}` }">
              <li v-for="(item, idx) in imageList" :key="item.name">
                <img :src="item.url" alt="img" draggable="false" v-if="scale === 1 || idx === currentIdx"
                  @click="clickImage" @mousemove="handleMouseMovePopup" @mousedown="handleMouseDownPopup"
                  @mouseup="handleMouseLeavePopup" @mouseleave="handleMouseLeavePopup"
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
        <div class="slick-popup fade-animation" @mousedown="handleDownSlickPopup" @mousemove="handleMoveSlickPopup"
          @mouseup="handleSlickLeavePopup" @mouseleave="handleSlickLeavePopup">
          <ul class="slick slick-popup-gallery" ref="slick-popup">
            <li v-for="(item, idx) in imageList" :key="item.name" @click="handleChangeSlide(idx)">
              <img :src="item.url" alt="img" draggable="false" :class="[{ 'active-popup': idx === currentIdx }]" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBreakpoints } from '@vueuse/core'
import { breakpoints } from '@/consts/breakpoints.js'

const definedBreakpoint = useBreakpoints(breakpoints)
export default {
  props: {
    imageList: {
      type: Array
    }
  },
  data() {
    return {
      popup: false,
      isTrans: false,
      currentIdx: 0,
      scale: 1,
      gallery: {
        isDragging: false,
        startPosX: 0,
        currentTranslateX: 0
      },
      galleryPopup: {
        isDragging: false,
        startPosX: 0,
        currentTranslateX: 0,
        startPosY: 0,
        currentTranslateY: 0
      },
      slick: {
        slickTrans: false,
        startSlickPos: 0,
        startSlickScroll: 0
      },
      slickPopup: {
        slickTrans: false,
        startSlickPos: 0,
        startSlickScroll: 0
      }
    }
  },
  computed: {
    imageWidth: function () {
      switch (true) {
        case definedBreakpoint.smaller('sm2').value:
          return window.innerWidth
        case definedBreakpoint.smaller('xl').value:
          return 696
        default:
          return 848
      }
    }
  },
  methods: {
    handleGoRight: function (e) {
      e.stopPropagation()
      this.currentIdx++
      this.isTrans = true
      this.scale = 1
      this.galleryPopup.currentTranslateX = 0
      this.galleryPopup.currentTranslateY = 0
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handleGoLeft: function (e) {
      e.stopPropagation()
      this.currentIdx--
      this.isTrans = true
      this.scale = 1
      this.galleryPopup.currentTranslateX = 0
      this.galleryPopup.currentTranslateY = 0
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handleMouseDown: function (e) {
      this.gallery.isDragging = true
      this.gallery.startPosX = e.clientX
    },
    handleMouseMove: function (e) {
      if (!this.gallery.isDragging) return
      this.gallery.currentTranslateX = e.clientX - this.gallery.startPosX
    },
    handleMouseLeave: function (e) {
      if (!this.gallery.isDragging) return
      const pos = this.gallery.startPosX - this.$refs.gallery.getBoundingClientRect().left
      this.gallery.isDragging = false
      if (this.gallery.currentTranslateX === 0 && pos > 51 && pos < (this.imageWidth - 51)) {
        this.popup = true
        this.scale = 1
        this.galleryPopup.currentTranslateX = 0
        this.galleryPopup.currentTranslateY = 0
        return
      }
      if (this.gallery.currentTranslateX > ((this.imageWidth + 10) / 2) && this.currentIdx > 0) {
        this.currentIdx--
      }
      if (this.gallery.currentTranslateX < -((this.imageWidth + 10) / 2) && this.currentIdx < this.imageList.length - 1) {
        this.currentIdx++
      }
      this.gallery.currentTranslateX = 0
      this.isTrans = true
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handleMouseDownPopup: function (e) {
      this.galleryPopup.isDragging = true
      this.galleryPopup.startPosX = e.clientX - this.galleryPopup.currentTranslateX
      this.galleryPopup.startPosY = e.clientY - this.galleryPopup.currentTranslateY
    },
    handleMouseMovePopup: function (e) {
      if (!this.galleryPopup.isDragging) return
      this.galleryPopup.currentTranslateX = e.clientX - this.galleryPopup.startPosX
      this.galleryPopup.currentTranslateY = e.clientY - this.galleryPopup.startPosY
    },
    handleMouseLeavePopup: function (e) {
      if (!this.galleryPopup.isDragging) return
      this.galleryPopup.isDragging = false
      if (this.scale === 1) {
        if (this.galleryPopup.currentTranslateX > ((this.imageWidth + 10) / 2) && this.currentIdx > 0) {
          this.currentIdx--
        }
        if (this.galleryPopup.currentTranslateX < -((this.imageWidth + 10) / 2) && this.currentIdx < this.imageList.length - 1) {
          this.currentIdx++
        }
        this.galleryPopup.currentTranslateX = 0
        this.galleryPopup.currentTranslateY = 0
        this.isTrans = true
        setTimeout(() => { this.isTrans = false }, 300)
      }
    },
    handleChangeSlide: function (idx) {
      this.currentIdx = idx
      this.isTrans = true
      this.scale = 1
      this.galleryPopup.currentTranslateX = 0
      this.galleryPopup.currentTranslateY = 0
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handleDownSlick: function (e) {
      this.slick.slickTrans = true
      this.slick.startSlickPos = e.clientX
      this.slick.startSlickScroll = this.$refs.slick.scrollLeft
    },
    handleMoveSlick: function (e) {
      if (!this.slick.slickTrans) return
      this.$refs.slick.scrollLeft = this.slick.startSlickScroll - (e.clientX - this.slick.startSlickPos)
    },
    handleSlickLeave: function () {
      if (!this.slick.slickTrans) return
      this.slick.slickTrans = false
    },
    handleDownSlickPopup: function (e) {
      this.slickPopup.slickTrans = true
      this.slickPopup.startSlickPos = e.clientX
      this.slickPopup.startSlickScroll = this.$refs['slick-popup'].scrollLeft
    },
    handleMoveSlickPopup: function (e) {
      if (!this.slickPopup.slickTrans) return
      this.$refs['slick-popup'].scrollLeft = this.slickPopup.startSlickScroll - (e.clientX - this.slickPopup.startSlickPos)
    },
    handleSlickLeavePopup: function () {
      if (!this.slickPopup.slickTrans) return
      this.slickPopup.slickTrans = false
    },
    clickOutSide: function () {
      this.popup = false
    },
    clickImage: function (e) {
      e.stopPropagation()
    },
    handleZoomOut: function () {
      this.scale > 1 && this.scale--
      if (this.scale === 1) {
        this.galleryPopup.currentTranslateX = 0
        this.galleryPopup.currentTranslateY = 0
      }
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
  overflow: hidden;
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
  z-index: 1000;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  top: 0;
  left: 0;
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

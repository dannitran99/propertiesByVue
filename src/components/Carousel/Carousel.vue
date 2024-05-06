<template>
  <div>
    <div class="wrapper-gallery" @mousemove="handleMouseMove" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave" ref="gallery">
      <ul :style="{transform: `translate3d(${-858 * currentIdx + gallery.currentTranslateX}px, 0px, 0px)`, transitionDuration: `${isTrans?'300ms':'0ms'}`}">
        <li v-for="item in imageList" :key="item.name">
          <div class="image-overlay">
            <img :src="item.url" alt="img" draggable="false" />
          </div>
          <div class="image-layout" :style="{ backgroundImage: `url(${item.url})` }"></div>
        </li>
      </ul>
      <div class="pagination">{{ `${currentIdx + 1} / ${imageList.length}` }}</div>
      <button class="btn-nav go-right" @click="handleGoRight" v-if="currentIdx<imageList.length-1">
        <div>
          <icon-leftarrow/>
        </div>
      </button>
      <button class="btn-nav go-left" @click="handleGoLeft" v-if="currentIdx>0" >
        <div>
          <icon-leftarrow/>
        </div>
      </button >
    </div>
    <div @mousedown="handleDownSlick" @mousemove="handleMoveSlick" @mouseup="handleSlickLeave" @mouseleave="handleSlickLeave">
      <ul class="slick" ref="slick">
        <li v-for="(item, idx) in imageList" :key="item.name" @click="handleChangeSlide(idx)">
          <img :src="item.url" alt="img" draggable="false" :class="[{'active' : idx === currentIdx}]"/>
        </li>
      </ul>
    </div>
    <div class="popup" v-if="popup">
      <div class="navigate-btn">
        <div class="pagination-popup">{{ `${currentIdx + 1} / ${imageList.length}` }}</div>
        <div class="action-btn">
          <button @click="popup=false">
            <icon-closewb/>
          </button>
        </div>
      </div>
      <div class="content-popup">
        <div class="popup-wrapper" @click="clickOutSide">
          <div class="gallery-holder">
            <ul class="gallery-popup" :style="{transform: `translate3d( ${ 100 * -currentIdx }%, 0px, 0px)`, transitionDuration: `${isTrans?'600ms':'0ms'}`}">
              <li v-for="item in imageList" :key="item.name">
                <img :src="item.url" alt="img" draggable="false" @click="clickImage"/>
              </li>
            </ul>
          </div>
          <button class="btn-nav-popup go-right" @click="handleGoRight" v-if="currentIdx<imageList.length-1">
            <icon-leftarrow/>
          </button>
          <button class="btn-nav-popup go-left" @click="handleGoLeft" v-if="currentIdx>0" >
            <icon-leftarrow/>
          </button>
        </div>
        <div class="slick-popup"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageList: {
      type: Array
    }
  },
  data () {
    return {
      popup: false,
      isTrans: false,
      currentIdx: 0,
      gallery: {
        isDragging: false,
        startPosX: 0,
        currentTranslateX: 0
      },
      slick: {
        slickTrans: false,
        startSlickPos: 0,
        startSlickScroll: 0
      }
    }
  },
  methods: {
    handleGoRight: function (e) {
      e.stopPropagation()
      this.currentIdx++
      this.isTrans = true
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handleGoLeft: function (e) {
      e.stopPropagation()
      this.currentIdx--
      this.isTrans = true
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
      if (this.gallery.currentTranslateX === 0 && pos > 51 && pos < 797) {
        this.popup = true
        return
      }
      if (this.gallery.currentTranslateX > 429 && this.currentIdx > 0) {
        this.currentIdx--
      }
      if (this.gallery.currentTranslateX < -429 && this.currentIdx < this.imageList.length - 1) {
        this.currentIdx++
      }
      this.gallery.currentTranslateX = 0
      this.isTrans = true
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handleChangeSlide: function (idx) {
      this.currentIdx = idx
      this.isTrans = true
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
    clickOutSide: function () {
      this.popup = false
    },
    clickImage: function (e) {
      e.stopPropagation()
    }
  }
}
</script>

<style scoped>
.wrapper-gallery{
    position: relative;
    width: 848px;
    height: calc(848px* 472 / 840);
    margin-bottom: 8px;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    list-style: none;
}
.wrapper-gallery ul{
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
  list-style: none;
}
.wrapper-gallery li{
  flex-shrink: 0;
  width: 848px;
  margin-right: 10px;
  height: 100%;
  position: relative;
}
.image-layout{
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
.image-overlay{
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
.image-overlay img{
  min-height: 100%;
  cursor: pointer;
  height: 100%;
}
.pagination{
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
.btn-nav{

  position: absolute;
  top: 0;
  height: 100%;
}
.btn-nav >div{
  background-color: #fff;
  border: solid 1px #ccc;
  padding: 8px ;
  border-radius: 4px;
  display: flex;
}
.btn-nav-popup{
  background-color: #fff;
  border: solid 1px #ccc;
  padding: 8px ;
  border-radius: 4px;
  position: absolute;
  display: flex;
  top: 50%;
}
.go-right{
  right: 0;
  transform: translate(-50%,0);
}
.go-left{
  transform: translate(50%, 0);
  left: 0;

}
.go-right svg{
  transform: rotate(180deg);
}
.slick{
  height: 80px;
  overflow: hidden;
  padding: 0;
  list-style: none;
  display: flex;
}
.slick >:not(:last-child){
  margin-right: 8px;
}
.slick img{
  width: 111px;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
}
.active{
  border: 2px solid #2C2C2C;
}
.popup{
  z-index: 1000;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  top: 0;
  left: 0;
}
.navigate-btn{
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
}
.pagination-popup{
  font-size: 14px;
  line-height: 20px;
  padding-left: 24px;
  color: #fff;
}
.action-btn{
  display: flex;
  align-items: center;
  padding-right: 24px;
}
.action-btn svg{
  width: 24px;
  height: 24px;
}
.content-popup{
  position: fixed;
  height: calc(100vh - 56px);
  width: 100%;
  top: 56px;
}
.popup-wrapper{
  position: relative;
  height: calc(100% - 112px);
}
.gallery-holder{
  height: 100%;
  opacity: 0;
  transform: scale(0.5);
  animation: fade-in 0.2s ease .3s forwards;
}
.gallery-popup{
  position: absolute;
  padding: 0;
  display: flex;
  list-style: none;
  width: 100%;
  height: 100%;
}
.gallery-popup li{
  text-align: center;
  flex-shrink: 0;
  width: 100%;
}
.gallery-popup img{
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  max-height: 100%;
  width: auto !important;
  height: auto !important;
  cursor: grab;
}
.slick-popup{
  height: 112px !important;
  padding: 24px 10px !important;
}
@keyframes fade-in {
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

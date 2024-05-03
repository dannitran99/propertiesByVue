<template>
  <div>
    <div class="wrapper-gallery" @mousemove="handleMouseMove" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave">
      <ul :style="{transform: `translate3d(${-858 * currentIdx + currentTranslateX}px, 0px, 0px)`, transitionDuration: `${isTrans?'300ms':'0ms'}`}">
        <li v-for="item in imageList" :key="item.name">
          <div class="image-overlay">
            <img :src="item.url" alt="img" draggable="false"/>
          </div>
          <div class="image-layout" :style="{ backgroundImage: `url(${item.url})` }"></div>
        </li>
      </ul>
      <div class="pagination">{{ `${currentIdx + 1} / ${imageList.length}` }}</div>
      <button class="btn-nav go-right" @click="handleGoRight" v-if="currentIdx<imageList.length-1">
        <icon-leftarrow/>
      </button>
      <button class="btn-nav go-left" @click="handleGoLeft" v-if="currentIdx>0" >
        <icon-leftarrow/>
      </button >
    </div>
    <div @mousedown="handleDownSlick" @mousemove="handleMoveSlick" @mouseup="handleSlickLeave" @mouseleave="handleSlickLeave">
      <ul class="slick" ref="slick">
        <li v-for="(item, idx) in imageList" :key="item.name" @click="handleChangeSlide(idx)">
          <img :src="item.url" alt="img" draggable="false" :class="[{'active' : idx === currentIdx}]"/>
        </li>
      </ul>
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
      isTrans: false,
      currentIdx: 0,
      isDragging: false,
      startPosX: 0,
      currentTranslateX: 0,
      slickTrans: false,
      startSlickPos: 0,
      startSlickScroll: 0
    }
  },
  methods: {
    handleGoRight: function () {
      this.currentIdx++
      this.isTrans = true
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handleGoLeft: function () {
      this.currentIdx--
      this.isTrans = true
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handleMouseDown: function (e) {
      this.isDragging = true
      this.startPosX = e.clientX
    },
    handleMouseMove: function (e) {
      if (!this.isDragging) return
      this.currentTranslateX = e.clientX - this.startPosX
    },
    handleMouseLeave: function (e) {
      this.isDragging = false
      if (this.currentTranslateX > 429 && this.currentIdx > 0) {
        this.currentIdx--
      }
      if (this.currentTranslateX < -429 && this.currentIdx < this.imageList.length - 1) {
        this.currentIdx++
      }
      this.currentTranslateX = 0
      this.isTrans = true
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handleChangeSlide: function (idx) {
      this.currentIdx = idx
      this.isTrans = true
      setTimeout(() => { this.isTrans = false }, 300)
    },
    handleDownSlick: function (e) {
      this.slickTrans = true
      this.startSlickPos = e.clientX
      this.startSlickScroll = this.$refs.slick.scrollLeft
    },
    handleMoveSlick: function (e) {
      if (!this.slickTrans) return
      this.$refs.slick.scrollLeft = this.startSlickScroll - (e.clientX - this.startSlickPos)
    },
    handleSlickLeave: function () {
      this.slickTrans = false
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
/* bug */
  /* backdrop-filter: blur(64px); */
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
  transform: translate(-50%, -50%);
}
.go-left{
  transform: translate(50%, -50%);
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
</style>

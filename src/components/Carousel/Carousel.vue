<template>
  <div class="wrapper-gallery" @mousemove="handleMouseMove" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave">
    <ul :style="{transform: `translate3d(${-858 * currentIdx + currentTranslateX}px, 0px, 0px)`, transitionDuration: `${isTrans?'300ms':'0ms'}`}">
      <li v-for="item in imageList" :key="item.name">
        <div class="image-overlay">
          <img :src="item.url" alt="img" draggable="false"/>
        </div>
        <div class="image-layout" :style="{ backgroundImage: `url(${item.url})` }"></div>
      </li>
    </ul>
    <div></div>
    <button class="btn-nav go-right" @click="handleGoRight" v-if="currentIdx<imageList.length-1">
      <icon-leftarrow/>
    </button>
    <button class="btn-nav go-left" @click="handleGoLeft" v-if="currentIdx>0" >
      <icon-leftarrow/>
    </button >
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
      currentTranslateX: 0
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
/* bug */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  display: block;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  -webkit-backdrop-filter: blur(64px);
  backdrop-filter: blur(64px);
  text-align: center;
}
.image-overlay img{
  min-height: 100%;
  cursor: pointer;
  height: 100%;
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
</style>

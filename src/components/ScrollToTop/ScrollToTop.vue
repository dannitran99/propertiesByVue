<template>
  <div class="wrapper-sc-btn" :class="[{ 'show': showButton }, { 'is-bottom': bottom }]" @click="scrollToTop">
    <icon-arrowup />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButton: false,
      bottom: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.showButton = window.scrollY > 200
      const footerheight = 56
      this.bottom = (window.scrollY + window.innerHeight > document.documentElement.scrollHeight - footerheight)
    },
    scrollToTop() {
      this.showButton && window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.wrapper-sc-btn {
  opacity: 0;
  display: flex;
  width: 40px;
  height: 40px;
  position: fixed;
  right: 8px;
  bottom: 16px;
  justify-content: center;
  align-items: center;
  z-index: 98;
  outline: none;
  transition: opacity 0.4s ease-in-out;
  box-shadow: 0px 8px 20px rgba(182, 182, 182, 0.42);
  border-radius: 48px;
}

.show {
  opacity: 1;
  cursor: pointer;
}

.is-bottom {
  position: absolute;
  bottom: 72px;
}
</style>

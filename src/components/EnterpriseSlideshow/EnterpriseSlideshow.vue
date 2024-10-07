<template>
  <div>
    <h2>Doanh nghiệp tiêu biểu</h2>
    <div v-if="isLoading"></div>
    <div class="slider-content" v-else>
      <div class="slider-wrapper">
        <ul class="slider-card"
          :style="{ transform: `translate3d(${-195 * index}px, 0px, 0px)`, transitionDuration: `${transitionDuration}ms` }">
          <li v-for="(item, idx) in enterpriseList" :key="idx" class="slider-item" @mouseenter="handlePauseInterval"
            @mouseleave="handleResumeInterval">
            <router-link :to="{ name: 'EnterpriseDetail', params: { enterpriseId: item.ID, } }">
              <img :src="item.logo" alt="logo" draggable="false">
            </router-link>
          </li>
          <li v-for="(item, idx) in enterpriseList" :key="idx + 100" class="slider-item"
            @mouseenter="handlePauseInterval" @mouseleave="handleResumeInterval">
            <router-link :to="{ name: 'EnterpriseDetail', params: { enterpriseId: item.ID, } }">
              <img :src="item.logo" alt="logo" draggable="false">
            </router-link>
          </li>
          <li v-for="(item, idx) in enterpriseList" :key="idx + 200" class="slider-item"
            @mouseenter="handlePauseInterval" @mouseleave="handleResumeInterval">
            <router-link :to="{ name: 'EnterpriseDetail', params: { enterpriseId: item.ID, } }">
              <img :src="item.logo" alt="logo" draggable="false">
            </router-link>
          </li>
        </ul>
      </div>
      <button class="btn-carousel">
        <icon-leftarrow />
      </button>
      <button class="btn-carousel go-right">
        <icon-leftarrow />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      transitionDuration: 0,
      interval: undefined
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['enterprises/isLoading']
      }
    },
    enterpriseList: {
      get() {
        return this.$store.getters['enterprises/enterpriseList']
      }
    }
  },
  async created() {
    await this.$store.dispatch('enterprises/getPinnedEnterprise')
    this.index = this.enterpriseList.length
    this.interval = this.intevalSilder()
  },
  methods: {
    intevalSilder() {
      return setInterval(() => {
        this.transitionDuration = 1000
        this.index++
        setTimeout(() => {
          this.transitionDuration = 0
          if (this.index >= (this.enterpriseList.length * 2)) this.index = this.enterpriseList.length
        }, 1000)
      }, 3000)
    },
    handlePauseInterval() {
      clearInterval(this.interval)
    },
    handleResumeInterval() {
      this.interval = this.intevalSilder()
    }
  }
}
</script>

<style scoped lang="scss">
h2 {
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -.2px;
  color: #2C2C2C;
  display: block;
  margin: 0 0 8px 0;
}

.slider-wrapper {
  overflow: hidden;
  user-select: none;
}

.slider-content {
  position: relative;
  padding-top: 16px;
  padding-bottom: 20px;
}

.slider-card {
  display: flex;
}

.slider-item {
  flex-shrink: 0;
  list-style: none;
  width: 165px !important;
  border: 1px solid #F2F2F2;
  box-shadow: 0px 4px 6px rgba(44, 44, 44, 0.04);
  border-radius: 4px;
  height: 110px;
  margin-right: 30px;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    box-shadow: 0px 4px 16px rgba(44, 44, 44, 0.08);
  }

  img {
    max-width: 133px;
    max-height: 86px;
    filter: grayscale(100%);
    transition: all .5s ease-in-out;

    &:hover {
      filter: grayscale(0%);
    }
  }
}

.btn-carousel {
  position: absolute;
  left: -58px;
  top: 48px;
  background: rgba(0, 0, 0, 0);
  border: solid 1px rgba(0, 0, 0, 0);
  padding: 13px 15px;
  border-radius: 8px;
  line-height: 1px !important;

  svg {
    width: 24px;
    height: 24px;
  }
}

.go-right {
  left: unset;
  right: -58px;

  svg {
    transform: rotate(180deg);
  }
}
</style>

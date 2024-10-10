<template>
  <div class="enterprise-content-wrapper">
    <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
    <div v-else>
      <div class="banner">
        <template v-if="enterpriseData.banner">
          <img :src="enterpriseData.banner" alt="banner" class="banner" />
          <div class="banner--overlay"></div>
        </template>
        <img src='../../../assets/error-image-banner_web.svg' class="banner" v-else />
        <div class="banner--content">
          <img :src="enterpriseData.logo" alt="logo" class="banner--content--logo">
          <div class="banner--content--info">
            <h2>{{ enterpriseData.name }}</h2>
          </div>
        </div>
      </div>
      <div class="main-container">
        <div class="main-container--left">
          <h3>Giới thiệu</h3>
          <div class="box-info">
            <div class="box-info--item">
              <label>Địa chỉ</label>
              <p>{{ enterpriseData.street && `${enterpriseData.street}, ` }}{{ enterpriseData.ward }},
                {{ enterpriseData.district }}, {{ enterpriseData.city }}</p>
            </div>
            <div class="box-info--item">
              <label>Lĩnh vực chính</label>
              <p>{{ enterpriseData.businessField }}</p>
            </div>
            <div class="box-info--item" v-if="enterpriseData.subBusiness.length">
              <label>Lĩnh vực phụ</label>
              <p>{{ enterpriseData.subBusiness.join(', ') }}</p>
            </div>
            <div class="box-info--item" v-if="enterpriseData.email">
              <label>Email</label>
              <p>{{ enterpriseData.email }}</p>
            </div>
            <div class="box-info--item" v-if="enterpriseData.website">
              <label>Website</label>
              <a :href="enterpriseData.website" target="_blank">
                {{ enterpriseData.website }}</a>
            </div>
          </div>
          <p class="description-box">
            {{ enterpriseData.description }}
          </p>
        </div>
        <div class="main-container--right">
          <div class="contact-box">
            <h3>Liên hệ doanh nghiệp</h3>
            <p>Hãy liên hệ nếu bạn cần thêm thông tin</p>
            <button class="btn-reveal" @click="handleReveal" :disabled="!enterpriseData.phoneNumber">
              <icon-phone />{{ phoneReveal ? enterpriseData.phoneNumber : phoneNumber }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneReveal: false
    }
  },
  computed: {
    enterpriseData: {
      get() {
        return this.$store.getters['enterprises/enterpriseData']
      }
    },
    isLoading: {
      get() {
        return this.$store.getters['enterprises/isLoading']
      }
    },
    phoneNumber: function () {
      return this.enterpriseData.phoneNumber ? `${this.enterpriseData.phoneNumber.slice(0, -3)}*** Hiện số` : 'Đang cập nhật'
    }
  },
  watch: {
    '$route'() {
      this.handleRequest()
    }
  },
  created() {
    this.handleRequest()
  },
  methods: {
    async handleRequest() {
      await this.$store.dispatch('enterprises/getEnterprisesDetail', {
        id: this.$route.params.enterpriseId,
        query: this.$route.query
      })
    },
    handleReveal() {
      this.phoneReveal = true
    }
  }
}
</script>

<style scoped lang="scss">
.enterprise-content-wrapper {
  width: 100%;
  overflow: hidden;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

.banner {
  position: relative;
  width: 100%;
  min-width: 1140px;
  margin: auto;
  height: 320px;
  overflow: hidden;
  object-fit: cover;

  &--content {
    position: absolute;
    left: calc(50% - 570px);
    bottom: 24px;
    display: flex;

    &--logo {
      height: 120px;
      width: 120px;
      object-fit: contain;
      background: #FFFFFF;
      box-shadow: 0px 4px 8px rgba(182, 182, 182, 0.18);
      border-radius: 4px;
      padding: 12px;
    }

    &--info {
      margin-top: 6px;
      margin-left: 24px;
      width: calc(100vw - 150px);
      color: #fff;
      min-height: 120px;

      h2 {
        font-size: 32px;
        line-height: 44px;
        letter-spacing: -.2px;
        color: #fff;
        font-weight: 500;
      }
    }
  }

  &--overlay {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 230px;
    background: linear-gradient(180deg, rgba(44, 44, 44, 0) 0%, #2C2C2C 108.75%);
    mix-blend-mode: multiply;
  }
}

.main-container {
  width: 1140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  &--left {
    width: 750px;

    h3 {
      font-size: 24px;
      line-height: 32px;
      font-weight: 500;
      letter-spacing: -.2px;
      color: #2C2C2C;
      padding: 40px 0 16px;
    }
  }

  &--right {
    width: calc(100% - 780px);
  }

  @include responsive(lg2) {
    width: 936px;

    &--left {
      width: 650px;
    }

    &--right {
      width: calc(100% - 680px);
    }
  }

  @include responsive(sm1) {
    width: 720px;

    &--left {
      width: 100%;
    }

    &--right {
      display: none;
    }
  }

  @include responsive(sm) {
    width: 100%;
    padding: 0 12px;
  }
}

.box-info {
  &--item {
    border-bottom: 1px solid #F2F2F2;
    padding: 14px 0;
    color: #2C2C2C;
    display: flex;

    label {
      flex-shrink: 0;
      font-family: 'Roboto-Regular', sans-serif;
      font-size: 14px;
      line-height: 20px;
      width: 92px;
      margin-right: 16px;
      font-weight: 700;
    }

    p {
      font-family: 'Roboto-Regular', sans-serif;
      font-size: 14px;
      line-height: 20px;
    }

    a {
      font-family: 'Roboto-Regular', sans-serif;
      font-size: 14px;
      line-height: 20px;
      color: #E03C31 !important;
      font-weight: 700;
    }
  }
}

.description-box {
  padding: 16px 0;
  font-family: 'Roboto-Regular', sans-serif;
  font-size: 14px;
  line-height: 24px;
  white-space: pre-line;
}

.contact-box {
  background: #FAFAFA;
  border-radius: 6px;
  width: 100%;
  padding: 32px;
  margin-top: 40px;
  text-align: center;

  h3 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    letter-spacing: -.2px;
    color: #2C2C2C;
    margin-bottom: 8px;
  }

  p {
    font-family: 'Roboto-Regular', sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #505050;
    margin-bottom: 24px;
  }

  .btn-reveal {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: #fff;
    background: #009BA1;
    font-size: 14px;
    padding: 13px 15px;
    border-radius: 8px;
  }
}
</style>

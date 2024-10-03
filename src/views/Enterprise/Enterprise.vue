<template>
  <div class="wrapper">
    <filter-enterprise />
    <div class="enterprise-list">
      <h1 class="broker-title-sm">
        Các doanh nghiệp, công ty bất động sản hàng đầu tại Việt Nam
      </h1>
      <div v-for="(item, idx) in mainList" :key="idx">
        <h2 class="broker-title">
          {{ item.title }}
        </h2>
        <ul class="list-enterprise">
          <li v-for="(subItem, subIdx) in item.list" :key="subIdx" class="enterprise-item">
            <div class="img-wrapper">
              <img :src="subItem.logo" alt="logo" />
            </div>
            <h3>{{ subItem.name }}</h3>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainList: [
        {
          title: 'Chủ đầu tư',
          list: []
        },
        {
          title: 'Thi công xây dựng',
          list: []
        },
        {
          title: 'Tư vấn thiết kế',
          list: []
        },
        {
          title: 'Sàn giao dịch bất động sản',
          list: []
        },
        {
          title: 'Trang trí nội thất',
          list: []
        },
        {
          title: 'Vật liệu xây dựng',
          list: []
        },
        {
          title: 'Tài chính pháp lý',
          list: []
        },
        {
          title: 'Các lĩnh vực khác',
          list: []
        }
      ]
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
      await this.$store.dispatch('enterprises/getPinnedEnterprise')
      this.enterpriseList.forEach(response => {
        const index = this.mainList.findIndex(main => main.title === response.pinned)
        this.mainList[index].list.length < 4 && this.mainList[index].list.push(response)
      })
    }
  }
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.wrapper {
  margin: 72px auto 0 auto;
  width: 936px;

  @include responsive(sm1) {
    width: 720px;
  }

  @include responsive(sm) {
    width: 100%;
    padding: 0 12px;
  }
}

.broker-title-sm {
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: -0.2px;
  margin-bottom: 8px;
  display: block;
  color: #2C2C2C;
  margin-bottom: 24px;
}

.broker-title {
  font-family: 'Lexend-Medium', sans-serif;
  margin-bottom: 16px;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.2px;
  font-weight: 500;
  color: #2C2C2C;
}

.enterprise-list {
  width: 666px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @include responsive(sm1) {
    width: 100%;
  }
}

.list-enterprise {
  display: flex;
  gap: 14px;
  margin-bottom: 32px;
}

.enterprise-item {
  border: 1px solid #F2F2F2;
  border-radius: 4px;
  padding: 12px;
  width: 156px;
  list-style: none;

  h3 {
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

.img-wrapper {
  width: 100%;
  height: 110px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

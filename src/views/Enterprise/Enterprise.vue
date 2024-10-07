<template>
  <div class="wrapper">
    <filter-enterprise />
    <div class="enterprise-list">
      <template v-if="isFilter">
        <h2 class="broker-title">
          {{ titleFilter }}
        </h2>
        <div class="broker-result" v-if="!isLoading && totalItem">
          Có <strong>{{ totalItem }}</strong> kết quả
        </div>
        <div class="empty-article" v-if="!isLoading && !totalItem">
          <div class="background"></div>
          <p>Rất tiếc! Chúng tôi không tìm thấy kết quả liên quan.
            <br />Vui lòng thử lại hoặc quay về trang trước đó.
          </p>
        </div>
        <ul class="list-filter-enterprise">
          <template v-if="isLoading">
            <enterprise-card-skeleton :isFilter="true" />
            <enterprise-card-skeleton :isFilter="true" />
            <enterprise-card-skeleton :isFilter="true" />
            <enterprise-card-skeleton :isFilter="true" />
            <enterprise-card-skeleton :isFilter="true" />
          </template>
          <template v-else>
            <li v-for="(item, idx) in enterpriseList" :key="idx" class="enterprise-filter-item">
              <div class="enterprise-card-content">
                <div class="img-filter-wrapper">
                  <router-link :to="{ name: 'EnterpriseDetail', params: { enterpriseId: item.ID, } }">
                    <img :src="item.logo" alt="logo-filter" />
                  </router-link>
                </div>
                <div class="enterprise-infomation">
                  <router-link :to="{ name: 'EnterpriseDetail', params: { enterpriseId: item.ID, } }">
                    <h3>{{ item.name }}</h3>
                  </router-link>
                  <p class="card-address" v-if="item.city">
                    <icon-mappoint />{{ item.street && `${item.street}, ` }}{{ item.ward }}, {{ item.district }},
                    {{ item.city }}
                  </p>
                  <p class="card-address" v-if="item.phoneNumber"><icon-cellphone />{{ item.phoneNumber }} </p>
                </div>
              </div>
            </li>
          </template>
        </ul>
        <pagination :total="totalItem" />
      </template>
      <template v-else>
        <h1 class="broker-title-sm">
          Các doanh nghiệp, công ty bất động sản hàng đầu tại Việt Nam
        </h1>
        <div v-for="(item, idx) in mainList" :key="idx">
          <router-link :to="{ name: 'Enterprise', query: { type: item.title } }">
            <h2 class="broker-title">
              {{ item.title }}
            </h2>
          </router-link>
          <ul class="list-enterprise">
            <template v-if="isLoading">
              <enterprise-card-skeleton />
              <enterprise-card-skeleton />
              <enterprise-card-skeleton />
              <enterprise-card-skeleton />
            </template>
            <template v-else>
              <li v-for="(subItem, subIdx) in item.list" :key="subIdx" class="enterprise-item">
                <div class="img-wrapper">
                  <router-link :to="{ name: 'EnterpriseDetail', params: { enterpriseId: subItem.ID, } }">
                    <img :src="subItem.logo" alt="logo" />
                  </router-link>
                </div>
                <router-link :to="{ name: 'EnterpriseDetail', params: { enterpriseId: subItem.ID, } }">
                  <h3>{{ subItem.name }}</h3>
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import EnterpriseCardSkeleton from './EnterpriseCardSkeleton.vue'
export default {
  components: {
    EnterpriseCardSkeleton
  },
  data() {
    return {
      titleFilter: '',
      isFilter: false,
      mainList: []
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
    },
    totalItem: {
      get() {
        return this.$store.getters['enterprises/totalItem']
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
      this.isFilter = Object.keys(this.$route.query).length
      if (this.isFilter) {
        var category = 'Doanh nghiệp các lĩnh vực'
        var direction = ''
        if (this.$route.query.type) {
          category = this.$route.query.type
        }
        if (this.$route.query.district || this.$route.query.city) {
          direction = ` tại ${this.$route.query.district || this.$route.query.city}`
        }
        this.titleFilter = category + direction
        await this.$store.dispatch('enterprises/getAllEnterprises', {
          query: this.$route.query
        })
      } else {
        this.mainList = [
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
        await this.$store.dispatch('enterprises/getPinnedEnterprise')
        this.enterpriseList.forEach(response => {
          const index = this.mainList.findIndex(main => main.title === response.pinned)
          this.mainList[index].list.length < 4 && this.mainList[index].list.push(response)
        })
      }
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

  &:hover {
    color: #999;
  }
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
    color: #2C2C2C !important;

    &:hover {
      color: #999 !important;
    }
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

.enterprise-filter-item {
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  display: flex;
  border: 1px solid #F2F2F2;

  h3 {
    font-family: 'Lexend-Medium', sans-serif;
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.2px;
    color: #2C2C2C;
    font-weight: 500;
    color: #2C2C2C !important;

    &:hover {
      color: #999 !important;
    }
  }
}

.img-filter-wrapper {
  height: 90px;
  width: 120px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.enterprise-card-content {
  display: flex;
}

.enterprise-infomation {
  width: 369px;
}

.card-address {
  display: flex;
  align-items: center;
  color: #505050;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 8px;

  svg {
    flex-shrink: 0;
    margin-right: 8px;
    width: 14px;
    height: 14px;
  }
}

.broker-result {
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 16px;

  strong {
    color: #E03C31;
  }
}

.empty-article {
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  color: #999;
}

.background {
  width: 240px;
  height: 240px;
  background-image: url('../../assets/articles-empty.svg');
  background-size: contain;
  margin: 0 auto;
  margin-bottom: 24px;
}
</style>

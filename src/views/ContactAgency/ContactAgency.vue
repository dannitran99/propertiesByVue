<template>
  <div class="wrapper">
    <filter-contact />
    <h1>Danh bạ nhà môi giới</h1>
    <div class="btn-tab">
      <router-link :to="{ name: 'ContactAgency', query: { contactType: 'doanh-nghiep' } }"
        :class="[{ 'active': isEnterpriseContact }]">
        Công ty môi giới
      </router-link>
      <router-link :to="{ name: 'ContactAgency', query: { contactType: 'ca-nhan' } }"
        :class="[{ 'active': !isEnterpriseContact }]">
        Cá nhân môi giới
      </router-link>
    </div>
    <div class="contact-list">
      <template v-if="isLoading">
        <contact-card-skeleton />
        <contact-card-skeleton />
        <contact-card-skeleton />
        <contact-card-skeleton />
        <contact-card-skeleton />
        <contact-card-skeleton />
      </template>
      <template v-else-if="contactList">
        <contact-card v-for="item in contactList" :key="item.ID" :data="item" />
      </template>
      <div class="empty-article" v-else>
        <div class="background"></div>
        <p>Rất tiếc! Chúng tôi không tìm thấy kết quả liên quan.
          <br />Vui lòng thử lại hoặc quay về trang trước đó.
        </p>
      </div>
      <pagination :total="totalItem" />
    </div>
  </div>
</template>

<script>
import ContactCard from '../../components/ContactCard/ContactCard.vue'
import ContactCardSkeleton from '../../components/ContactCard/ContactCardSkeleton.vue'
export default {
  components: { ContactCard, ContactCardSkeleton },
  data() {
    return {
      isEnterpriseContact: true
    }
  },
  computed: {
    contactList: {
      get() {
        return this.$store.getters['contact/contactList']
      }
    },
    isLoading: {
      get() {
        return this.$store.getters['contact/isLoading']
      }
    },
    totalItem: {
      get() {
        return this.$store.getters['contact/totalItem']
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
      this.isEnterpriseContact = this.$route.query.contactType === 'doanh-nghiep' || !this.$route.query.contactType
      await this.$store.dispatch('contact/getAllContact', {
        query: this.$route.query
      })
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

h1 {
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  letter-spacing: -0.2px;
  margin-bottom: 24px;
  color: #2C2C2C;
}

.wrapper {
  margin: 72px auto 0 auto;
  width: 936px;
}

.btn-tab {
  margin-bottom: 16px;
  display: flex;
}

.btn-tab :not(:last-child) {
  margin-right: -1px;
}

.btn-tab :first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.btn-tab :last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
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

.btn-tab a {
  display: block;
  height: 32px;
  color: #999;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #fff;
  padding: 6px 11px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.active {
  color: #2C2C2C !important;
  background: #F2F2F2 !important;
}

.contact-list {
  width: 666px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}
</style>

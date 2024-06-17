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
      <contact-card v-for="item in contactList" :key="item.ID" :data="item" />
    </div>
  </div>
</template>

<script>
import ContactCard from '../../components/ContactCard/ContactCard.vue'
export default {
  components: { ContactCard },
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
    }
  },
  watch: {
    async '$route'() {
      this.isEnterpriseContact = this.$route.query.contactType === 'doanh-nghiep' || !this.$route.query.contactType
      await this.$store.dispatch('contact/getAllContact', {
        query: this.$route.query
      })
    }
  },
  async created() {
    this.isEnterpriseContact = this.$route.query.contactType === 'doanh-nghiep' || !this.$route.query.contactType
    await this.$store.dispatch('contact/getAllContact', {
      query: this.$route.query
    })
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
}
</style>

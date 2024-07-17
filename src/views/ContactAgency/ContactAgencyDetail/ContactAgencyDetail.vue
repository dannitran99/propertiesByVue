<template>
  <div>
    <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
    <div class="wrapper" v-else>
      <filter-contact />
      <div class="content-detail">
        <div class="detail-main">
          <img :src="contactData.avatar" alt="avt">
          <div>
            <p class="detail-name">
              {{ contactData.name }}
            </p>
            <p class="detail-address" v-if="contactData.city">
              <icon-mappoint />{{ contactData.ward }}, {{ contactData.district }}, {{ contactData.city }}
            </p>
            <p class="detail-address" v-if="contactData.phoneNumber"><icon-cellphone />{{ contactData.phoneNumber }}
            </p>
          </div>
        </div>
        <h3>Giới thiệu</h3>
        <h4>{{ contactData.type === 'ca-nhan' ? 'Khu vực' : 'Lĩnh vực công ty' }} môi giới</h4>
        <p class="detail-txt"> {{ txtIntro }} </p>
        <ul>
          <li v-for="(item, idx) in contactData.scope" :key="idx">
            {{ handleTypeProperty(item) }}
          </li>
        </ul>
        <h4>{{ contactData.type === 'ca-nhan' ? 'Nhà môi giới tự giới thiệu' : 'Về chúng tôi' }}</h4>
        <p class="detail-txt last-p">{{ contactData.description }}</p>
        <h3>Danh sách tin đăng</h3>
        <property-item v-for="item in propertiesist" :key="item.ID" :data="item" :row="true" />
        <pagination :total="totalPropertiesItem" />
      </div>
    </div>
  </div>
</template>

<script>
import PropertyItem from '@/components/PropertiesHomePage/PropertyItem'
import { PROPSSALETYPE, PROPSRENTTYPE } from '@/consts/propstype'
export default {
  components: {
    'property-item': PropertyItem
  },
  data() {
    return {
      txtIntro: ''
    }
  },
  computed: {
    contactData: {
      get() {
        return this.$store.getters['contact/contactData']
      }
    },
    isLoading: {
      get() {
        return this.$store.getters['contact/isLoading']
      }
    },
    propertiesist: {
      get() {
        return this.$store.getters['contact/propertiesist']
      }
    },
    totalPropertiesItem: {
      get() {
        return this.$store.getters['contact/totalPropertiesItem']
      }
    }
  },
  watch: {
    '$route'() {
      this.handleRequest()
    },
    contactData() {
      this.txtIntro = ` ${this.contactData.type === 'ca-nhan' ? 'Nhà môi giới' : ''} ${this.contactData.name}  môi giới ở những khu vực sau: `
    }
  },
  created() {
    this.handleRequest()
  },
  methods: {
    async handleRequest() {
      await this.$store.dispatch('contact/getContactDetail', {
        id: this.$route.params.contactId,
        query: this.$route.query
      })
    },
    handleTypeProperty(item) {
      const listLabel = item.typeProperty === 'sale' ? PROPSSALETYPE : PROPSRENTTYPE
      const entries = Object.entries(listLabel)
      let type = ''
      entries.forEach(([key, value]) => {
        if (value.code === item.type) {
          type = value.primaryLabel
        }
      })
      return `${type} ở ${item.district}, ${item.city}`
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

h3 {
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  letter-spacing: -0.2px;
  margin-bottom: 24px;
  color: #2C2C2C;
}

h4 {
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: -0.2px;
  margin-bottom: 8px;
  color: #2C2C2C;
}

.wrapper {
  margin: 0 auto;
  width: 936px;
}

.content-detail {
  width: 666px;
}

.detail-main {
  display: flex;
  margin-bottom: 40px;
}

.detail-main img {
  width: 150px;
  max-height: 150px;
  margin: 0 49px 0 25px;
  object-fit: cover
}

.detail-name {
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -.2px;
  margin-bottom: 16px;
  color: #2C2C2C;
}

.detail-address {
  font-size: 12px;
  line-height: 16px;
  color: #505050;
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
}

.detail-txt {
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 16px;
  white-space: pre-line;
}

li {
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 16px;
}

.last-p {
  margin-bottom: 40px;
}
</style>

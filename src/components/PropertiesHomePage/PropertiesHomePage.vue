<template>
  <div>
    <div class="title">
      <h2>Bất động sản dành cho bạn</h2>
      <div class="redirect-title">
        <router-link :to="{ name: 'PropertiesForSale' }">
          <p class="clickable-text">Tin nhà đất bán mới nhất</p>
        </router-link>
        <p>|</p>
        <router-link :to="{ name: 'PropertiesForRent' }">
          <p class="clickable-text">Tin nhà đất cho thuê mới nhất</p>
        </router-link>
      </div>
    </div>
    <div class="item-list">
      <template v-if="isLoading && !properties.length">
        <property-skeleton />
        <property-skeleton />
        <property-skeleton />
        <property-skeleton />
        <property-skeleton />
        <property-skeleton />
        <property-skeleton />
        <property-skeleton />
      </template>
      <property-item v-for="item in properties" v-bind:key="item.ID" v-bind:data="item" v-else />
    </div>
    <div class="foot-btn">
      <button @click="handleExpand">{{ expand ? 'Mở rộng' : 'Xem tiếp' }}
        <icon-downtriangle v-if="expand" />
      </button>
    </div>
  </div>
</template>

<script>
import PropertyItem from './PropertyItem.vue'
import PropertySkeleton from './PropertySkeleton.vue'
export default {
  components: {
    'property-item': PropertyItem,
    PropertySkeleton
  },
  data() {
    return {
      expand: true
    }
  },
  computed: {
    properties: {
      get() {
        return this.$store.getters['properties/propertiesListMain']
      }
    },
    isLoading: {
      get() {
        return this.$store.getters['properties/isLoading']
      }
    }
  },
  async created() {
    await this.$store.dispatch('properties/getPropertiesListMain', { p: 1, l: 8 })
  },
  methods: {
    handleExpand: async function () {
      if (this.expand) {
        await this.$store.dispatch('properties/getPropertiesListMain', { p: 1, l: 16 })
        this.expand = false
      } else {
        this.$router.push('/nha-dat-ban')
      }
    }
  }
}
</script>

<style scoped lang="scss">
h2 {
  font-weight: normal;
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -.2px;
  color: #2C2C2C;
  display: block;
  margin: 0;
}

p {
  color: #2C2C2C;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
}

.title {
  height: 32px;
  display: flex;
  justify-content: space-between;
  margin: 0 0 24px 0;
}

.redirect-title {
  display: flex;
  gap: 10px;

  @include responsive(lg) {
    display: none;
  }
}

.clickable-text:hover {
  cursor: pointer;
  color: #999
}

.foot-btn {
  height: 48px;
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;

  @include responsive(lg) {
    gap: 24px;

    .wrapper-item-property,
    .skeleton-wrapper {
      width: calc((100% - 48px) / 3 - 2px);
    }
  }

  @include responsive(sm) {
    gap: 12px;
    row-gap: 24px;

    .wrapper-item-property,
    .skeleton-wrapper {
      width: calc((100% - 12px) / 2 - 2px);
    }
  }
}

.foot-btn button {
  width: 160px;
  color: #2C2C2C;
  background: #fff;
  border: solid 1px #ccc;
  padding: 13px 15px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.foot-btn button:hover {
  color: #2C2C2C;
  background: #FAFAFA;
  border: solid 1px #ccc;
}
</style>

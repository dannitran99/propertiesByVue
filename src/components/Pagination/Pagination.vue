<template>
  <div class="wrapper-pagination" v-if="totalPage > 1">
    <router-link class="item-page icon" :to="{ path: $route.path, query: { ...$route.query, p: page - 1 } }"
      v-if="page !== 1">
      <icon-leftarrow />
    </router-link>
    <div v-for="item in pageList" :key="item.label" class="item-page "
      :class="[{ 'current-page': page === item.label }, { 'none-click': !item.value }]">
      <router-link :to="{ path: $route.path, query: { ...$route.query, p: item.value } }" v-if="item.value">
        {{ item.label }}
      </router-link>
      <icon-threedot v-else />
    </div>
    <router-link class="item-page icon right" :to="{ path: $route.path, query: { ...$route.query, p: page + 1 } }"
      v-if="page !== totalPage">
      <icon-leftarrow />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    }
  },
  data() {
    return {
      totalPage: 0,
      pageList: [],
      page: 1,
      limit: 5
    }
  },
  watch: {
    '$route'() {
      this.page = Number(this.$route.query.p) || 1
      this.limit = Number(this.$route.query.l) || 5
    },
    total() {
      this.handleCalculateTotalPage()
      this.handleRenderPageList()
    },
    page() {
      this.handleRenderPageList()
    }
  },
  created() {
    this.page = Number(this.$route.query.p) || 1
    this.limit = Number(this.$route.query.l) || 5
    this.handleCalculateTotalPage()
    this.handleRenderPageList()
  },
  methods: {
    handleCalculateTotalPage: function () {
      const t = Math.ceil(this.total / this.limit)
      this.totalPage = t
    },
    handleRenderPageList: function () {
      const t = Math.ceil(this.total / this.limit)
      const arrPage = []
      if (t <= 10) {
        for (var i = 1; i <= t; i++) {
          arrPage.push({ label: i, value: i })
        }
      } else {
        if (this.page <= 5) {
          for (var j = 1; j <= (this.page + 2 < 5 ? 5 : this.page + 2); j++) {
            arrPage.push({ label: j, value: j })
          }
        } else {
          arrPage.push({ label: 1, value: 1 }, { label: 0 })
        }
        if (this.page > 5 && this.page <= t - 5) {
          for (var k = this.page - 2; k <= this.page + 2; k++) {
            arrPage.push({ label: k, value: k })
          }
        }
        if (this.page > t - 5) {
          for (var l = this.page - 2 > t - 5 ? t - 4 : this.page - 2; l <= t; l++) {
            arrPage.push({ label: l, value: l })
          }
        } else {
          arrPage.push({ label: 0 }, { label: t, value: t })
        }
      }
      this.pageList = arrPage
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.wrapper-pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 20px;

}

.wrapper-pagination>:not(:last-child) {
  border-right: none;
}

.wrapper-pagination>:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.wrapper-pagination>:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.item-page {
  padding: 5px 11px;
  background: #fff;
  color: #505050;
  border: 1px solid #F2F2F2;
}

.item-page a {
  color: #505050;
}

.current-page {
  border: 1px solid #2C2C2C;
  background: #2C2C2C;
  color: #fff;
}

.current-page a {
  color: #fff;
}

.icon {
  padding: 7px;
  line-height: 1px;
}

.icon svg {
  width: 16px;
  height: 16px;
}

.right svg {
  transform: rotate(180deg);
}

.none-click {
  height: 32px;
  display: flex;
  align-items: center;
}
</style>

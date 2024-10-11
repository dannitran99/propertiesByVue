<template>
  <div class="content">
    <side-bar />
    <div class="main-area" :class="[{ 'hide': !drawer }]">
      <div class="header">
        <div class="content-main fl-bw">
          <h2>Quản lý tin tức</h2>
          <div class="tool-div">
            <div class="input-search">
              <icon-magnify />
              <input v-model="search" type="text" placeholder="Tìm kiếm..." />
            </div>
            <router-link class="btn-submit" to="/quan-ly-tin/tao-tin">Tạo tin</router-link>
          </div>
        </div>
      </div>
      <div class="content-main txt-format">
        <v-card flat>
          <v-data-table :search="search" :items="news" :headers="headers" hide-default-footer
            no-data-text="Không có dữ liệu" :loading="isLoading" loading-text="Đang tải dữ liệu"
            no-results-text="Không có dữ liệu">
            <template v-slot:[`item.thumbnail`]="{ item }">
              <v-img :src="item.thumbnail" height="90" width="160px" style="margin: 4px;"></v-img>
            </template>
            <template v-slot:[`item.create`]="{ item }">
              {{ formatDateTime(item.createdAt) }}
            </template>
          </v-data-table>
          <pagination :total="totalItem" class="py-5" :defaultLimit="10" />
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
import { formatDateTime } from '@/helpers/formater'
export default {
  components: { SideBar },
  data() {
    return {
      search: '',
      headers: [
        { text: 'Ảnh bài viết', value: 'thumbnail', width: 100 },
        { text: 'Tiêu đề', value: 'title', width: 400 },
        { text: 'Loại tin', value: 'category', width: 150 },
        { text: 'Người tạo', value: 'user', width: 100 },
        { text: 'Ngày tạo', value: 'create', width: 150 }
      ]
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters['user/drawer']
      }
    },
    isLoading: {
      get() {
        return this.$store.getters['news/isLoading']
      }
    },
    totalItem: {
      get() {
        return this.$store.getters['news/totalItem']
      }
    },
    news: {
      get() {
        return this.$store.getters['news/newsList']
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
  destroyed() {
    this.$store.dispatch('news/returnInitData')
  },
  methods: {
    formatDateTime,
    async handleRequest() {
      await this.$store.dispatch('news/getNewsList', {
        query: this.$route.query
      })
    }
  }
}
</script>

<style scoped lang="scss">
h2 {
  font-weight: 400;
}

.content {
  display: flex;
}

.main-area {
  background-color: rgb(249, 249, 249);
  width: calc(100vw - 256px);
  transition: all .2s ease;
  overflow: auto;
  height: calc(100vh - 72px);
}

.hide {
  width: 100vw;
}

.txt-format {
  font-family: 'Roboto-Regular', sans-serif;
}

.header {
  background-color: white;
  height: 150px;
  border-bottom: 1px solid rgb(242, 242, 242);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
}

.content-main {
  width: 1320px;
  margin: 20px auto 0;
}

.fl-bw {
  display: flex;
  justify-content: space-between;
}

.input-search {
  width: 200px;
  padding: 5px 10px;
  background: #F2F2F2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.tool-div {
  height: 100%;
  display: flex;
  gap: 8px;
}

.input-search input {
  background: #F2F2F2;
  border: none;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  outline: none;
  width: 100%;
}

.btn-submit {
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  width: fit-content;
  letter-spacing: -0.2px;
  background-color: rgb(224, 60, 49);
  padding: 6px 12px;
  color: rgb(255, 255, 255);
  opacity: 1;
  transition: all .3s ease;
}

.btn-submit:hover {
  opacity: .7;
}
</style>

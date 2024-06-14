<template>
  <div class="content">
    <side-bar />
    <div class="main-area" :class="[{ 'hide': !drawer }]">
      <div class="header">
        <div class="content-main fl-bw">
          <h2>Yêu cầu đăng ký môi giới</h2>
          <div class="input-search">
            <icon-magnify />
            <input v-model="search" type="text" placeholder="Tìm kiếm..." />
          </div>
        </div>
      </div>
      <div class="content-main txt-format">
        <v-card flat>
          <v-data-table :search="search" :items="requestAgency" :headers="headers" hide-default-footer
            no-data-text="Không có dữ liệu" :loading="isLoading" loading-text="Đang tải dữ liệu"
            no-results-text="Không có dữ liệu">
            <template v-slot:[`item.avatar`]="{ item }">
              <v-img :src="item.avatar" height="80" width="100px" cover></v-img>
            </template>
            <template v-slot:[`item.create`]="{ item }">
              {{ formatTime(item.createdAt) }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <div>
                <button class="btn-submit outlined-btn" @click="() => handleDelete(item)">Từ chối</button>
                <button class="btn-submit" @click="() => handleAccepct(item)">Phê duyệt</button>
              </div>
            </template>
          </v-data-table>
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
        { text: 'Tài khoản', value: 'username', width: 100 },
        { text: 'Họ và tên', value: 'name', width: 150 },
        { text: 'Số điện thoại', value: 'phoneNumber', width: 100 },
        { text: 'Ngày tạo', value: 'create', width: 150 },
        { text: 'Ảnh đại diện', value: 'avatar', width: 80 },
        { text: '', value: 'action', width: 50 }
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
        return this.$store.getters['admin/isLoading']
      }
    },
    requestAgency: {
      get() {
        return this.$store.getters['admin/requestAgency']
      }
    }
  },
  async created() {
    await this.$store.dispatch('admin/getRequestAgency')
  },
  methods: {
    formatTime(timestamp) {
      return formatDateTime(timestamp)
    },
    async handleAccepct(item) {
      await this.$store.dispatch('admin/responseRequestAgency', { username: item.username, action: 'active' })
    },
    async handleDelete(item) {
      await this.$store.dispatch('admin/responseRequestAgency', { username: item.username, action: 'refused' })
    }
  }
}
</script>

<style scoped>
h2 {
  font-weight: 400;
}

.content {
  display: flex;
}

.txt-format {
  font-family: 'Roboto-Regular', sans-serif;
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

.outlined-btn {
  border: solid 1px #E03C31 !important;
  background: #fff !important;
  color: #E03C31 !important;
}

.outlined-btn:hover {
  background: #FFECEB !important;
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

.input-search input {
  background: #F2F2F2;
  border: none;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  outline: none;
  width: 100%;
}
</style>

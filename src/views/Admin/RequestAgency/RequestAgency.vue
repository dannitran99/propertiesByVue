<template>
  <div class="content">
    <side-bar />
    <div class="main-area" :class="[{ 'hide': !drawer }]">
      <div class="header">
        <div class="content-main">
          <h2>Yêu cầu đăng ký môi giới</h2>
        </div>
      </div>
      <div class="content-main txt-format">
        <v-table>
          <thead>
            <tr>
              <th class="text-left" id="stt">
                STT
              </th>
              <th class="text-left" id="user">
                Tài khoản
              </th>
              <th class="text-left" id="name">
                Họ và tên
              </th>
              <th class="text-left" id="phone">
                Số điện thoại
              </th>
              <th class="text-left" id="time">
                Thời gian tạo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in requestAgency" :key="item.ID">
              <td>{{ idx + 1 }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.phoneNumber }}</td>
              <td>{{ formatTime(item.createdAt) }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
import { formatDateTime } from '@/helpers/formater'
export default {
  components: { SideBar },
  computed: {
    drawer: {
      get() {
        return this.$store.getters['user/drawer']
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
</style>

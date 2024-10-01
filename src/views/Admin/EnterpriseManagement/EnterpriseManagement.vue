<template>
  <div class="content">
    <side-bar />
    <div class="main-area" :class="[{ 'hide': !drawer }]">
      <div class="header">
        <div class="content-main fl-bw">
          <h2>Quản lý doanh nghiệp</h2>
          <div class="tool-div">
            <div class="input-search">
              <icon-magnify />
              <input v-model="search" type="text" placeholder="Tìm kiếm..." />
            </div>
            <router-link class="btn-submit" to="/quan-ly-doanh-nghiep/tao-moi">Tạo mới</router-link>
          </div>
        </div>
      </div>
      <div class="content-main txt-format">
        <v-card flat>
          <v-data-table :search="search" :items="enterpriseList" :headers="headers" hide-default-footer
            no-data-text="Không có dữ liệu" :loading="isLoading" loading-text="Đang tải dữ liệu"
            no-results-text="Không có dữ liệu">
            <template v-slot:[`item.logo`]="{ item }">
              <v-img :src="item.logo" height="80" width="100px"></v-img>
            </template>
            <template v-slot:[`item.direction`]="{ item }">
              {{ `${item.street}, ${item.ward}, ${item.district}, ${item.city}` }}
            </template>
            <template v-slot:[`item.create`]="{ item }">
              {{ formatDateTime(item.createdAt) }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <div v-if="selectedEdit === item.ID" class="action-div">
                <v-select placeholder="Chọn" dense outlined :items="businessFieldSelect" item-text="label"
                  item-value="label" v-model="selected"></v-select>
              </div>
              <div class="action-div" v-else>
                <p>{{ item.pinned || '--' }}</p>
                <button @click="() => handleEdit(item)"><icon-edit /></button>
              </div>
            </template>
          </v-data-table>
          <pagination :total="totalItem" class="py-5" />
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
      selectedEdit: '',
      businessFieldSelect: [],
      selected: '',
      headers: [
        { text: 'Logo doanh nghiệp', value: 'logo', width: 200 },
        { text: 'Tên doanh nghiệp', value: 'name', width: 300 },
        { text: 'Địa chỉ', value: 'direction', width: 350 },
        { text: 'Ngày tạo', value: 'create', width: 150 },
        { text: 'Đã Ghim', value: 'action', width: 50 }
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
        return this.$store.getters['enterprises/isLoading']
      }
    },
    totalItem: {
      get() {
        return this.$store.getters['enterprises/totalItem']
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
    formatDateTime,
    async handleRequest() {
      await this.$store.dispatch('enterprises/getAllEnterprises', {
        query: this.$route.query
      })
    },
    handleEdit(item) {
      this.selectedEdit = item.ID
      this.selected = item.pinned
      this.businessFieldSelect = [
        { id: 0, label: item.businessField },
        ...item.subBusiness.map((sub, idx) => ({ id: idx + 1, label: sub }))
      ]
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

.action-div {
  width: 200px;
  display: flex;
  gap: 12px;
  align-items: center;

  svg {
    margin-top: 6px;
    opacity: .7;
    width: 18px;
    height: 18px;
  }
}
</style>

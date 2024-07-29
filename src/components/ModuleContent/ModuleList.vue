<template>
  <div>
    <v-row class="mt-0" v-for="(_, idx) in dataForm.list" :key="idx">
      <v-col cols="12" sm="8" class="pb-0">
        <p class="txt-label txt-highlight">Thứ tự danh sách {{ idx + 1 }} <span>*</span></p>
        <v-text-field placeholder=" Nhập tên mục" dense outlined v-model="dataForm.list[idx]"
          :error-messages="errorsList[idx]"></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" class="pb-0">
        <div class="button-list">
          <button type="button" v-if="idx !== 0" @click="() => handleRemove(idx)">
            <icon-minus />
          </button>
          <button type="button" @click="() => handleAdd(idx)">
            <icon-plus />
          </button>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: {
      type: Object
    },
    errors: {
      type: Object
    }
  },
  data() {
    return {
      errorsList: []
    }
  },
  watch: {
    errors() {
      setTimeout(() => {
        this.errorsList = this.errors.list
      }, 0)
    }
  },
  methods: {
    handleAdd(idx) {
      this.dataForm.list.splice(idx + 1, 0, '')
      this.errors.list.splice(idx + 1, 0, '')
    },
    handleRemove(idx) {
      this.dataForm.list.splice(idx, 1)
      this.errors.list.splice(idx, 1)
    }
  }
}
</script>

<style scoped>
.list-title {
  display: flex;
  justify-content: space-between;
}

.button-list {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}

.txt-label {
  margin-bottom: 8px;
  color: rgb(44, 44, 44);
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}.txt-highlight span {
  color: red;
}
</style>

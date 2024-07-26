<template>
  <v-row class="mt-0">
    <v-col cols="12" sm="8" class="pb-0" v-for="(_, idx) in dataForm.list" :key="idx">
      <p class="txt-label txt-highlight">Thứ tự danh sách {{ idx + 1 }} <span>*</span></p>
      <v-text-field placeholder="Nhập tên mục" dense outlined v-model="dataForm.list[idx]"
        :error-messages="errors.list[idx]"></v-text-field>
    </v-col>
  </v-row>
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
  }
}
</script>

<style scoped>
.txt-label {
  margin-bottom: 8px;
  color: rgb(44, 44, 44);
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.txt-highlight span {
  color: red;
}
</style>

<template>
  <v-row class="mt-0">
    <v-col cols="12" class="pb-0 row-checkbox" sm="6">
      <p class="txt-label">In đậm</p>
      <input type="checkbox" v-model="dataForm.isBold" />
    </v-col>
    <v-col cols="12" class="pb-0 row-checkbox" sm="6">
      <p class="txt-label">In nghiêng</p>
      <input type="checkbox" v-model="dataForm.isItalic" />
    </v-col>
    <v-col cols=" 12" class="pb-0">
      <p class="txt-label txt-highlight">Đoạn văn bản <span>*</span></p>
      <v-textarea placeholder="Nhập đoạn văn bản" dense outlined rows="4" no-resize v-model="dataForm.content"
        :error-messages="errors.content"></v-textarea>
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

.row-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
}

.row-checkbox p {
  margin: 0;
}
</style>

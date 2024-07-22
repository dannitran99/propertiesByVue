<template>
  <v-row class="mt-0">
    <v-col cols="12" class="pb-0">
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
</style>

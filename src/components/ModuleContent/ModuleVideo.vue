<template>
  <v-row class="mt-0">
    <v-col cols="12" class="pb-0">
      <p class="txt-label txt-highlight">Url <span>*</span></p>
      <v-text-field placeholder="Nhập link youtube" dense outlined v-model="dataForm.url"
        :error-messages="errors.url"></v-text-field>
    </v-col>
    <v-col cols="12" class="pb-0">
      <p class="txt-label txt-highlight">Mô tả video</p>
      <v-text-field placeholder="Nhập mô tả video" dense outlined v-model="dataForm.description"
        :error-messages="errors.description"></v-text-field>
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

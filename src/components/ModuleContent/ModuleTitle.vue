<template>
  <v-row class="mt-0">
    <v-col cols="12" sm="8" class="pb-0">
      <p class="txt-label txt-highlight">Tiêu đề <span>*</span></p>
      <v-text-field placeholder="Nhập tiêu đề bài viết" dense outlined v-model="dataForm.content"
        :error-messages="errors.content"></v-text-field>
    </v-col>
    <v-col cols="12" sm="4" class="pb-0">
      <p class="txt-label txt-highlight">Kích cỡ <span>*</span></p>
      <v-select placeholder="Chọn" dense outlined :items="textSize" item-text="label" item-value="value"
        v-model="dataForm.size" :error-messages="errors.size"></v-select>
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
  },
  data() {
    return {
      textSize: [
        {
          id: 0,
          label: 'Chọn cỡ chữ',
          value: ''
        },
        {
          id: 1,
          label: 'h1',
          value: 'h1'
        },
        {
          id: 2,
          label: 'h2',
          value: 'h2'
        },
        {
          id: 3,
          label: 'h3',
          value: 'h3'
        },
        {
          id: 4,
          label: 'h4',
          value: 'h4'
        },
        {
          id: 5,
          label: 'h5',
          value: 'h5'
        },
        {
          id: 6,
          label: 'h6',
          value: 'h6'
        }
      ]
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

<template>
  <div>
    <v-row class="mt-0" v-for="(_, idx) in dataForm.article" :key="idx">
      <v-col cols="12" sm="5" class="pb-0">
        <p class="txt-label txt-highlight">Xem thêm bài viết {{ idx + 1 }} <span>*</span></p>
        <v-text-field placeholder=" Nhập tựa đề bài viết" dense outlined v-model="dataForm.article[idx].title"
          :error-messages="errors.article[idx].title"></v-text-field>
      </v-col>
      <v-col cols="12" sm="5" class="pb-0">
        <p class="txt-label txt-highlight">Link bài viết <span>*</span></p>
        <v-text-field placeholder=" Nhập link bài viết" dense outlined v-model="dataForm.article[idx].url"
          :error-messages="errors.article[idx].url"></v-text-field>
      </v-col>
      <v-col cols="12" sm="1" class="pb-0">
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
  methods: {
    handleAdd(idx) {
      this.dataForm.article.splice(idx + 1, 0, {
        title: '',
        url: ''
      })
      this.errors.article.splice(idx + 1, 0, {
        title: '',
        url: ''
      })
    },
    handleRemove(idx) {
      this.dataForm.article.splice(idx, 1)
      this.errors.article.splice(idx, 1)
    }
  }
}
</script>

<style scoped>
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
}

.txt-highlight span {
  color: red;
}
</style>

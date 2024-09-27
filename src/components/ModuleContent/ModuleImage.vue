<template>
  <v-row class="mt-0">
    <v-col cols="12" class="pb-0">
      <p class="txt-label txt-highlight">Hình ảnh <span>*</span></p>
      <input accept="image/*,.heic" type="file" autocomplete="off" tabindex="-1" style="display: none;" ref="fileInput"
        @change="onFileSelected">
      <div v-if="dataForm.image" class="img-upload-place">
        <img :src="dataForm.image" alt="avatar" class="avatar-img">
        <div class="close-btn" @click="handleDeleteThumbnail">
          <icon-closewb />
        </div>
      </div>
      <template v-else>
        <div class="img-upload-place" @click="selectFiles" @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
          <icon-imageuploader />
          <p class="txt-upload-primary">Bấm để chọn ảnh cần tải lên</p>
          <p class="txt-upload-secondary">hoặc kéo thả ảnh vào đây</p>
        </div>
        <p v-if="errors.image" class="warning-txt">{{ errors.image }}</p>
      </template>
    </v-col>
    <v-col cols="12" class="pb-0">
      <p class="txt-label txt-highlight">Mô tả ảnh</p>
      <v-text-field placeholder="Nhập mô tả hình ảnh" dense outlined v-model="dataForm.description"
        :error-messages="errors.description"></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { fileUploader } from '@/helpers/fileUploader'
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
      isDragging: false
    }
  },
  methods: {
    onFileSelected(event) {
      const files = event.target.files
      if (files[0].type.split('/')[0] === 'image') {
        this.$store.dispatch('user/postImg', fileUploader(files[0])).then(
          (res) => {
            this.dataForm.image = res.url
          }
        )
      }
    },
    handleDeleteThumbnail() {
      this.dataForm.image = ''
    },
    selectFiles() {
      this.$refs.fileInput.click()
    },
    onDragOver(event) {
      event.preventDefault()
      this.isDragging = true
      event.dataTransfer.dropEffect = 'copy'
    },
    onDragLeave(event) {
      event.preventDefault()
      this.isDragging = false
    },
    onDrop(event) {
      event.preventDefault()
      this.isDragging = false
      const files = event.dataTransfer.files
      for (const element of files) {
        if (element.type.split('/')[0] !== 'image') continue
        this.$store.dispatch('user/postImg', fileUploader(element)).then(
          (res) => {
            this.dataForm.image = res.url
          }
        )
        return
      }
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

.img-upload-place {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 138px;
  border: 1px dashed rgb(242, 242, 242);
  cursor: pointer;
}

.close-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border: 1px solid rgb(204, 204, 204);
}

.avatar-img {
  margin: auto;
  width: auto;
  height: 138px;
  object-fit: cover;
  cursor: default;
}

.txt-upload-primary {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(44, 44, 44);
  margin: 0;
}

.txt-upload-secondary {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(153, 153, 153);
  margin: 0;
}

.warning-txt {
  color: rgb(224, 60, 49);
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
}
</style>

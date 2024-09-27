<template>
  <div class="wrapper-content">
    <side-bar />
    <form class="main-area" :class="[{ 'hide': !drawer }]" @submit.prevent="handleForm">
      <div class="paper">
        <h2 class="px-5">Thông tin doanh nghiệp</h2>
        <div class="paper-content">
          <input accept="image/*,.heic" type="file" autocomplete="off" tabindex="-1" style="display: none;"
            ref="fileInput" @change="onFileSelected">
          <div v-if="values.logo" class="img-upload-place mt-2">
            <img :src="values.logo" alt="avatar" class="avatar-img">
            <div class="close-btn" @click="handleDelete">
              <icon-closewb />
            </div>
          </div>
          <div class="img-upload-place mt-2" @click="selectFiles" @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave" @drop.prevent="onDrop" v-else>
            <icon-camera />
            <p class="txt-upload-secondary mb-0">Tải ảnh</p>
          </div>
          <v-row class="mt-0">
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Lĩnh vực chính <span>*</span></p>
              <v-select placeholder="Chọn" dense outlined :items="enterpriseCategory" item-text="label"
                item-value="label" v-model="values.businessField" :error-messages="errors.businessField"></v-select>
            </v-col>
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Lĩnh vực phụ</p>
              <v-combobox placeholder="Chọn" dense outlined v-model="values.subBusiness"
                :error-messages="errors.subBusiness" :items="enterpriseCategory" item-text="label" item-value="label"
                hide-details hide-no-data hide-selected multiple single-line small-chips></v-combobox>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="paper sticky-wrapper">
        <button type="submit" class="btn-submit">Đăng bài</button>
      </div>
    </form>
  </div>
</template>

<script>
import { fileUploader } from '@/helpers/fileUploader'
import SideBar from '@/components/SideBar'
import { ENTERPRISE_SELECTOR } from '@/consts/label'
export default {
  components: {
    SideBar
  },
  data() {
    return {
      isDragging: false,
      enterpriseCategory: ENTERPRISE_SELECTOR,
      values: {
        logo: '',
        businessField: '',
        subBusiness: []
      },
      errors: {
        logo: '',
        businessField: '',
        subBusiness: ''
      }
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters['user/drawer']
      }
    }
  },
  methods: {
    handleForm() {
      console.log(this.values)
    },
    onFileSelected(event) {
      const files = event.target.files
      if (files[0].type.split('/')[0] === 'image') {
        this.$store.dispatch('user/postImg', fileUploader(files[0])).then(
          (res) => {
            this.values.logo = res.url
          }
        )
      }
    },
    handleDelete() {
      this.values.logo = ''
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
            this.values.logo = res.url
          }
        )
        return
      }
    }
  }
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

h2 {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 400;
}

.wrapper-content {
  display: flex;
}

.main-area {
  padding-top: 24px;
  background-color: rgb(249, 249, 249);
  width: calc(100vw - 256px);
  transition: all .2s ease;
  overflow: auto;
  height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
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

.paper {
  width: 696px;
  padding-top: 24px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 4px;
  border-radius: 4px;
}

.paper-content {
  padding: 20px;
}

.hide {
  width: 100vw;
}

.sticky-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  padding: 8px 24px;
  position: sticky;
  bottom: 0px;
  z-index: 7;
}

.img-upload-place {
  position: relative;
  margin: auto;
  border: 1px dashed rgb(242, 242, 242);
  border-radius: 100%;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(153, 153, 153);
  cursor: pointer;
  background-color: rgb(250, 250, 250);
}

.avatar-img {
  margin: auto;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: default;
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
</style>

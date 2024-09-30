<template>
  <div class="wrapper-content">
    <side-bar />
    <form class="main-area" :class="[{ 'hide': !drawer }]" @submit.prevent="handleForm">
      <div :class="[{ 'point-event': isLoading }, 'paper']">
        <h2 class="px-5">Thông tin doanh nghiệp</h2>
        <div class="paper-content">
          <p class="txt-label txt-highlight">Logo doanh nghiệp <span>*</span></p>
          <input accept="image/*,.heic" type="file" autocomplete="off" tabindex="-1" style="display: none;"
            ref="fileInput" @change="(event) => onFileSelected(event, 'logo')">
          <div v-if="values.logo" class="img-upload-place mt-2">
            <img :src="values.logo" alt="avatar" class="avatar-img">
            <div class="close-btn" @click="() => handleDelete('logo')">
              <icon-closewb />
            </div>
          </div>
          <div class="img-upload-place mt-2" @click="() => selectFiles('fileInput')" @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave" @drop.prevent="(event) => onDrop(event, 'logo')" v-else>
            <icon-camera />
            <p class="txt-upload-secondary mb-0">Tải ảnh</p>
          </div>
          <p v-if="errors.logo" class="warning-txt">{{ errors.logo }}</p>
          <p class="txt-label txt-highlight">Banner</p>
          <input accept="image/*,.heic" type="file" autocomplete="off" tabindex="-1" style="display: none;"
            ref="fileInputBanner" @change="(event) => onFileSelected(event, 'banner')">
          <div v-if="values.banner" class="img-upload-place-banner">
            <img :src="values.banner" alt="avatar" class="banner-img">
            <div class="close-btn" @click="() => handleDelete('banner')">
              <icon-closewb />
            </div>
          </div>
          <template v-else>
            <div class="img-upload-place-banner" @click="() => selectFiles('fileInputBanner')"
              @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave"
              @drop.prevent="(event) => onDrop(event, 'banner')">
              <icon-imageuploader />
              <p class="txt-upload-primary">Bấm để chọn ảnh cần tải lên</p>
              <p class="txt-upload-secondary">hoặc kéo thả ảnh vào đây</p>
            </div>
            <p v-if="errors.banner" class="warning-txt">{{ errors.banner }}</p>
          </template>
          <v-row class="mt-0">
            <v-col cols="12" sm="12" class="pb-0">
              <p class="txt-label txt-highlight">Tên doanh nghiệp <span>*</span></p>
              <v-text-field placeholder="Nhập tên doanh nghiệp" dense outlined v-model="values.name"
                :error-messages="errors.name"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Tỉnh, thành phố <span>*</span></p>
              <v-combobox placeholder="Chọn" dense outlined :items="cityItem.map(item => item.name)"
                v-model="values.city" :error-messages="errors.city" @change="onChangeCity"></v-combobox>
            </v-col>
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Quận, huyện <span>*</span></p>
              <v-combobox placeholder="Chọn" dense outlined :items="districtItem.map(item => item.name)"
                v-model="values.district" :error-messages="errors.district" @change="onChangeDistrict"></v-combobox>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Phường, xã <span>*</span></p>
              <v-combobox placeholder="Chọn" dense outlined :items="wardItem.map(item => item.name)"
                v-model="values.ward" :error-messages="errors.ward"></v-combobox>
            </v-col>
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Đường, phố</p>
              <v-combobox placeholder="Chọn" dense outlined v-model="values.street"
                :error-messages="errors.street"></v-combobox>
            </v-col>
          </v-row>
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
          <v-row class="mt-0 pb-3">
            <v-col class="pb-0">
              <p class="txt-label txt-highlight">Mô tả <span>*</span></p>
              <v-textarea placeholder="Nhập mô tả bài viết" dense outlined rows="4" no-resize
                v-model="values.description" :error-messages="errors.description"></v-textarea>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="mt-5" :class="[{ 'point-event': isLoading }, 'paper']">
        <h2 class="px-5">Thông tin liên hệ</h2>
        <div class="paper-content">
          <v-row class="mt-0">
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Số điện thoại</p>
              <v-text-field placeholder="Nhập số điện thoại" dense outlined type="number" v-model="values.phoneNumber"
                :error-messages="errors.phoneNumber" hide-spin-buttons></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Email</p>
              <v-text-field placeholder="Nhập email" dense outlined type="email" v-model="values.email"
                :error-messages="errors.email"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Website</p>
              <v-text-field placeholder="Nhập địa chỉ website" dense outlined v-model="values.website"
                :error-messages="errors.website"></v-text-field>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="paper sticky-wrapper">
        <button type="submit" class="btn-submit">Đăng ký</button>
      </div>
    </form>
    <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
  </div>
</template>

<script>
import { fileUploader } from '@/helpers/fileUploader'
import SideBar from '@/components/SideBar'
import { ENTERPRISE_SELECTOR } from '@/consts/label'
import { schema } from './validate'
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
        banner: '',
        name: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        businessField: '',
        subBusiness: [],
        description: '',
        phoneNumber: '',
        email: '',
        website: ''
      },
      errors: {
        logo: '',
        banner: '',
        name: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        businessField: '',
        subBusiness: '',
        description: '',
        phoneNumber: '',
        email: '',
        website: ''
      }
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['enterprises/isLoading']
      }
    },
    drawer: {
      get() {
        return this.$store.getters['user/drawer']
      }
    },
    cityItem: {
      get() {
        return this.$store.getters['common/city']
      }
    },
    districtItem: {
      get() {
        return this.$store.getters['common/district']
      }
    },
    wardItem: {
      get() {
        return this.$store.getters['common/ward']
      }
    }
  },
  async created() {
    await this.$store.dispatch('common/getCity')
  },
  methods: {
    handleForm() {
      this.errors = {
        logo: '',
        banner: '',
        name: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        businessField: '',
        subBusiness: '',
        description: '',
        phoneNumber: '',
        email: '',
        website: ''
      }
      schema.validate(this.values, { abortEarly: false })
        .then(() => {
          this.$store.dispatch('enterprises/createEnterprise', {
            logo: this.values.logo,
            banner: this.values.banner,
            name: this.values.name,
            city: this.values.city,
            district: this.values.district,
            ward: this.values.ward,
            street: this.values.street,
            businessField: this.values.businessField,
            subBusiness: this.values.subBusiness.map(item => item.label),
            description: this.values.description,
            phoneNumber: this.values.phoneNumber,
            email: this.values.email,
            website: this.values.website,
            createdAt: new Date()
          })
            .then(() => {
            })
        })
        .catch((err) => {
          err.inner.forEach(error => {
            this.errors = { ...this.errors, [error.path]: error.message }
          })
        })
    },
    onFileSelected(event, name) {
      const files = event.target.files
      if (files[0].type.split('/')[0] === 'image') {
        this.$store.dispatch('user/postImg', fileUploader(files[0])).then(
          (res) => {
            this.values[name] = res.url
          }
        )
      }
    },
    handleDelete(name) {
      this.values[name] = ''
    },
    selectFiles(name) {
      this.$refs[name].click()
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
    onDrop(event, name) {
      event.preventDefault()
      this.isDragging = false
      const files = event.dataTransfer.files
      for (const element of files) {
        if (element.type.split('/')[0] !== 'image') continue
        this.$store.dispatch('user/postImg', fileUploader(element)).then(
          (res) => {
            this.values[name] = res.url
          }
        )
        return
      }
    },
    async onChangeCity(input) {
      await this.$store.dispatch('common/clearList', 'district')
      await this.$store.dispatch('common/clearList', 'ward')
      this.values.district = ''
      this.values.ward = ''
      this.values.street = ''
      const code = this.cityItem.find(item => item.name === input).code
      await this.$store.dispatch('common/getDistrict', code)
    },
    async onChangeDistrict(input) {
      await this.$store.dispatch('common/clearList', 'ward')
      this.values.ward = ''
      this.values.street = ''
      const code = this.districtItem.find(item => item.name === input).code
      await this.$store.dispatch('common/getWard', code)
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

.loading {
  position: absolute;
  top: 50%;
  left: calc(50% + 115px);
  transform: translate(-50%, -50%)
}

.point-event {
  filter: blur(1px);
  pointer-events: none;
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

.warning-txt {
  color: rgb(224, 60, 49);
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  text-align: center;
}

.btn-submit:hover {
  opacity: .7;
}

.img-upload-place-banner {
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

.banner-img {
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
</style>

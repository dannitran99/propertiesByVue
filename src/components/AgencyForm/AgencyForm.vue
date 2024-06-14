<template>
  <form @submit.prevent="handleAgencyForm">
    <div class="form">
      <div class="agency-wrapper">
        <div class="status-notify" v-if="status === 'pending'">
          <p>Mẫu đã được gửi, vui lòng chờ phê duyệt</p>
        </div>
        <div class="status-notify alert" v-if="status === 'refused'">
          <p>Mẫu của bạn đã không được phê duyệt! <span @click="handleDeleteRequest">Gửi lại mẫu khác</span></p>
        </div>
        <div class="notice-container">
          <p class="notice-title">Để đăng ký Môi giới chuyên nghiệp, bạn cần thực hiện theo các bước sau:</p>
          <p class="notice-content">
            <span>1</span>Cung cấp các thông tin cá nhân, đảm bảo chính xác và rõ ràng về bạn
          </p>
          <p class="notice-content"><span>2</span>
            Sau khi hoàn tất, ấn nút “Đăng ký”
          </p>
          <p class="notice-content"><span>3</span>
            Nhận kết quả xét duyệt
          </p>
          <p class="notice-warning">Lưu ý: sau khi trở thành Môi giới chuyên nghiệp<br />
            • Tên và ảnh đại diện dùng để đăng ký Môi giới chuyên nghiệp sẽ được áp dụng lên tất cả các tin đăng
            của
            bạn và hiển thị trên khắp website Batdongsongsan.com.vn<br />
            • Các thay đổi liên quan tới thông tin liên hệ sẽ cần được Batdongsan.com.vn xét duyệt lại</p>
        </div>
      </div>
      <v-row class="mt-1 mb-5">
        <v-col cols="12" class="pb-0">
          <p class="txt-label txt-highlight">Ảnh đại diện <span>*</span></p>
          <p class="notice-warning">
            Ảnh nên chụp nửa người phía trên, nhìn rõ mặt và thể hiện sự chuyên nghiệp của bạn
          </p>
          <input accept="image/*,.heic" type="file" autocomplete="off" tabindex="-1" style="display: none;"
            ref="fileInput" @change="onFileSelected">
          <div v-if="valuesAgency.avatar" class="img-upload-place">
            <img :src="valuesAgency.avatar" alt="avatar" class="avatar-img">
            <div class="close-btn" @click="handleDeleteAvatar">
              <icon-closewb />
            </div>
          </div>
          <template v-else>
            <div class="img-upload-place" @click="selectFiles" @dragover.prevent="onDragOver"
              @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
              <icon-camera />
              <p class="txt-upload-secondary mb-0">Tải ảnh</p>
            </div>
            <p v-if="errValuesAgency.avatar" class="warning-txt">{{ errValuesAgency.avatar }}</p>
          </template>
        </v-col>
      </v-row>
      <v-row class="mt-1 mb-5">
        <v-col cols="12" sm="6" class="pb-0">
          <p class="txt-label txt-highlight">Họ và tên <span>*</span></p>
          <v-text-field dense outlined v-model="valuesAgency.name" :error-messages="errValuesAgency.name"
            @validate="validate('name')"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pb-0">
          <p class="txt-label txt-highlight">Số điện thoại chính <span>*</span></p>
          <v-text-field dense outlined v-model="valuesAgency.phoneNumber" :error-messages="errValuesAgency.phoneNumber"
            @validate="validate('phoneNumber')" type="number" hide-spin-buttons></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div class="paper sticky-wrapper">
      <button type="submit" class="btn-submit"
        :class="[{ 'disabled-btn': status === 'pending' || status === 'refused' }]"
        :disabled="status === 'pending' || status === 'refused'">Đăng ký</button>
    </div>
  </form>
</template>

<script>
import { UPLOAD_PRESET, CLOUD_NAME } from '@/consts/cloudinary'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  avatar: Yup.string().required('Vui lòng tải lên ảnh đại diện'),
  name: Yup.string().required('Vui lòng điền họ và tên'),
  phoneNumber: Yup.string().required('Vui lòng điền số điện thoại')
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      isDragging: false,
      valuesAgency: {
        avatar: '',
        name: '',
        phoneNumber: ''
      },
      errValuesAgency: {
        avatar: '',
        name: '',
        phoneNumber: ''
      },
      status: ''
    }
  },
  computed: {
    contactUser: {
      get() {
        return this.$store.getters['contact/contactUser']
      }
    }
  },
  watch: {
    contactUser() {
      this.valuesAgency.avatar = this.contactUser.avatar
      this.valuesAgency.name = this.contactUser.name
      this.valuesAgency.phoneNumber = this.contactUser.phoneNumber
      this.status = this.contactUser.status
    }
  },
  async created() {
    await this.$store.dispatch('contact/getContactUser')
  },
  methods: {
    handleAgencyForm() {
      this.errValuesAgency = {
        avatar: '',
        name: '',
        phoneNumber: ''
      }
      schema.validate(this.valuesAgency, { abortEarly: false })
        .then(() => {
          this.$store.dispatch('contact/registerAgency', {
            avatar: this.valuesAgency.avatar,
            name: this.valuesAgency.name,
            phoneNumber: this.valuesAgency.phoneNumber,
            createdAt: new Date()
          })
            .then(() => {
              location.reload()
            })
        })
        .catch((err) => {
          err.inner.forEach(error => {
            this.errValuesAgency = { ...this.errValuesAgency, [error.path]: error.message }
          })
        })
    },
    validate(field) {
      schema
        .validateAt(field, this.valuesAgency)
        .then(() => {
          this.errValuesAgency[field] = ''
        })
        .catch(err => {
          this.errValuesAgency[err.path] = err.message
        })
    },
    onFileSelected(event) {
      const files = event.target.files
      if (files[0].type.split('/')[0] === 'image') {
        const post = new FormData()
        post.append('file', files[0])
        post.append('upload_preset', UPLOAD_PRESET)
        post.append('cloud_name', CLOUD_NAME)
        this.$store.dispatch('user/postImg', post).then(
          (res) => {
            this.valuesAgency.avatar = res.url
          }
        )
      }
    },
    handleDeleteAvatar() {
      this.valuesAgency.avatar = ''
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
        const post = new FormData()
        post.append('file', files[0])
        post.append('upload_preset', UPLOAD_PRESET)
        post.append('cloud_name', CLOUD_NAME)
        this.$store.dispatch('user/postImg', post).then(
          (res) => {
            this.valuesAgency.avatar = res.url
          }
        )
        return
      }
    },
    handleDeleteRequest() {
      this.$store.dispatch('contact/deleteRequestAgency')
    }
  }
}
</script>

<style scoped>
.form {
  margin: 24px;
}

.status-notify {
  margin-bottom: 16px;
  background-color: rgb(255, 248, 231);
  padding: 12px 16px;
  box-shadow: rgba(44, 44, 44, 0.04) 0px 4px 6px;
  border-radius: 8px;
  border: 1px solid rgb(252, 180, 10);
}

.status-notify p {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(44, 44, 44);
}

.txt-label {
  margin-bottom: 8px;
  color: rgb(44, 44, 44);
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.avatar-img {
  margin: auto;
  border-radius: 100%;
  width: 128px;
  height: 128px;
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

.img-upload-place {
  position: relative;
  margin: auto;
  border: 1px dashed rgb(204, 204, 204);
  ;
  border-radius: 100%;
  width: 128px;
  height: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(153, 153, 153);
  cursor: pointer;
  background-color: rgb(250, 250, 250);
}

.paper {
  width: 696px;
  padding-top: 24px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 4px;
  border-radius: 4px;
}

.sticky-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  padding: 8px 24px;
  position: sticky;
  bottom: 0px;
  z-index: 10;
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

.disabled-btn {
  opacity: .7;
}

.agency-wrapper {
  margin-bottom: 24px;
}

.notice-container {
  padding: 16px 24px;
  border-radius: 4px;
  background-color: rgb(242, 242, 242);
}

.notice-title {
  margin-bottom: 12px;
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: -0.2px;
  color: rgb(44, 44, 44);
}

.notice-content {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(44, 44, 44);
}

.notice-container span {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
  background-color: rgb(0, 155, 161);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  max-width: 24px;
  max-height: 24px;
  margin-right: 8px;
}

.notice-warning {
  margin: 10px 0px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(44, 44, 44);
}

.txt-highlight span {
  color: red;
}

.warning-txt {
  color: rgb(224, 60, 49);
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  text-align: center;
}

.alert {
  border: 1px solid red;
  background: #FFECEB;
}

.alert span {
  color: red;
  text-decoration: underline;
  cursor: pointer;
}
</style>

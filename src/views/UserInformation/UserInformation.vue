<template>
  <div class="content">
    <side-bar />
    <div class="main-area" :class="[{ 'hide': !drawer }]">
      <div :class="[{ 'point-event': isLoading || isLoadingContact }, 'paper']">
        <h2 class="px-5">Quản lý tài khoản</h2>
        <div class="tab">
          <button @click="navigate('tai-khoan')" :class="[{ 'active': tab === 'tai-khoan' }]">Chỉnh sửa thông
            tin</button>
          <button @click="navigate('doi-mat-khau')" :class="[{ 'active': tab === 'doi-mat-khau' }]">Cài đặt tài
            khoản</button>
          <button @click="navigate('dang-ky-moi-gioi')" :class="[{ 'active': tab === 'dang-ky-moi-gioi' }]"
            v-if="beforeRouteEnter(['user', 'agency'])">Đăng ký Môi giới chuyên nghiệp</button>
        </div>
        <div v-if="tab === 'tai-khoan'">
          <form @submit.prevent="handleChangeInfo">
            <div class="form">
              <h3>Thông tin cá nhân</h3>
              <input accept="image/*,.heic" type="file" autocomplete="off" tabindex="-1" style="display: none;"
                ref="fileInput" @change="onFileSelected">
              <div v-if="avatar" class="img-upload-place mt-2">
                <img :src="avatar" alt="avatar" class="avatar-img">
                <div class="close-btn" @click="handleDeleteAvatar">
                  <icon-closewb />
                </div>
              </div>
              <div class="img-upload-place mt-2" @click="selectFiles" @dragover.prevent="onDragOver"
                @dragleave.prevent="onDragLeave" @drop.prevent="onDrop" v-else>
                <icon-camera />
                <p class="txt-upload-secondary mb-0">Tải ảnh</p>
              </div>
              <v-row class="mt-1 mb-5">
                <v-col cols="12" sm="6" class="pb-0">
                  <p class="txt-label">Họ và tên</p>
                  <v-text-field dense outlined hide-details v-model="valuesInfo.name"></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <h3 class="mt-5">Thông tin liên hệ</h3>
              <v-row class="mt-1 mb-3">
                <v-col cols="12" sm="6" class="pb-0">
                  <p class="txt-label">Số điện thoại</p>
                  <v-text-field dense outlined hide-details type="number" hide-spin-buttons
                    v-model="valuesInfo.phoneNumber"></v-text-field>
                </v-col>
              </v-row>
              <p class="txt-label">Email</p>
              <v-text-field dense outlined hide-details v-model="valuesInfo.email" type="email"></v-text-field>
            </div>
            <div class="paper sticky-wrapper">
              <button type="submit" class="btn-submit">Lưu thay đổi</button>
            </div>
          </form>
        </div>
        <div v-if="tab === 'doi-mat-khau'">
          <form class="form" @submit.prevent="handleChangePass">
            <h3>Đổi mật khẩu</h3>
            <v-row class="mt-1">
              <v-col cols="12" sm="6" class="pb-0">
                <p class="txt-label">Mật khẩu hiện tại</p>
                <v-text-field dense outlined type="password" v-model="values.currentPassword"
                  :error-messages="errors.currentPassword" @validate="validate('currentPassword')"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" class="py-0">
                <p class="txt-label">Mật khẩu mới</p>
                <v-text-field dense outlined type="password" v-model="values.newPassword"
                  :error-messages="errors.newPassword" @validate="validate('newPassword')"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" class="py-0">
                <p class="txt-label">Nhập lại mật khẩu mới</p>
                <v-text-field dense outlined type="password" v-model="values.confirmPassword"
                  :error-messages="errors.confirmPassword" @validate="validate('confirmPassword')"></v-text-field>
              </v-col>
              <v-col class="col-btn" cols="12" sm="6">
                <button type="submit" class="btn-submit">Lưu thay đổi</button>
              </v-col>
            </v-row>
            <p class="txt-message">{{ errChangePass }}</p>
            <p class="txt-description">Mật khẩu tối thiểu 8 ký tự</p>
          </form>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Yêu cầu khóa tài khoản</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="txt-label">Nhập mật khẩu hiện tại</p>
                <v-row>
                  <v-col cols="12" sm="6" class="py-2">
                    <v-text-field hide-details="true" dense outlined type="password"
                      v-model="currentPassDisable"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" class="py-2">
                    <button class="btn-submit" @click="handleDisableAccount">Khóa tài khoản</button>
                  </v-col>
                </v-row>
                <p class="txt-message mt-3 mb-0">{{ errDisableAccount }}</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Yêu cầu xóa tài khoản</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="txt-label">Gửi yêu cầu xoá toàn bộ thông tin của tài khoản. Sau khi được xử lý, toàn bộ thông
                  tin sẽ được xoá và không thể hoàn tác</p>
                <button class="btn-outlined-submit" @click="dialog = true">Yêu cầu xoá tài khoản</button>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div v-if="tab === 'dang-ky-moi-gioi'">
          <agency-form />
        </div>
      </div>
    </div>
    <v-snackbar v-model="snackbar" right>
      Đổi mật khẩu thành công
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="closeSnackbar">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5">
          Yêu cầu xoá tài khoản
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pb-0">
          <p class="mt-5">Khi bạn đồng ý xóa tài khoản, toàn bộ thông tin thuộc tài khoản của bạn sẽ bị xóa vĩnh viễn.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <button class="btn-negative" @click="dialog = false">Hủy bỏ</button>
          <button class="btn-submit ml-3" @click="handleDeleteAccount">Gửi yêu cầu</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-progress-circular indeterminate class="loading" v-if="isLoading || isLoadingContact"></v-progress-circular>
  </div>
</template>

<script>
import { beforeRouteEnter } from '@/helpers/JWTVerify'
import SideBar from '@/components/SideBar'
import AgencyForm from '@/components/AgencyForm'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { fileUploader } from '@/helpers/fileUploader'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  currentPassword: Yup.string().required('Vui lòng nhập mật khẩu'),
  newPassword: Yup.string().min(8, 'Mật khẩu tối thiểu 8 ký tự').required('Vui lòng nhập mật khẩu'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Nhập lại mật khẩu không khớp')
})

const schemaInfo = Yup.object().shape({
  name: Yup.string(),
  phoneNumber: Yup.string(),
  email: Yup.string().email()
})

export default {
  components: {
    SideBar,
    ValidationProvider,
    ValidationObserver,
    AgencyForm
  },
  data() {
    return {
      tab: undefined,
      values: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      valuesInfo: {
        name: '',
        phoneNumber: '',
        email: ''
      },
      errors: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      currentPassDisable: '',
      dialog: false,
      isDragging: false
    }
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.getters['user/snackbar']
      }
    },
    errChangePass: {
      get() {
        return this.$store.getters['user/errChangePass']
      }
    },
    errDisableAccount: {
      get() {
        return this.$store.getters['user/errDisableAccount']
      }
    },
    isLoading: {
      get() {
        return this.$store.getters['user/isLoading']
      }
    },
    isLoadingContact: {
      get() {
        return this.$store.getters['contact/isLoading']
      }
    },
    avatar: {
      get() {
        return this.$store.getters['user/avatar']
      }
    },
    drawer: {
      get() {
        return this.$store.getters['user/drawer']
      }
    },
    userInfo: {
      get() {
        return this.$store.getters['user/userInfo']
      }
    }
  },
  async created() {
    await this.$store.dispatch('user/getInfoUser')
    this.tab = this.$route.path.slice(1)
  },
  watch: {
    '$route'() {
      this.tab = this.$route.path.slice(1)
    },
    userInfo: function () {
      this.valuesInfo.name = this.userInfo.fullname
      this.valuesInfo.phoneNumber = this.userInfo.phoneNumber
      this.valuesInfo.email = this.userInfo.email
    }
  },
  methods: {
    beforeRouteEnter,
    navigate(link) {
      link !== this.tab && this.$router.push(link)
    },
    closeSnackbar() {
      this.$store.dispatch('user/setSnackbarState', false)
    },
    handleChangePass() {
      this.errors = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
      schema.validate(this.values, { abortEarly: false })
        .then(() => {
          this.$store.dispatch('user/changePassword', {
            currentPassword: this.values.currentPassword,
            newPassword: this.values.newPassword
          })
        })
        .catch((err) => {
          err.inner.forEach(error => {
            this.errors = { ...this.errors, [error.path]: error.message }
          })
        })
    },
    validate(field) {
      schema
        .validateAt(field, this.values)
        .then(() => {
          this.errors[field] = ''
        })
        .catch(err => {
          this.errors[err.path] = err.message
        })
    },
    handleChangeInfo() {
      schemaInfo.validate(this.valuesInfo, { abortEarly: false }).then(() => {
        this.$store.dispatch('user/changeInfo', {
          name: this.valuesInfo.name,
          phoneNumber: this.valuesInfo.phoneNumber,
          email: this.valuesInfo.email
        })
      })
        .catch((err) => {
          console.log(err)
        })
    },
    handleDisableAccount() {
      this.$store.dispatch('user/disableAccount', {
        currentPassword: this.currentPassDisable
      })
    },
    handleDeleteAccount() {
      this.$store.dispatch('user/deleteAccount')
    },
    onFileSelected(event) {
      const files = event.target.files
      if (files[0].type.split('/')[0] === 'image') {
        this.$store.dispatch('user/postImg', fileUploader(files[0])).then(
          (res) => {
            this.$store.dispatch('user/changeAvatar', {
              avatar: res.url
            })
          }
        )
      }
    },
    handleDeleteAvatar() {
      this.$store.dispatch('user/changeAvatar', {
        avatar: ''
      })
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
            this.$store.dispatch('user/changeAvatar', {
              avatar: res.url
            })
          }
        )
        return
      }
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.content {
  display: flex;
}

.main-area {
  overflow: auto;
  height: calc(100vh - 72px);
  background-color: rgb(249, 249, 249);
  width: calc(100vw - 256px);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.main-area h2,
h3 {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 400;
}

.paper {
  width: 696px;
  padding-top: 24px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 4px;
  border-radius: 4px;
}

.point-event {
  filter: blur(1px);
  pointer-events: none;
}

.tab {
  margin-top: 10px;
  padding: 0 24px;
  display: flex;
  border-bottom: 1px solid #f2f2f2;
}

.tab button {
  padding: 10px 16px;
  color: rgb(153, 153, 153);
  font-size: 14px;
  line-height: 28px;
  font-weight: 600;
}

.tab button:hover {
  color: rgb(44, 44, 44) !important;
  border-bottom: 2px solid rgb(224, 60, 49);
  padding-bottom: 8px !important;
}

.active {
  color: rgb(44, 44, 44) !important;
  border-bottom: 2px solid rgb(224, 60, 49);
  padding-bottom: 8px !important;
}

.form {
  padding: 20px;
}

.txt-label {
  margin-bottom: 8px;
  color: rgb(44, 44, 44);
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.col-btn {
  display: flex;
  align-items: center;
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

.btn-negative {
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  width: fit-content;
  letter-spacing: -0.2px;
  border: 1px solid rgb(204, 204, 204);
  padding: 6px 12px;
  transition: all .3s ease;
}

.btn-negative:hover {
  background-color: rgb(242, 242, 242);
}

.btn-outlined-submit {
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  width: fit-content;
  letter-spacing: -0.2px;
  border: 1px solid rgb(224, 60, 49);
  padding: 6px 12px;
  color: rgb(224, 60, 49);
  transition: all .3s ease;
}

.btn-outlined-submit:hover {
  background-color: rgb(255, 236, 235);
}

.txt-description {
  margin-top: 10px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: rgb(153, 153, 153);
}

.txt-message {
  color: red;
}

.loading {
  position: absolute;
  top: 50%;
  left: calc(50% + 115px);
  transform: translate(-50%, -50%)
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

.hide {
  width: 100vw;
}
</style>

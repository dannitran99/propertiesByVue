<template>
  <div class="content">
    <side-bar/>
    <div class="main-area">
      <div :class="[{'point-event' : isLoading},'paper']">
            <h2 class="px-5">Quản lý tài khoản</h2>
            <div class="tab">
                <button @click="navigate('tai-khoan')" :class="[{'active' : tab ==='tai-khoan'}]">Chỉnh sửa thông tin</button>
                <button @click="navigate('doi-mat-khau')" :class="[{'active' : tab ==='doi-mat-khau'}]">Cài đặt tài khoản</button>
            </div>
            <div v-if="tab==='tai-khoan'">
              <div class="form">
                <h3>Thông tin cá nhân</h3>
                <input accept="image/*,.heic" type="file" autocomplete="off" tabindex="-1" style="display: none;" ref="fileInput" @change="onFileSelected">
                <div class="img-upload-place mt-2" @click="selectFiles" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
                  <icon-camera/>
                  <p class="txt-upload-secondary mb-0">Tải ảnh</p>
                </div>
                <v-row class="mt-1 mb-5">
                  <v-col
                    cols="12"
                    sm="6"
                    class="pb-0"
                  >
                    <p class="txt-label">Họ và tên</p>
                    <v-text-field
                    dense
                    outlined
                    hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <h3 class="mt-5">Thông tin liên hệ</h3>
                <v-row class="mt-1 mb-3">
                  <v-col
                    cols="12"
                    sm="6"
                    class="pb-0"
                  >
                    <p class="txt-label">Số điện thoại</p>
                    <v-text-field
                    dense
                    outlined
                    hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <p class="txt-label">Email</p>
                <v-text-field
                dense
                outlined
                hide-details
                ></v-text-field>
              </div>
              <div class="paper sticky-wrapper">
                <button class="btn-submit">Lưu thay đổi</button>
              </div>
            </div>
            <div v-if="tab==='doi-mat-khau'">
              <form class="form" @submit.prevent="handleChangePass">
                  <h3>Đổi mật khẩu</h3>
                  <v-row class="mt-1">
                      <v-col
                          cols="12"
                          sm="6"
                          class="pb-0"
                      >
                          <p class="txt-label">Mật khẩu hiện tại</p>
                          <v-text-field
                          dense
                          outlined
                          type="password"
                          v-model="values.currentPassword"
                          :error-messages="errors.currentPassword"
                          @validate="validate('currentPassword')"
                          ></v-text-field>
                      </v-col>
                  </v-row>
                  <v-row >
                      <v-col
                          cols="12"
                          sm="6"
                          class="py-0"
                      >
                          <p class="txt-label">Mật khẩu mới</p>
                          <v-text-field
                          dense
                          outlined
                          type="password"
                          v-model="values.newPassword"
                          :error-messages="errors.newPassword"
                          @validate="validate('newPassword')"
                          ></v-text-field>
                      </v-col>
                  </v-row>
                  <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          class="py-0"
                      >
                          <p class="txt-label">Nhập lại mật khẩu mới</p>
                          <v-text-field
                          dense
                          outlined
                          type="password"
                          v-model="values.confirmPassword"
                          :error-messages="errors.confirmPassword"
                          @validate="validate('confirmPassword')"
                          ></v-text-field>
                      </v-col>
                      <v-col
                          class="col-btn"
                          cols="12"
                          sm="6"
                      >
                          <button type="submit" class="btn-submit">Lưu thay đổi</button>
                      </v-col>
                  </v-row>
                  <p class="txt-message">{{ errChangePass }}</p>
                  <p class="txt-description">Mật khẩu tối thiểu 8 ký tự</p>
              </form>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header >
                  <h3>Yêu cầu khóa tài khoản</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p class="txt-label">Nhập mật khẩu hiện tại</p>
                  <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          class="py-2"
                      >
                        <v-text-field
                          hide-details="true"
                          dense
                          outlined
                          type="password"
                          v-model="currentPassDisable"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          class="py-2"
                      >
                          <button class="btn-submit" @click="handleDisableAccount">Khóa tài khoản</button>
                      </v-col>
                  </v-row>
                  <p class="txt-message mt-3 mb-0">{{ errDisableAccount }}</p>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header >
                  <h3>Yêu cầu xóa tài khoản</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p class="txt-label">Gửi yêu cầu xoá toàn bộ thông tin của tài khoản. Sau khi được xử lý, toàn bộ thông tin sẽ được xoá và không thể hoàn tác</p>
                  <button class="btn-outlined-submit" @click="dialog = true">Yêu cầu xoá tài khoản</button>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      right
    >
      Đổi mật khẩu thành công
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="closeSnackbar"
        >
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Yêu cầu xoá tài khoản
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pb-0">
          <p class="mt-5">Khi bạn đồng ý xóa tài khoản, toàn bộ thông tin thuộc tài khoản của bạn sẽ bị xóa vĩnh viễn.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <button class="btn-negative" @click="dialog = false">Hủy bỏ</button>
          <button class="btn-submit ml-3" @click="handleDeleteAccount">Gửi yêu cầu</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
  </div>
</template>

<script>
import SideBar from '../../components/SideBar'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  currentPassword: Yup.string().required('Vui lòng nhập mật khẩu'),
  newPassword: Yup.string().min(8, 'Mật khẩu tối thiểu 8 ký tự').required('Vui lòng nhập mật khẩu'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Nhập lại mật khẩu không khớp')
})

export default {
  components: { SideBar,
    ValidationProvider,
    ValidationObserver},
  data () {
    return {
      tab: undefined,
      values: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
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
      get () {
        return this.$store.getters['user/snackbar']
      }
    },
    errChangePass: {
      get () {
        return this.$store.getters['user/errChangePass']
      }
    },
    errDisableAccount: {
      get () {
        return this.$store.getters['user/errDisableAccount']
      }
    },
    isLoading: {
      get () {
        return this.$store.getters['user/isLoading']
      }
    }
  },
  created () {
    this.tab = this.$route.path.slice(1)
  },
  watch: {
    '$route' () {
      this.tab = this.$route.path.slice(1)
    }
  },
  methods: {
    navigate (link) {
      link !== this.tab && this.$router.push(link)
    },
    closeSnackbar () {
      this.$store.dispatch('user/setSnackbarState', false)
    },
    handleChangePass () {
      this.errors = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
      schema.validate(this.values, { abortEarly: false })
        .then(() => {
          this.$store.dispatch('user/changePassword', {
            user: localStorage.getItem('username'),
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
    validate (field) {
      schema
        .validateAt(field, this.values)
        .then(() => {
          this.errors[field] = ''
        })
        .catch(err => {
          this.errors[err.path] = err.message
        })
    },
    handleDisableAccount () {
      this.$store.dispatch('user/disableAccount', {
        user: localStorage.getItem('username'),
        currentPassword: this.currentPassDisable
      })
    },
    handleDeleteAccount () {
      this.$store.dispatch('user/deleteAccount', {
        user: localStorage.getItem('username')
      })
    },
    onFileSelected (event) {
      const files = event.target.files
      // eslint-disable-next-line no-useless-return
      // if (files.length === 0) return
      // for (const element of files) {
      //   if (element.type.split('/')[0] !== 'image') continue
      //   if (!this.images.some(e => e.name === element.name)) {
      //     const post = new FormData()
      //     post.append('file', element)
      //     post.append('upload_preset', 'nucez74c')
      //     post.append('cloud_name', 'dadyvbcci')
      //     this.$store.dispatch('properties/postImg', post).then(
      //       (res) => {
      //         this.images.push({name: element.name, url: res.url, description: ''})
      //       }
      //     )
      //   }
      // }
    },
    selectFiles () {
      this.$refs.fileInput.click()
    },
    onDragOver (event) {
      event.preventDefault()
      this.isDragging = true
      event.dataTransfer.dropEffect = 'copy'
    },
    onDragLeave (event) {
      event.preventDefault()
      this.isDragging = false
    },
    onDrop (event) {
      event.preventDefault()
      this.isDragging = false
      const files = event.dataTransfer.files
      // for (const element of files) {
      //   if (element.type.split('/')[0] !== 'image') continue
      //   if (!this.images.some(e => e.name === element.name)) {
      //     const post = new FormData()
      //     post.append('file', element)
      //     post.append('upload_preset', 'nucez74c')
      //     post.append('cloud_name', 'dadyvbcci')
      //     this.$store.dispatch('properties/postImg', post).then(
      //       (res) => {
      //         this.images.push({name: element.name, url: res.url, description: ''})
      //       }
      //     )
      //   }
      // }
    }
  }
}
</script>

<style scoped>
.content{
  display: flex;
}
.main-area{
  overflow: auto;
  height: calc(100vh - 72px) ;
  background-color: rgb(249, 249, 249);
  width: 100%;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.paper{
  width: 696px;
  padding-top: 24px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 4px;
  border-radius: 4px;
}
.point-event{
  filter: blur(1px);
  pointer-events: none;
}
.tab{
    margin-top: 10px;
    padding: 0 24px;
    display: flex;
    border-bottom: 1px solid #f2f2f2;
}
.tab button{
    padding: 10px 16px ;
    color: rgb(153, 153, 153);
    font-size: 14px;
    line-height: 28px;
    font-weight: 600;
}
.tab button:hover{
    color: rgb(44, 44, 44) !important;
    border-bottom: 2px solid rgb(224, 60, 49);
    padding-bottom: 8px !important;
}
.active{
    color: rgb(44, 44, 44) !important;
    border-bottom: 2px solid rgb(224, 60, 49);
    padding-bottom: 8px !important;
}
.form{
    padding: 20px;
}
  .txt-label{
    margin-bottom: 8px;
    color: rgb(44, 44, 44);
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
  }
.col-btn{
    display: flex;
    align-items: center;
}
.btn-submit{
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
.btn-negative{
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
.btn-outlined-submit{
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
.txt-description{
    margin-top: 10px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: rgb(153, 153, 153);
  }
.txt-message{
  color: red;
}
.loading{
  position: absolute;
  top: 50%;
  left: calc(50% + 115px);
  transform: translate(-50%,-50%)
}
.img-upload-place{
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
.sticky-wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  padding: 8px 24px;
  position: sticky;
  bottom: 0px;
  z-index: 10;
}
</style>

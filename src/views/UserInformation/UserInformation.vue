<template>
  <div class="content">
    <side-bar/>
    <div class="main-area">
        <div class="paper">
            <h2 class="px-5">Quản lý tài khoản</h2>
            <div class="tab">
                <button @click="navigate('tai-khoan')" :class="[{'active' : tab ==='tai-khoan'}]">Chỉnh sửa thông tin</button>
                <button @click="navigate('doi-mat-khau')" :class="[{'active' : tab ==='doi-mat-khau'}]">Cài đặt tài khoản</button>
            </div>
            <form class="form" v-if="tab==='doi-mat-khau'" @submit.prevent="handleChangePass">
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
      }
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
          // .then(() => {
          //   this.$store.dispatch('user/changePassword', true)
          // })
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
    }

  }
}
</script>

<style scoped>
.content{
  display: flex;
}
.main-area{
  position: relative;
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
  padding: 24px 0;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 4px;
  border-radius: 4px;
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
  left: 50%;
}
</style>

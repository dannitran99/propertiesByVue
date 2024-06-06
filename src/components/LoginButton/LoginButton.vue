<template>
  <v-dialog v-model="dialog" width="500" @click:outside="closeDialog">
    <template v-slot:activator="{ on, attrs }">
      <button class="btn-login" v-bind="attrs" v-on="on">
        Đăng nhập
      </button>
    </template>

    <v-card v-if="loginDialog" :class="['card-wrapper', { 'card-loading': isLoading }]">
      <v-card-title class="text-h5 grey lighten-2">
        Đăng nhập để tiếp tục
      </v-card-title>

      <v-card-text>
        <form @submit.prevent="handleSubmit">
          <v-text-field label="Tên đăng nhập" id="username" v-model="username"></v-text-field>
          <v-text-field label="Mật khẩu" type="password" id="password" v-model="password"></v-text-field>
          <p class="txt-message-login">{{ errLogin }}</p>
          <button type="submit" class="btn-submit">Đăng nhập</button>
        </form>
        <p class="alt-text">Chưa là thành viên? <span @click="changeDialog">Đăng ký</span> tại đây</p>
      </v-card-text>
      <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
    </v-card>
    <v-card v-else :class="['card-wrapper', { 'card-loading': isLoading }]">
      <v-card-title class="text-h5 grey lighten-2">
        Đăng ký tài khoản mới
      </v-card-title>

      <v-card-text>
        <form @submit.prevent="submitForm">
          <v-text-field label="Tên đăng nhập" id="newUsername" v-model="newUsername"></v-text-field>
          <v-text-field label="Mật khẩu" type="password" id="newPassword" v-model="newPassword"></v-text-field>
          <v-text-field label="Nhập lại mật khẩu" type="password" id="confirmPassword"
            v-model="confirmPassword"></v-text-field>
          <v-text-field label="Email" type="email" id="email" v-model="email"></v-text-field>
          <p class="txt-message-login">{{ errRegister }}</p>
          <button type="submit" class="btn-submit">Đăng ký</button>
        </form>
        <p class="alt-text">Bạn đã có tài khoản? <span @click="changeDialog">Đăng nhập</span> tại đây</p>
      </v-card-text>
      <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import * as Yup from 'yup'
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      loginDialog: true,
      dialog: false,
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      confirmPassword: '',
      email: ''
    }
  },
  computed: {
    errLogin: {
      get() {
        return this.$store.getters['user/errLogin']
      }
    },
    errRegister: {
      get() {
        return this.$store.getters['user/errRegister']
      }
    },
    isLoading: {
      get() {
        return this.$store.getters['user/isLoading']
      }
    }
  },
  methods: {
    closeDialog() {
      this.username = ''
      this.password = ''
      this.newUsername = ''
      this.newPassword = ''
      this.confirmPassword = ''
      this.email = ''
      this.$store.dispatch('user/setErrMessageRegister', { message: '' })
      this.$store.dispatch('user/setErrMessage', { message: '' })
    },
    handleSubmit() {
      this.$store.dispatch('user/setErrMessage', { message: '' })
      const schema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().min(8).required()
      })

      schema.validate({ username: this.username, password: this.password })
        .then(() => {
          // Handle successful form submission
          this.$store.dispatch('user/postLoginInfo', {
            username: this.username,
            password: this.password
          })
            .then(() => {
              if (this.errLogin === '') location.reload()
            })
        })
        .catch(() => {
          this.$store.dispatch('user/setErrMessage', { message: 'Sai thông tin đăng nhập' })
        })
    },
    changeDialog() {
      this.loginDialog = !this.loginDialog
    },
    submitForm() {
      const schema = Yup.object().shape({
        username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
        password: Yup.string().min(8, 'Mật khẩu tối thiểu 8 ký tự').required('Vui lòng nhập mật khẩu'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu không khớp'),
        email: Yup.string().email().required('Vui lòng nhập email')
      })
      schema.validate({ username: this.newUsername, password: this.newPassword, confirmPassword: this.confirmPassword, email: this.email })
        .then(() => {
          // Handle successful form submission
          this.$store.dispatch('user/postRegister', {
            username: this.newUsername,
            password: this.newPassword,
            email: this.email
          })
            .then(() => {
              if (this.errRegister === '') {
                this.loginDialog = true
              }
            })
        })
        .catch((error) => {
          this.$store.dispatch('user/setErrMessageRegister', { message: error.toString().split(':')[1] })
        })
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.btn-login {
  border: none;
  background-color: white;
  cursor: pointer;
}

.btn-submit {
  width: 100%;
  background-color: red;
  color: white;
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
}

.txt-message-login {
  margin-bottom: 10px;
  color: red;
  text-align: right;
}

.alt-text {
  margin-top: 10px;
  text-align: center;
}

.alt-text span {
  font-weight: 700;
  color: red;
}

.alt-text :hover {
  cursor: pointer;
  text-decoration: underline;
}

.card-wrapper {
  position: relative;
}

.card-loading {
  filter: brightness(.5);
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

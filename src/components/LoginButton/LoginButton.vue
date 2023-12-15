<template>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <button class="btn-login"
          v-bind="attrs"
          v-on="on"
        >
          Đăng nhập
        </button>
      </template>

      <v-card v-if="loginDialog">
        <v-card-title class="text-h5 grey lighten-2">
          Đăng nhập để tiếp tục
        </v-card-title>

        <v-card-text>
          <form @submit.prevent="handleSubmit">
            <v-text-field
              label="Tên đăng nhập"
              id="username"
              v-model="username"
            ></v-text-field>
            <v-text-field
              label="Mật khẩu"
              type="password" id="password" v-model="password"
            ></v-text-field>
            <button type="submit" class="btn-submit">Đăng nhập</button>
            <p class="txt-message-login">{{ err }}</p>
          </form>
          <p class="alt-text">Chưa là thành viên? <span @click="changeDialog">Đăng ký</span> tại đây</p>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-title class="text-h5 grey lighten-2">
          Đăng ký tài khoản mới
        </v-card-title>

        <v-card-text>
          <p class="alt-text">Bạn đã có tài khoản? <span @click="changeDialog">Đăng nhập</span> tại đây</p>
        </v-card-text>
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
  data () {
    return {
      loginDialog: true,
      dialog: false,
      username: '',
      password: ''
    }
  },
  computed: {
    err: {
      get () {
        return this.$store.getters['user/err']
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch('user/setErrMessage', {message: ''})
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
              if (this.err === '') location.reload()
            })
        })
        .catch(() => {
          this.$store.dispatch('user/setErrMessage', {message: 'Sai thông tin đăng nhập'})
        })
    },
    changeDialog () {
      this.loginDialog = !this.loginDialog
    }
  }
}
</script>

<style scoped>
  .btn-login{
    border: none;
    background-color: white;
    cursor: pointer;
  }
  .btn-submit{
    width: 100%;
    background-color: red;
    color: white;
    padding: 1em;
    border-radius: 10px;
    cursor: pointer;
  }
  .txt-message-login{
    margin-top: 10px;
    color: red;
    text-align: right;
  }
  .alt-text{
    margin-top: 10px;
    text-align: center;
  }
  .alt-text span{
    font-weight: 700;
    color: red;
  }
  .alt-text :hover{
    cursor: pointer;
    text-decoration: underline;
  }
</style>

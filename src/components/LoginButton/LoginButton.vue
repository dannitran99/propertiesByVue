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

      <v-card>
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
            <button type="submit">Submit</button>
          </form>
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
      dialog: false,
      username: '',
      password: ''
    }
  },
  methods: {
    handleSubmit () {
      const schema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().min(8).required()
      })

      schema.validate({ username: this.username, password: this.password })
        .then(() => {
          // Handle successful form submission
        })
        .catch()
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
</style>

<template>
  <div>
    <div class="fullscreen column text-black">
      <div class="row item-centers text-center flex flex-center">
        <img src="../../assets/sigkit-xs.png">
      </div>
      <div class="col item-centers text-center q-pa-md flex flex-center">
        <div>
          <form class="q-col-gutter-y-md">
            <q-input
              ref="email"
              v-model.trim="form.email"
              outlined
              standout
              label="Email"
              :error="$v.form.email.$error"
              error-message="Need a valid email"
            />

            <q-input
              ref="password"
              v-model="form.password"
              outlined
              standout
              label="Password"
              color="text-white"
              :type="type"
              :error="$v.form.password.$error"
              error-message="Password is required"
              bottom-slots
              @keyup.enter="login"
            >
              <template v-slot:append>
                <q-btn
                  round
                  flat
                  icon="remove_red_eye"
                  @click="onClickShowPassword"
                />
              </template>
            </q-input>

            <div class="q-gutter-sm">
              <q-btn
                color="primary"
                text-color="white"
                label="Sign In"
                no-caps
                @click="login"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { minLength, required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },

      type: 'password',
    }
  },

  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(4) }
    }
  },

  methods: {
    login() {
      this.$v.form.$touch()

      this.$store.dispatch('Login', this.form)
        .then(res => {
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err)
        })
    },

    onClickShowPassword() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  }
}
</script>

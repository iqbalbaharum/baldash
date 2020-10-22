<template>
  <div>
    <div class="fullscreen row">
      <div class="col" style="height: 100vh">
        <div class="column items-center justify-center q-gutter-y-md" style="height: 100vh">
          <div class="text-h1">Hello, Friend</div>
          <div class="text-body q-mt-sm">Enter your personal information and start your journey</div>
          <q-btn
            color="primary"
            text-color="white"
            label="Register"
            to="/register"
            size="md"
            padding="sm xl"
            rounded
          />
        </div>
      </div>
      <div class="col bg-gradient">
        <div class="row items-center justify-center" style="height: 100vh">
          <form class="column q-pa-md items-center q-gutter-y-sm" style="width: 400px;">
            <div class="text-h4 q-mb-md">Welcome</div>

            <q-input
              filled
              standout
              label="Email"
              color="text-white"
              v-model.trim="form.email"
              ref="email"
              :error="$v.form.email.$error"
              error-message="Need a valid email"
              class="full-width"
            />

            <q-input
              filled
              standout
              label="Password"
              color="text-white"
              v-model="form.password"
              :type="type"
              ref="password"
              @keyup.enter="login"
              :error="$v.form.password.$error"
              error-message="Password is required"
              bottom-slots
              class="full-width"
            >

              <template v-slot:append>
                <q-btn round flat icon="remove_red_eye" @click="onClickShowPassword" />
              </template>

            </q-input>

            <q-btn
              color="primary"
              text-color="white"
              label="Sign In"
              class="full-width"
              @click="login"
              padding="md"
              rounded
            />

            <div class="q-mt-sm">
              <q-btn
                color="white"
                text-color="white"
                flat
                to="/forget"
                label="I forgot my password"
                no-caps />
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
      if(this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  }
}
</script>

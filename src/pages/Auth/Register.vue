<template>
  <div>
    <div class="fullscreen row">
      <div class="col">
        <div class="row items-center justify-center" style="height: 100vh">
          <form class="column q-pa-md items-center q-gutter-y-sm" style="width: 400px;">
            <div class="text-h4 q-mb-md">Welcome</div>

            <q-input
              filled
              v-model.trim="form.name"
              label="Username"
              ref="username"
              error-message="Username can't be empty"
              :error="$v.form.name.$error"
              class="full-width"
            />

            <q-input
              filled
              v-model.trim="form.email"
              label="Email Address"
              ref="email"
              :error="$v.form.email.$error"
              error-message="Enter a valid email"
              class="full-width"
            />

            <q-input
              filled
              v-model.trim="form.mobile"
              label="Mobile"
              ref="mobile"
              :error="$v.form.mobile.$error"
              error-message="Enter a valid mobile"
              class="full-width"
            />

            <q-input
              filled
              v-model="form.password"
              :type="type"
              ref="password"
              label="Create Your Own Password"
              :error="$v.form.password.$error"
              error-message="Password can't be empty"
              class="full-width"
            >
              <template v-slot:append>
                <q-btn round flat icon="remove_red_eye" @click="onClickShowPassword" />
              </template>
            </q-input>

            <q-btn
                color="primary"
                text-color="white"
                label="Register"
                padding="md"
                class="full-width"
                @click="register"
                rounded
              />

          </form>
        </div>
      </div>
      <div class="col bg-gradient" style="height: 100vh">
        <div class="column items-center justify-center q-gutter-y-md" style="height: 100vh">
          <div class="text-h1">Hello, Friend</div>
          <div class="text-body q-mt-sm">Enter your personal information and start your journey</div>
          <q-btn
            color="primary"
            text-color="white"
            label="Login"
            to="/login"
            size="md"
            padding="sm xl"
            rounded
          />
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import { minLength, required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      type: 'password',
      form : {
        name: '',
        password: '',
        email: '',
        mobile: '',
      }
    }
  },

  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required },
      mobile: { required }
    }
  },

  methods: {
    register() {
      this.$v.form.$touch()

      this.$store.dispatch('RegisterUser', this.form)
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

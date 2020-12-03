<template>
  <modal-dialog
    ref="dialog"
    name="assignScope"
    @close-dialog="reset"
  >
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Assign scope access to modules
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="text-weight-bold text-uppercase text-grey-5">
              Roles
            </div>
            <q-separator class="q-my-md" />
            <q-form ref="myForm" @submit="onAddUser">
              <div class="q-gutter-sm justify">
                <div class="col">
                  <q-select
                    v-model="form.role"
                    outlined
                    :options="options.roles"
                    stack-label
                    label="Roles"
                    :error="$v.form.role.$error"
                  />
                </div>
                <div class="text-negative">
                  {{ errormessage }}
                </div>
                <div class="text-negative">
                  {{ errormessage2 }}
                </div>
                <q-separator class="q-my-md" />
                <div align="right">
                  <q-btn
                    v-close-popup
                    flat
                    color="primary"
                    label="Cancel"
                  />
                  <q-btn
                    color="primary"
                    label="Submit"
                    :disabled="errormessage.length > 0 || errormessage2.length > 0"
                    @click="onAddUser"
                  />
                </div>
              </div>
            </q-form>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import { minLength, required, email } from 'vuelidate/lib/validators'
import User from './../../models/User'
import Role from '../../models/Role'
import ModalDialog from './../ModalDialog'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      textRules: [val => val && val.length > 0],
      options: {
        roles: [],
      },
      selectedUserId: '',
      form: {
        username: '',
        password: '',
        name: '',
        sccode: '',
        mobile: '',
        email: '',
        status: true,
        module_access: '',
        designCAD_access: '',
        branchId: '',
        role: '',
      },
      errormessage: '',
      errormessage2: '',
      type: 'password',
    }
  },

  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(4) },
      mobile: { required, minLength: minLength(10) },
      username: { required },
      name: { required },
      sccode: { required },
      branchId: { required },
      role: { required }
    }
  },

  computed: {
    users() {
      return User.query().withAll().get()
    },
    roles() {
      return Role.all()
    },

  },

  async created() {
    this.loadRoleOptions()
  },

  methods: {
    reset() {
      this.errormessage = ''
      this.errormessage2 = ''
      this.form = {
        status: true,
        module_access: '',
        designCAD_access: '',
        branchId: '',
        role: '',
      }
    },

    async onAddUser() {
      const user = { ...this.form }
      user.role = user.role.value

      this.$refs.myForm.validate().then(async success => {
        if (success) {
          await this.$store.dispatch('RegisterUser', user)
          this.$refs.dialog.$children[0].hide()
          this.$notify('success', `User with name ${user.name} created!`)
        } else {
          this.$notify('error', 'All field is required')
        }
      })
    },
    async loadRoleOptions() {
      const loadRoles = await this.$store.dispatch('GetAllRoles')
      loadRoles.forEach(role => {
        this.options.roles.push({
          value: role.uuid,
          label: role.name.charAt(0).toUpperCase() + role.name.slice(1)
        })
      })
    },
  }
}
</script>

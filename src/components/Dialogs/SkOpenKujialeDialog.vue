<template>
  <modal-dialog
    name="opendesigncad"
    style="height:500px"
  >
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Open Design App
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="">
              Opening Design CAD at external tab. Click button below to proceed
            </div>
            <q-separator />
            <div align="right">
              <q-btn
                v-close-popup
                flat
                color="primary"
                label="Cancel"
              />
              <q-btn
                label="Open Design CAD"
                color="primary"
                @click="onClickOpenDesign"
              />
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import ModalDialog from './../ModalDialog'

export default {
  components: {
    ModalDialog
  },

  data() {
    return {

    }
  },

  methods: {
    async onClickOpenDesign() {
      const token = await this.$store.dispatch('GetSSOToken')
      console.log(token)
      if (token.c === '0' && token.d) {
        window.open(`https://www.kujiale.com/v/auth?accesstoken=${token.d}&dest=0`, '_blank')
      }
    }
  }
}
</script>

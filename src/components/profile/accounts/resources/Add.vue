<template>
  <b-modal
    ref="add"
    centered
    hide-footer
    content-class="shadow"
    class="p-0"
  >
    <template #modal-title>
      Registra una cuenta
    </template>
    <b-container>
      <b-row>
        <form>
          <div class="row g-3 mb-2 align-items-center">
            <div class="col-12">
              <select class="form-select">
                <option v-for="(account, index) of accounts" :key="index">
                  {{ account.name }}
                </option>
              </select>
            </div>
          </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
export default {
  data () {
    return {
      accounts: [
        { name: 'Selecciona una cuenta' },
        { name: 'Paypal' },
        { name: 'Zelle' },
        { name: 'BTC' },
        { name: 'Pago Movil' },
      ]
    }
  },
  methods: {
    displayModal () {
      this.$refs['add'].toggle()
    }
  }
}
</script>
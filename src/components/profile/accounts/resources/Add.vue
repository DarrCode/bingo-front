<template>
  <b-modal
    ref="add"
    centered
    hide-footer
    content-class="shadow"
    class="p-0"
    size="lg"
  >
    <template #modal-title>
      Registra una cuenta
    </template>
    <b-container>
      <b-row>
        <form @submit.prevent="addAccount">
          <div class="row g-3 mb-3 align-items-center">
            <div class="col-12 col-sm-6 ">
              <label>Nombre de la cuenta.</label>
              <input 
                v-model="account.name"
                type="text" 
                class="form-control" 
                placeholder="Nombre de la cuenta"
                maxlength="15"
                required
              >
            </div>
            <div class="col-12 col-sm-6">
              <label>Tipo de cuenta.</label>
              <select class="form-control" @change="getTypeAccount" ref="select">
                <option v-for="(account, index) of type_accounts" :key="index" >
                  {{ account.name }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="formPaypal">
            <div class="row">
              <div class="col-12">
                <label>Correo electronico.</label>
                <input 
                  v-model="account.detail.email"
                  type="email" 
                  class="form-control" 
                  placeholder="Correo Electronico"
                  required
                >
              </div>
            </div>
          </div>
          <div v-if="formZelle">
            <div class="row">
              <div class="col-12 col-sm-6">
                <label>Correo electronico.</label>
                <input 
                  v-model="account.detail.email"
                  type="email" 
                  class="form-control"
                  placeholder="Correo Electronico"
                  required
                >
              </div>
              <div class="col-12 col-sm-6">
                <label>Direccion.</label>
                <input 
                  v-model="account.detail.direction" 
                  type="text" 
                  class="form-control" 
                  placeholder="Direccion"
                  required
                >
              </div>
            </div>
          </div>
          <div v-if="formBTC">
            <div class="row">
              <div class="col-12 mb-3">
                <label>Direccion de la Wallet.</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="account.detail.wallet" 
                  placeholder="Direccion de la Wallet"
                  required
                >
              </div>
            </div>
          </div>
          <div v-if="formPM">
            <div class="row mb-3">
              <div class="col-12 col-sm-6">
                <label>Codigo banco.</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="account.detail.code_bank" 
                  placeholder="0102"
                  required
                >
              </div>
              <div class="col-12 col-sm-6">
                <label>Cedula.</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="account.detail.cedula" 
                  placeholder="Cedula de identidad"
                  required
                >
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <label>Numero de telefono.</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="account.detail.phone" 
                  placeholder="Numero de telefono"
                  required
                >
              </div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary mt-3">Registrar cuenta</button>
          </div>
        </form>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import MainService from '@/services/MainService'

export default {
  data () {
    return {
      type_accounts: [
        { name: 'Selecciona una cuenta' },
        { name: 'Paypal' },
        { name: 'Zelle' },
        { name: 'BTC' },
        { name: 'Pago Movil' },
      ],
      account: {
        name: '',
        detail: {}
      },
      formPaypal: false,
      formZelle: false,
      formBTC: false,
      formPM: false,
    }
  },
  methods: {
    getTypeAccount(e){
      let value = e.target.value

      const p = 'Paypal'
      const z  = 'Zelle'
      const b  = 'BTC'
      const pm = 'Pago Movil'

      if (value == p) {
        this.formPaypal = true

        this.formZelle = false, this.formBTC= false, this.formPM = false
      } else if (value == z) {
        this.formZelle = true

        this.formPaypal = false, this.formBTC = false, this.formPM = false

      } else if (value == b) {
        this.formBTC = true

        this.formPaypal = false, this.formZelle = false, this.formPM = false
      } else if (value == pm) {
        this.formPM = true

        this.formPaypal = false, this.formZelle = false, this.formBTC = false
      }
    },
    displayModal () {
      this.$refs['add'].toggle()
    },
    addAccount (e) {

      const data = {
        route: '/user/profile/accounts',
        params: {
          name: this.account.name,
          description: 'add account',
          type_account: e.target[1].value,
          detail: this.account.detail
        }
      }

      this.$swal({
          title: 'Valida tus datos',
          html:
            ` 
              <b class="float-start">Nombre de la cuenta:</b> <span class="float-end"> ${this.account.name}</span> <br/>
              <b class="float-start">Tipo de cuenta:</b> <span class="float-end"> ${e.target[1].value}</span> <br/>
              <b class="float-start">Detalles:</b> <span class="float-end"> 
                ${this.account.detail.email ? this.account.detail.email : ''}
                ${this.account.detail.email ? '<br/>' : ''}
                
                ${this.account.detail.direction ? this.account.detail.direction : ''}
                ${this.account.detail.direction ? '<br/>' : ''}

                ${this.account.detail.wallet ? this.account.detail.wallet : ''}
                ${this.account.detail.wallet ? '<br/>' : ''}

                ${this.account.detail.code_bank ? this.account.detail.code_bank : ''}
                ${this.account.detail.code_bank ? '<br/>' : ''}
                
                ${this.account.detail.cedula ? this.account.detail.cedula : ''}
                ${this.account.detail.cedula ? '<br/>' : ''}

                ${this.account.detail.phone ? this.account.detail.phone : ''}
                ${this.account.detail.phone ? '<br/>' : ''}
              </span> 
            `,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: "#c62f3a",
          confirmButtonText: 'Agregar',
          cancelButtonText: 'Cancelar',
          showCloseButton: false,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            MainService.post(data)
            .then((response) => {
              const res = response.data
              if (res.statusCode == 0) {
                this.$swal('OK', 'registrado','success')
                this.displayModal()
                this.$emit("addAccount", true)
                this.account.name = ''
                this.account.detail= {}
                this.formPaypal = false, this.formZelle = false, this.formBTC= false, this.formPM = false
                
              }
            })
            .catch((err) => {
              console.log('error', err)
            })
           
          } else {
            this.account.detail = {}
          }
        })
    }
  }
}
</script>
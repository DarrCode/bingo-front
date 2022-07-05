<template>
  <b-modal
    ref="editAccountAdmin"
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
        <form @submit.prevent="editAccount">
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
              <input 
                v-model="account.type_account"
                type="text" 
                disabled
                class="form-control" 
                required
              >
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
                <label>Codigo de banco.</label>
                <input 
                  type="number" 
                  class="form-control" 
                  v-model="account.detail.code_bank" 
                  placeholder="Ej: 0102"
                  onKeyPress="if(this.value.length==4) return false" 
                  required
                >
              </div>
              <div class="col-12 col-sm-6">
                <label>Cedula.</label>
                <input 
                  type="number" 
                  class="form-control" 
                  v-model="account.detail.cedula" 
                  placeholder="Cedula de identidad"
                  onKeyPress="if(this.value.length==8) return false" 
                  required
                >
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <label>Número de telefono.</label>
                <input 
                  type="number" 
                  class="form-control" 
                  v-model="account.detail.phone" 
                  placeholder="Número de telefono"
                  onKeyPress="if(this.value.length==11) return false" 
                  required
                >
              </div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-bingo-red text-white mt-3">Registrar cuenta</button>
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
    displayModal (account) {
      this.$refs['editAccountAdmin'].toggle()
      if (account) {
        this.account = account

        this.formPaypal = account.type_account === 'Paypal' ? true : false
        this.formZelle = account.type_account === 'Zelle' ? true : false 
        this.formBTC = account.type_account === 'BTC' ? true : false 
        this.formPM = account.type_account === 'Pago Movil' ? true : false 

        this.account.detail = JSON.parse(account.attributes)
      }
      
    },
    editAccount () {
      const id = this.account.id
      const data = {
        route: `/admin/account/${id}`,
        params: {
          name: this.account.name,
          type_account: this.account.type_account,
          description: 'edit account',
          detail: this.account.detail
        }
      }

      this.$swal({
          title: 'Verifica tu operacion',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: "#c62f3a",
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
          showCloseButton: false,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            MainService.put(data)
            .then((response) => {
              const res = response.data
              if (res.statusCode == 0) {
                this.$swal('OK', 'Editado','success')
                this.displayModal()
                this.$emit("editAccount", true)
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
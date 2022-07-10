<template>
  <div>
  <b-modal
      ref="user-vip"
      centered
      hide-footer
      content-class="shadow"
      size="lg"
      class="p-0"
    >
      <template #modal-title>
        Conviertete en usuario <span class="text-vip">VIP</span>
      </template>
      <b-container>
        <b-row>
          <div class="alert alert-warning" v-html="message"></div>
          <h4 class="text-center">Beneficios <span class="text-vip">VIP</span></h4>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Beneficio 1</li>
            <li class="list-group-item">Beneficio 2</li>
            <li class="list-group-item">Beneficio 3</li>
            <li class="list-group-item">Beneficio 4</li>
            <li class="list-group-item">Beneficio 5</li>
          </ul>
          <center>
            <button
              :disabled="disableBtn"
              class="btn btn-bingo mt-2 w-50"
              @click="userVip"
            >
              USUARIO VIP
            </button>
          </center>
        </b-row>
      </b-container>
    </b-modal>
    <!--b-modal
      ref="showDataAccount"
      centered
      hide-footer
      content-class="shadow"
      class="p-0"
      size="md"
    >
        <template #modal-title>
          Datos de la cuenta a transferir - <span class="text-red">{{account.type_account}}</span>
        </template>
        <b-container>
          <ul>
            <li>
              <b>Monto:</b> 100
            </li>
          </ul>
          <ul v-for="(attribute, index) of attributes" :key="index">
            <li :class="!attribute.email ? 'list-style' : ''">
              <span v-if="attribute.email">
                <b>Correo:</b> {{attribute.email}}
              </span>
            </li>
            <li :class="!attribute.direction ? 'list-style' : ''">
              <span v-if="attribute.direction">
                <b>Direccion:</b> {{attribute.direction}}
              </span>
            </li>
            <li :class="!attribute.wallet ? 'list-style' : ''">
              <span v-if="attribute.wallet">
                <b>Wallet:</b> {{attribute.wallet}}
              </span>
            </li>
            <li :class="!attribute.code_bank ? 'list-style' : ''">
              <span v-if="attribute.code_bank">
                <b>Banco:</b> {{attribute.code_bank}}
              </span>
            </li>
            <li :class="!attribute.cedula ? 'list-style' : ''">
              <span v-if="attribute.cedula">
                <b>cedula:</b> {{attribute.cedula}}
              </span>
            </li>
            <li :class="!attribute.phone ? 'list-style' : ''">
              <span v-if="attribute.phone">
                <b>phone:</b> {{attribute.phone}}
              </span>
            </li>
          </ul>
        </b-container>
    </!--b-modal-->
  </div>
</template>

<script>
import MainService from '@/services/MainService'
import axios from 'axios'

export default {
  data () {
    return {
      // accountSelected: null,
      // accountsAdmin: null,
      // account: {},
      // attributes: [],
      // form: {
      //   amount: '',
      //   reason: '',
      //   description: '',
      //   image: '',
      //   error: null
      // },
      // message: false,
      // imagePreview: '',
      balanceWallet: null,
      message: '',
      valueUserVip: null,
      disableBtn: false
    }
  },

  methods: {
    userVipInfo () {
      this.$refs['user-vip'].toggle()
      this.balanceWallet = this.$store.state.user.wallet.balance
      this.valueUserVip = 50

      if (this.balanceWallet < this.valueUserVip) {
        this.disableBtn = true
      }

      this.message = 'Para convertirte en usuario <b>VIP</b> tu balance debe ser de <b>50 Royalty</b>'
    },
    userVip () {
      const data = {
        route: 'user/profile/user-vip',
      }
      
      MainService.put(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.$swal({
              icon: 'success',
              title: 'Usuario VIP', 
              html: "Felicidades ya eres miembro  <span class='text-vip'>VIP</span> de <b class='text-danger'>BINGO ROYALTY</b>"
            })
            this.$refs['user-vip'].toggle()
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
    // onChange(e) {
    //   this.form.image = e.target.files[0]
    //   let reader = new FileReader()
    //   reader.readAsDataURL(this.form.image)
    //   reader.onload = e => {
    //     this.imagePreview = e.target.result
    //   }
    // },
    // getAccountActive () {
    //   this.$refs['request-user-vip'].toggle()
      
    //   const data = {
    //     route: 'user/accounts/admin',
    //   }
      
    //   MainService.get(data)
    //     .then((response) => {
    //       const res = response.data
    //       if (res.statusCode == 0) {
    //         this.accountsAdmin = res.accounts
    //         console.log(this.accountsAdmin);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log('error', err)
    //     })
    // },
    // selectAccount (data) {
    //   this.$refs['showDataAccount'].toggle()
    //   this.account = data
    //   this.account.attributes = JSON.parse(data.attributes)
    //   this.attributes = [this.account.attributes]
    // },
    // sendRequestUserVip () {
    
    //   const axiosRequest = axios.create({
    //     baseURL: `${process.env.VUE_APP_API_URL}/`,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'X-Requested-With': 'XMLHttpRequest'
    //     },
    //   })

    //   axiosRequest.defaults.headers.common.Authorization = `${this.$session.get('token_type')} ${this.$session.get('access_token')}`

    //   this.form.description = `ID del usuario: ${this.$store.state.user.id}, Monto: ${this.form.amount}`

    //   this.amount = 100

    //   let data = new FormData()
    //   data.append("reason", this.form.reason)
    //   data.append("description", this.form.description)
    //   data.append("amount", this.form.amount)
    //   data.append("image", this.form.image)
      
    //   axiosRequest.post('user/request', data)
    //     .then((res) => {
           
    //       if (res.data.statusCode == 0) {
    //         if (!this.message) {
    //           this.$swal({
    //             icon: 'success',
    //             title: 'Solicitud enviada con exito!',
    //             text: 'Le llegara una notificacion al momento de ser aporbada',
    //           })
    //           this.form = {}
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       console.log('err', err)
    //     })
    // },
  }
}
</script>
<style>
.list-style {
  list-style: none;
}
</style>

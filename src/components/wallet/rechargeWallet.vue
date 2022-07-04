<template>
  <div>
    <b-card class="card-bingo">
      <h3 class="card-title text-center">Recargar saldo</h3>
      <div class="text-center">
        <small class="text-center">Envia una solicitud para que recarguen tu saldo y juega ya!</small>
      </div>
      <div class="alert alert-danger"  v-if="form.error">
        <ul v-for="(err, index) of form.error" :key="index">
          <li>
            <small> {{ err }}</small>
          </li>
        </ul>
      </div>     
      <b-form @submit.prevent="sendRequestRecharge">

        <label class="my-2">Selecciona una cuenta.</label>		
        <select class="form-control mb-3" @change="selectAccount(accountSelected)" v-model="accountSelected">
          <option value="">Seleccione una cuenta</option>
          <option
            v-for="(account, index) of accountsAdmin" 
            :key="index"
            :value="account"
          >          
            {{ account.type_account }}
          </option>
        </select>
        <b-row>
          <b-col cols="12" md="6">
            <label class="mb-1">Concepto.</label>		
            <b-form-input
              v-model="form.reason"
              type="text"
              class="mb-3"
              maxlength="15"
              required
            >
            </b-form-input>
          </b-col>
          <b-col cols="12" md="6">
            <label class="mb-1">Monto.</label>		
            <b-form-input
              v-model="form.amount"
              type="number"
              class="mb-3"
              required
            >
            </b-form-input>
          </b-col>
        </b-row>
        <div class="mb-3">
          <label>Referencia.</label>
          <input 
            type="file" 
            class="form-control"
            id="customFile"
            ref="file"
            required
            v-on:change="onChange"
          >
        </div>
        <div class="text-center">
          <b-button type="submit" class="btn-bingo">Enviar solicitud</b-button>
        </div>
      </b-form>
    </b-card>
    <b-modal
      ref="showDataAccount"
      centered
      hide-footer
      content-class="shadow"
      class="p-0"
      size="md"
    >
      <template #modal-title>
        Datos de la cuenta - <span class="text-red">{{account.type_account}}</span>
      </template>
      <b-container>
        <p></p>
        <ul>
          <li v-for="(attribute, index) of attributes" :key="index">
            <span v-if="attribute.email"> {{attribute.email}}</span>
          </li>
        </ul>
      </b-container>
    </b-modal>
  </div>
</template>
<script>
import MainService from '@/services/MainService'
import axios from 'axios'

export default {
  data () {
    return {
      accountSelected: null,
      accountsAdmin: null,
      account: {},
      attributes: [],
      form: {
        amount: '',
        reason: '',
        description: '',
        image: '',
        error: null
      },
      message: false,
      imagePreview: '',
    }
  },
  mounted () {
    this.getAccountActive();
  },
  methods: {
    onChange(e) {
      this.form.image = e.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(this.form.image)
      reader.onload = e => {
        this.imagePreview = e.target.result
      }
    },
    getAccountActive () {
      const data = {
        route: 'user/accounts/admin',
      }
      
      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.accountsAdmin = res.accounts
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    selectAccount (data) {
      this.$refs['showDataAccount'].toggle()
      this.account = data
      this.account.attributes = JSON.parse(data.attributes)
      this.attributes = [this.account.attributes]
    },
    sendRequestRecharge () {
    
      const axiosRequest = axios.create({
        baseURL: `${process.env.VUE_APP_API_URL}/`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest'
        },
      })

      axiosRequest.defaults.headers.common.Authorization = `${this.$session.get('token_type')} ${this.$session.get('access_token')}`

      this.form.description = `ID del usuario: ${this.$store.state.user.id}, Monto: ${this.form.amount}`

      let data = new FormData()
      data.append("reason", this.form.reason)
      data.append("description", this.form.description)
      data.append("amount", this.form.amount)
      data.append("image", this.form.image)
      
      axiosRequest.post('user/request', data)
        .then((res) => {
           
          if (res.data.statusCode == 0) {
            if (!this.message) {
              this.$swal({
                icon: 'success',
                title: 'Solicitud enviada con exito!',
                text: 'Le llegara una notificacion al momento de ser aporbada',
              })
              this.form = {}
            }
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    // sendRequestPayment () {
    //   const data = {
    //     route: 'user/wallet',
    //   }

    //   MainService.get(data)
    //     .then((response) => {
    //       const res = response.data
    //       if (res.statusCode == 0) {
    //         this.wallet = res.wallet
    //       }
    //     })
    //     .catch((err) => {
    //       console.log('error', err)
    //     })
    // }
  }
}
</script>
<style scoped>
@import url('../../assets/css/Forms.css');

.card.account_active {
  background-color: rgb(35, 35, 35);
  border-radius: 25px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
}
</style>
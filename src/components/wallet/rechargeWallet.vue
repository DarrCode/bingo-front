<template>
  <b-card class="card-bingo">
    <h3 class="card-title text-center">Recargar saldo</h3>
    <div class="text-center">
      <small class="text-center">Envia una solicitud para que recarguen tu saldo y juega ya</small>
    </div>
    <div class="alert alert-danger"  v-if="form.error">
      <ul v-for="(err, index) of form.error" :key="index">
        <li>
          <small> {{ err }}</small>
        </li>
      </ul>
    </div>
    <div class="alert alert-success" v-if="form.message">
      <small>Solicitud enviada correctamente!</small>
    </div>
      
    <b-form @submit.prevent="sendRequestPayment">

     <label class="mb-1">Monto.</label>		
      <select class="form-control mb-3">
        <option value="">321</option>
      </select>

      <label class="mb-1">Monto.</label>		
      <b-form-input
        v-model="form.amount"
        type="number"
        class="mb-3"
        placeholder="100.00"
        required
      >
      </b-form-input>
     <div class="mb-3">
        <label>Referencia.</label>
        <input class="form-control" type="file" id="formFile">
      </div>
      <div class="text-center">
        <b-button type="submit" class="btn-bingo">Enviar solicitud</b-button>
      </div>
    </b-form>
  </b-card>
</template>
<script>
import MainService from '@/services/MainService'

export default {
  data () {
    return {
      file1: null,
      account: {},
      form: {
        amount: '',
        error: null
      }
    }
  },
  mounted () {
    this.getAccountActive();
  },
  methods: {
    getAccountActive () {
      const data = {
        route: 'user/profile/accounts/show',
      }

      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.account = res.account
            console.log(this.account);
          }
        })
        .catch((err) => {
          console.log('error', err)
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
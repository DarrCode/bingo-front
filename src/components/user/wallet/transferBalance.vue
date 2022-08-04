<template>
  <b-card class="card-bingo">
      <h4 class="card-title text-center">Transferir Saldo</h4>
      <div class="text-center" v-if="!form.error">
        <small>Envia saldo a tus amigos</small>
      </div>
      <div class="alert alert-danger alert-dismissible fade show" v-else>
        <small> {{ form.error }}</small>
      </div>
      <div class="alert alert-success" v-if="form.message">
        <small>Balance enviado correctamente!</small>
      </div>
      <b-form @submit.prevent="sendBalance">
        <label class="mb-1">Correo electrónico.</label>		
        <b-form-input
          v-model="form.email"
          type="email"
          class="mb-3"
          placeholder="bingo@royalty.com"
          required
        >
        </b-form-input>

        <div class="mb-3">
          <label class="form-label">Monto.</label>
          <b-form-input
            type="number"
            v-model="form.amount"
            placeholder="0.00"
            required
          >
          </b-form-input>
        </div>
        <div class="text-center">
          <button 
            type="submit" 
            class="btn btn-bingo"
            :disabled="form.button.disabled"
            v-html="form.button.innerText"
          >
          </button>
        </div>
		  </b-form>
  </b-card>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  data() {
    return {
      form: {
        email: '',
        amount: '',
        error: null,
        message: false,
        button: {
          disabled: false,
          innerText: 'Enviar Dinero',
          original: 'Enviar',
          onEvent: 'Enviando dinero'
        }
      },
    }
  },
   methods: {
    sendBalance () {
      const data = {
        route: 'user/wallet/balance',
        params: {
          email: this.form.email,
          balanceToSend: this.form.amount,
        }
      }

      MainService.put(data)
        .then((response) => {
          const res = response.data

          if (res.statusCode == 0) {
            this.form.error = null
            this.$store.state.balance = this.$store.state.balance - this.form.amount
            this.form.message = true

            setTimeout(() => {
              this.form.email = ''
              this.form.amount = ''
              this.form.message = false
            }, 5000);            
          } else if (res.statusCode == 5) {
            this.form.message = false
            this.form.error = 'Verifica que el correo y el monto sean correctos'
            setTimeout(() => {
              this.form.error = ''
            }, 10000);
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }
}
</script>
<style>
@import url('../../../assets/css/Forms.css');
  
</style>
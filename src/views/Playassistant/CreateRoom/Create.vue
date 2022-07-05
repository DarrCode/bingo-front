<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" md="10">
          <div class="card-bingo mx-auto mt-5">
            <div class="card-body">
              <h4 class="card-title text-center mb-4">
                Ingresa los datos de la  jugada actual
              </h4>
              <div class="alert alert-danger" v-if="room.error">
                <ul v-for="(err, index) of room.error" :key="index">
                  <li>
                    <small> {{ err }}</small>
                  </li>
                </ul>
              </div>
              <div class="alert alert-success" v-if="room.message">
                <small>Jugada creada correctamente!</small>
              </div>
              <form @submit.prevent="createRoom">
                <div class="row g-3 mb-2 align-items-center">
                  <div class="col-12 col-sm-6">
                    <label>Nombre de jugada.</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="room.name" 
                      required
                    >
                  </div>
                  <div class="col-12 col-sm-6">
                    <label>Número de jugada.</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="room.number" 
                      required
                    >
                  </div>
                </div>
                <div class="row g-3 mb-2 align-items-center">
                  <div class="col-12 col-sm-6">
                    <label>Cartones por jugador.</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="room.cardboards" 
                      required
                    >
                  </div>
                  <div class="col-12 col-sm-6">
                    <label>Costo del cartón.</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="room.amount" 
                      required
                    >
                  </div>
                </div>
                <div class="row g-3 mb-2 align-items-center">
                  <div class="col-12 col-sm-6">
                    <label>Valor de la línea.</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="room.line" 
                      required
                    >
                  </div>
                  <div class="col-12 col-sm-6">
                    <label>Valor cartón lleno.</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="room.full" 
                      required
                    >
                  </div>
                </div>
                <center>
                  <button class="btn btn-danger mt-3">
                    <b>CREAR JUGADA</b>
                  </button>
                </center>
              </form>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  data () {
    return {
      room: {}
    }
  },
  methods: {
    createRoom () {
      const data = {
        route: 'user/wallet/balance',
        params: {
          email: this.form.email,
          balanceToSend: this.form.balance,
        }
      }

      MainService.put(data)
        .then((response) => {
          const res = response.data

          if (res.statusCode == 0) {
            this.form.error = null
            this.form.message = true
            this.form.email = ''
            this.form.balance = ''
          } else if (res.statusCode == 5) {
            this.form.message = false
            this.form.error = 'Datos invalidos verifique que el correo y el monto sean correctos'
            setTimeout(() => {
              this.form.error = ''
            }, 6000);
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
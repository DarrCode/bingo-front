<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" md="8">
          <div class="card-bingo mx-auto mt-5">
            <div class="card-body">
              <h4 class="card-title text-center mb-4">
                Ingresa los datos de la  jugada actual
              </h4>
              <div class="alert alert-danger" v-if="form.error">
                <ul v-for="(err, index) of form.error" :key="index">
                  <li>
                    <small> {{ err }}</small>
                  </li>
                </ul>
              </div>
              <div class="alert alert-success" v-if="form.message">
                <small>Jugada creada correctamente!</small>
              </div>
              <form @submit.prevent="createRoom">
                <div class="row g-3 mb-2 align-items-center">
                  <div class="col-12 col-sm-6">
                    <label>Nombre de jugada.</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="form.name" 
                      required
                    >
                  </div>
                  <div class="col-12 col-sm-6">
                    <label>Cartones por jugador.</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="form.cardboards" 
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
                      v-model="form.line_game" 
                      required
                    >
                  </div>
                  <div class="col-12 col-sm-6">
                    <label>Valor cartón lleno.</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="form.full_game" 
                      required
                    >
                  </div>
                </div>
                <div class="row g-3 mb-2 align-items-center">
                  <div class="col-12 col-sm-6">
                    <label>Valor bola 39.</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="form.ballThirtyNine"
                      required
                    >
                  </div>
                  <div class="col-12 col-sm-6">
                    <label>Fecha de inicio.</label>
                    <input 
                      type="datetime-local" 
                      class="form-control" 
                      v-model="form.date_start"
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

// $totalcobrado= "suma de pago de cartones"

// $acumulado=x % de $totalcobrado

// $comision=x % de $totalcobrado

// $referido= x% de $totalcobrado(carton referido)

// porcentaje para la casa
export default {
  data () {
    return {
      form: {

      }
    }
  },
  methods: {
    createRoom () {
      const data = {
        route: 'play-assistant/meeting',
        params: {
          form: {
            name: this.form.name,
            cardboard_number: this.form.cardboard_number,
            line_play: this.form.line_play,
            full_cardboard: this.form.full_cardboard,
            totalcollected: this.form.totalcollected,
            accumulated: this.form.accumulated,
            commission: this.form.commission,
            referred: this.form.referred,
            start: this.form.start
          }
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
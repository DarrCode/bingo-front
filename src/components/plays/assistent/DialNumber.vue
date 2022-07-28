<template>
  <div class="container-fluid">
    <div class="row">
      <h3 class="text-center color-royal mb-4">Info. Jugada actual</h3>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-4">
        <p>Cant. de jugadores</p> 
      </div>
      <div class="col-12 col-md-4">
        <p>Cant. de jugadores</p> 
      </div>
      <div class="col-12 col-md-4">
        <p>Cant. de jugadores</p> 
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <div class="alert alert-danger" v-if="error && msg.length">
          <b>{{msg}}</b>
        </div>
        <div class="alert alert-success" v-if="!error && msg.length">
          <b>{{msg}}</b>
        </div>
        <form @submit.prevent="sendChant">
          <div class="row g-3">
            <div class="col-12">
              <input
                v-model="chant.lyrics"
                type="text"
                class="form-control"
                placeholder="Letra"
                maxlength="1"
                required
              >
            </div>
            <div class="col-12">
              <input
                v-model="chant.number"
                type="number"
                class="form-control"
                placeholder="Numero"
                maxlength="2"
                required
              >
            </div>
            <div class="d-flex justify-content-center">
              <button class="btn btn-bingo">enviar canto</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  data () {
    return {
      dataRoom: null,
      chant: {
        lyrics: '',
        number: ''
      },
      error: false,
      msg: []
    }
  },
  props: {
    idRoom: {
      type: Number
    }
  },
  mounted () {

  },
  methods: {
    getDataRoom (){
      const data = {
        route: `/play-assistant/meeting/${3}`,
      }

      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.dataRoom = res.data
            console.log('this.dataRoom', this.dataRoom);
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    sendChant () {
      const data = {
        route: `/play-assistant/meeting/${3}/game`,
        params:{
          number: this.chant.number,
          lyrics: this.chant.lyrics.toUpperCase()
        }
      }

      MainService.post(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 5) {
              this.error = true
              let message = Object.entries(res.detail)[0]
              this.msg = message[1][0]
          } else if (res.statusCode == 0) {
            this.error = false
            this.msg = res.result
          }

          setTimeout(() => {
            this.chant = {}
            this.msg = []
          }, 4000);
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }
}
</script>
<style scoped>
@import url('../../../assets/css/Forms.css');
p {
  text-align: center;
  color: #fff;
}
</style>
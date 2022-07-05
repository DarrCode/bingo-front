<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols="12" sm="4">
        <b-card class="card-cartones mb-4">
          <div class="card-body text-center">
            <h3 class="card-title">Cartones</h3>
            <h5>Listado de cartones disponibles</h5>
              <button class="mt-3 btn btn-red " @click="cartonNormal = true">
                Ver
              </button>
          </div>
        </b-card>
        <b-card class="card-cartones">
          <div class="card-body text-center">
            <h3 class="card-title">Cartones <span class="text-vip">VIP</span></h3>
            <h5>Al ser usuario <span class="text-vip">VIP</span> tienes el beneficio de crear tus propios cartones</h5>

            <button class="mt-3 btn btn-vip">
              Crear
            </button>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" sm="8">
        <CartonNormal v-if="cartonNormal"/>
      </b-col>
    </b-row>
    
  </b-container>
</template>
<script>

export default {
  components: {
    CartonNormal:   () => import('@/components/user/cartones/cartonNormal'),
    Cartonvip: () => import('@/components/user/cartones/cartonVip')
  },
  data () {
    return {
      cartonNormal: false,
      //cartonVip: false
    }
  },
  methods: {
    
  }
}
</script>
<style >
.card-cartones {
  border-radius: 0.5em;
  border: 2px solid var(--gold);
  background-color: rgb(8, 8, 8);
  font-size: 20px;
  color: #949494;
}
.btn-red {
  background-color: #c62f3a;
  text-transform: uppercase;
  font-weight: 800;
  color: #fff;
}

.btn-red:focus {
  background-color: #823438;
}

.btn-vip {
  color: var(--gold);
  text-transform: uppercase;
  font-weight: 800;
  border: 2px solid var(--gold);
}

.btn-vip:focus {
  background-color: #141414;
}
</style>

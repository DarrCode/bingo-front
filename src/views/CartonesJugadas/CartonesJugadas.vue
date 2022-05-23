<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols="12" sm="4">
        <b-card class="card-cartones mb-4">
          <div class="card-body text-center">
            <h3 class="card-title">Normal</h3>
            <h4>Comprar cartones</h4>
            <p>description</p>
              <b-button @click="cartonNormal = true">
                Crear
              </b-button>
          </div>
        </b-card>
        <b-card class="card-cartones">
          <div class="card-body text-center">
            <h3 class="card-title">VIP</h3>
            <h4>Crear cartones</h4>
            <p>description</p>
              <b-button>
                Crear
              </b-button>
          </div>
        </b-card>
      </b-col>
      <b-col cols="8">
        <CartonNormal v-if="cartonNormal"/>
      </b-col>
    </b-row>
    
  </b-container>
</template>
<script>

export default {
  components: {
    CartonNormal:   () => import('@/components/cartones/cartonNormal'),
    Cartonvip: () => import('@/components/cartones/cartonVip')
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
</style>

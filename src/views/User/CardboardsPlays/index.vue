<template>
  <b-container>
    <b-row class="mt-3">
      <b-col cols="12" md="6">
        <b-card class="card-cartones text-center">
          <h3 class="card-title">Cartones</h3>
          <h5>Listado de cartones disponibles</h5>
        </b-card>
        <CardboardsIndex />
      </b-col>
      <b-col cols="12" sm="6">
        <b-card class="card-cartones text-center">
          <h3 class="card-title">Jugadas del dia </h3>
          <span class="text-danger"> {{ dateNow }} </span>
        </b-card>
        <PlaysDay />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import moment from 'moment'
export default {
  components: {
    CardboardsIndex: () => import('@/components/user/cardboards/index'),
    CardboardVip:    () => import('@/components/user/cardboards/cardboardVip'),
    PlaysDay:        () => import('@/components/user/cardboards/index')
  },
  data () {
    return {
      dateNow: moment().format('DD/MM/YYYY')
    }
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

.btn-bingo {
  color: var(--gold);
  text-transform: uppercase;
  font-weight: 800;
  border: 2px solid var(--gold);
}

.btn-bingo:focus {
  background-color: #141414;
}
</style>

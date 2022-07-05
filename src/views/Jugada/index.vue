<template>
  <b-container>
    <b-row>
      <b-col cols="6" md="8">
        <Stream />
      </b-col>
      <b-col cols="6" md="4" v-if="$store.state.user.role_id == 3">
        <Carousel  />
      </b-col>
       <b-col cols="6" md="4" v-if="$store.state.user.role_id == 4">
        <MarcarNumero  />
      </b-col>
    </b-row>  
  </b-container>
</template>

<script>
export default {
  components: {
    Stream:   () => import('@/components/jugada/stream'),
    Carousel: () => import('@/components/jugada/cartones'),
    MarcarNumero: () => import('@/components/jugada/MarcarNumero'),
  }  
}
</script>
<style scoped>
  .container, .row{
    margin-right: 0px;
    padding-right: 0px;
  }
</style>
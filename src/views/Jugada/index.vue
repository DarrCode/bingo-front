<template>
  <b-container fluid>
    <b-row class="mt-5">
      <b-col cols="6" md="8">
        <Stream />
      </b-col>
      <b-col cols="6" md="4" v-if="$store.state.user.role_id == 3">
        <Carousel  />
      </b-col>
       <b-col cols="6" md="4" v-if="$store.state.user.role_id == 4">
        <DialNumber  />
      </b-col>
    </b-row>  
  </b-container>
</template>

<script>
export default {
  components: {
    Stream:   () => import('@/components/plays/stream'),
    Carousel: () => import('@/components/plays/cartones'),
    DialNumber: () => import('@/components/plays/assistent/DialNumber'),
  }  
}
</script>
<style scoped>
  .container, .row{
    margin-right: 0px;
    padding-right: 0px;
  }
</style>
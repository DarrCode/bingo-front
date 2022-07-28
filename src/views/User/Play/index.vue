<template>
  <b-container fluid>
    <b-row class="mt-5">
      <b-col cols="6" md="8">
        <Stream />
      </b-col>
      <b-col cols="6" md="4" v-if="rol == 3">
        <Carousel  />
      </b-col>
       <b-col cols="6" md="4" v-if="rol == 4">
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
  },
  data () {
    return {
      roleId: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.roleId = this.$store.getters['role']
    }, 1000);
  }
}
</script>
<style scoped>
  .container, .row{
    margin-right: 0px;
    padding-right: 0px;
  }
</style>
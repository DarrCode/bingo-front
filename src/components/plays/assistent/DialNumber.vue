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
        <form>
          <div class="row g-3">
            <div class="col-12 col-md-9">
              <input
                type="number"
                class="form-control form-control-lg"
              >
            </div>
            <div class="col-12 col-md-3">
              <button class="btn btn-bingo">enviar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
@import url('../../../assets/css/Forms.css');
p {
  text-align: center;
  color: #fff;
}
</style>
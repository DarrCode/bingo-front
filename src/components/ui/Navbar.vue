<template>
  <div>
    <b-navbar toggleable="lg" type="dark" >
      <div class="container">

        <b-nav-item-dropdown style=" list-style: none" no-caret>
          <template #button-content>
            <b-avatar src="data:image/jpeg;base64,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" class="mr-3"></b-avatar>
            MORFEO
          </template>
          <b-dropdown-item to="/auth">Cerrar sesion</b-dropdown-item>
          
        </b-nav-item-dropdown>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item class="ms-5">ID: 000562</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ms-auto">
         
            <div class="align-items-center">
              <b-form-input size="sm" value="100.000" disabled></b-form-input>
              <b-button  size="sm">
                <img src="../../assets/images/btn-plus.jpg" width="25" height="25">
              </b-button>
            </div>
            <div class="row align-items-center">
              <div class="col-auto">
                <b-link to="3">
                  <img src="../../assets/images/icon-statistics.png" width="40" height="40">
                </b-link>
              </div>
              <div class="col-auto">
                <b-link to="3">
                  <img src="../../assets/images/icon-star.png" width="40" height="40">
                </b-link>
              </div>
              <div class="col-auto">
                <b-link to="3">
                  <img src="../../assets/images/icon-clock.png" width="40" height="40">
                </b-link>
              </div>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
<style scoped>
.navbar {
  background-color: #21201c;
  border-bottom: 1px solid #66623f;
}

.b-avatar {
  width: 3rem;
  height: 3rem;
}

.navbar-dark .navbar-nav .nav-link{
  color: #817a61;
}

.form-control:disabled {
  width: 50%;
  display: inline-block;
  background-color: #151515;
  border-radius: 25px;
  color: #817a61;
  border: none;
  text-align: center;
  padding: 0.1rem 0.5rem;
}

.btn-secondary {
  background-color: transparent;
  border-color: transparent;
  margin-left: -25px;
}

.btn-secondary:hover, .btn-secondary:focus{
  background-color: transparent;
  border-color: transparent;
}


</style>

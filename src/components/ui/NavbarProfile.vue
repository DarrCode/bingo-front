<template>
  <b-navbar toggleable="lg" type="dark" >
    <div class="container">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mx-auto">
          <div class="row align-items-center">
            <div class="col-auto mt-2" v-if="rol == 3">
              <b-link to="home" title="Home">
                <b-icon-house-door-fill width="30" height="30"></b-icon-house-door-fill>
              </b-link>
            </div>
            <div class="col-auto mt-2" v-if="rol == 3">
              <b-link to="wallet" title="Notificaciones">
                <b-icon-bell-fill width="30" height="30"></b-icon-bell-fill>
              </b-link>
            </div>
            <div class="col-auto mt-2" v-if="rol == 3">
              <b-link to="wallet" title="Wallet">
                <b-icon-wallet-fill width="30" height="30"></b-icon-wallet-fill>
              </b-link>
            </div>             
            <div class="col-auto" v-if="rol == 3">
              <b-link to="3">
                <img src="../../assets/images/icon-statistics.png" width="40" height="40">
              </b-link>
            </div>
            <div class="col-auto" v-if="rol == 3">
              <b-link to="3">
                <img src="../../assets/images/icon-star.png" width="40" height="40">
              </b-link>
            </div>
            <div class="col-auto" v-if="rol == 3">
              <b-link to="3">
                <img src="../../assets/images/icon-clock.png" width="40" height="40">
              </b-link>
            </div>
            <div class="col-auto mt-2" v-if="rol == 1 || rol == 2 || rol == 4 || rol == 5">
              <b-link class="nav-link" to="/home">Inicio</b-link>
            </div>
            <div class="col-auto mt-2" v-if="rol == 1 || rol == 2 || rol == 4 || rol == 5">
              <b-link class="nav-link" to="precio-carton">Crear jugada</b-link>
            </div>
            <div class="col-auto mt-2" v-if="rol == 1 || rol == 2 || rol == 4 || rol == 5">
              <b-link class="nav-link" to="precio-carton">Precio por carton</b-link>
            </div>
            <div class="col-auto mt-2" v-if="rol == 1 || rol == 2">
              <b-link class="nav-link" to="admin-cartones">Cartones</b-link>
            </div>
            <div class="col-auto mt-2" v-if="rol == 1 || rol == 2">
              <b-link class="nav-link" to="admin-jugadores">Jugadores</b-link>
            </div>
            <div class="col-auto mt-2" v-if="rol == 1 || rol == 2">
              <b-link class="nav-link" to="admin-cuentas">Cuentas</b-link>
            </div>

          </div>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>
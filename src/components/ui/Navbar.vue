<template>
  <div>
    <b-navbar toggleable="lg" type="dark" >
      <div class="container" v-if="$store.state.user">
        <b-nav-item-dropdown style="list-style: none" no-caret>
          <template #button-content>
            <b-avatar 
              :src="imgProfile"  
              :alt="$store.state.user.name"
              class="mr-3"
            >
              </b-avatar>
            <span class="text-uppercase text-user">
              {{ $store.state.user.name }}
            </span>
            
          </template>
          <b-dropdown-item
            v-if="$store.state.user.role_id == 3"
            class="text-user" 
            to="/perfil"
          >
            Ver perfil
          </b-dropdown-item>
          <b-dropdown-item class="text-user" @click.prevent="logout">Cerrar sesion</b-dropdown-item>
          
        </b-nav-item-dropdown>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item class="ms-5 mb-1 text-user">ID: {{ $store.state.user.id }}</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ms-auto">
         
            <div class="align-items-center mt-1" v-if="$store.state.user.role_id == 3">
              <b-form-input size="sm" :value="$store.state.user.wallet.balance" disabled></b-form-input>
              <b-button  size="sm" to="/wallet">
                <b-icon-plus-circle-fill width="30" height="30"></b-icon-plus-circle-fill>
              </b-button>
            </div>
            <div class="row align-items-center">
              <div class="col-auto mt-2">
                <b-link to="home" title="Home">
                  <b-icon-house-door-fill width="30" height="30"></b-icon-house-door-fill>
                </b-link>
              </div>
              <div class="col-auto mt-2" v-if="$store.state.user.role_id == 2">
                <b-link class="nav-link" to="admin-cartones">
                  CARTONES
                </b-link>
              </div>
              <div class="col-auto mt-2" v-if="$store.state.user.role_id == 2">
                <b-link class="nav-link" to="admin-jugadores">
                  JUGADORES
                </b-link>
              </div>
              <div class="col-auto mt-2" v-if="$store.state.user.role_id == 2">
                <b-link class="nav-link" to="admin-cuentas">
                  CUENTAS
                </b-link>
              </div>
              <div class="col-auto mt-2" v-if="$store.state.user.role_id == 3">
                <b-link to="wallet" title="Notificaciones">
                  <b-icon-bell-fill width="30" height="30"></b-icon-bell-fill>
                </b-link>
              </div>
              <div class="col-auto mt-2" v-if="$store.state.user.role_id == 3">
                <b-link to="wallet" title="Wallet">
                  <b-icon-wallet-fill width="30" height="30"></b-icon-wallet-fill>
                </b-link>
              </div>             
              <div class="col-auto" v-if="$store.state.user.role_id == 3">
                <b-link to="3">
                  <img src="../../assets/images/icon-statistics.png" width="40" height="40">
                </b-link>
              </div>
              <div class="col-auto" v-if="$store.state.user.role_id == 3">
                <b-link to="3">
                  <img src="../../assets/images/icon-star.png" width="40" height="40">
                </b-link>
              </div>
              <div class="col-auto" v-if="$store.state.user.role_id == 3">
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
  data () {
    return {
      imgProfile: null
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$session.destroy()
    }
  },
  mounted() {
    this.$store.dispatch("getUser");
    setTimeout(() => {
      this.imgProfile = this.$store.state.url+''+this.$store.state.user.profile.profile_image
    }, 500);
  }
}

</script>
<style scoped>
.navbar {
  background-color: #21201c;
  border-bottom: 2.5px solid var(--gold);;
}

.b-avatar {
  width: 3rem;
  height: 3rem;
}

.navbar-dark .navbar-nav .nav-link, .b-icon.bi, .nav-link{
  color: #b09a7a;
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

.text-user{
  font-size: 18px;
  color: #817a61;
}
</style>

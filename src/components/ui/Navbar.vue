<template>
  <div>
    <b-navbar toggleable="lg" type="dark">
      <div class="container">
        <b-nav-item-dropdown style="list-style: none" no-caret>
          <template #button-content>
            <b-avatar 
              :src="imgProfile"  
              :alt="user.name"
              class="mr-3"
            >
              </b-avatar>
            <span class="text-uppercase text-user">
              {{ user.name }}
            </span>
            
          </template>
          <b-dropdown-item
            v-if="roleId == 3"
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
            <b-nav-item class="ms-5 mb-1 text-user">ID: {{ user.id }}</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ms-auto">
         
            <div class="align-items-center mt-1" v-if="roleId == 3">
              <b-form-input size="sm" :value="user.wallet.balance" disabled></b-form-input>
              <b-button  size="sm" to="/wallet">
                <b-icon-plus-circle-fill width="30" height="30"></b-icon-plus-circle-fill>
              </b-button>
            </div>

            <div class="row align-items-center">
              <div class="col-auto mt-2" v-if="roleId == 3">
                <b-link to="home" title="Home">
                  <b-icon-house-door-fill width="30" height="30"></b-icon-house-door-fill>
                </b-link>
              </div>
              <div class="col-auto mt-2" v-if="roleId == 3">
                <b-link to="wallet" title="Notificaciones">
                  <b-icon-bell-fill width="30" height="30"></b-icon-bell-fill>
                </b-link>
              </div>
              <div class="col-auto mt-2" v-if="roleId == 3">
                <b-link to="wallet" title="Wallet">
                  <b-icon-wallet-fill width="30" height="30"></b-icon-wallet-fill>
                </b-link>
              </div>             
              <div class="col-auto" v-if="roleId == 3">
                <b-link to="3">
                  <img src="@/assets/images/icon-statistics.png" width="40" height="40">
                </b-link>
              </div>
              <div class="col-auto" v-if="roleId == 3">
                <b-link to="3">
                  <img src="@/assets/images/icon-star.png" width="40" height="40">
                </b-link>
              </div>
              <div class="col-auto" v-if="roleId == 3">
                <b-link to="3">
                  <img src="@/assets/images/icon-clock.png" width="40" height="40">
                </b-link>
              </div>
              <div class="col-auto mt-2" v-if="roleId == 1 || roleId == 2 || roleId == 4 || roleId == 5">
                <b-link class="nav-link" to="/home">Inicio</b-link>
              </div>
              <div class="col-auto mt-2" v-if="roleId == 1 || roleId == 2 || roleId == 4 || roleId == 5">
                <b-link class="nav-link" to="crear-sala">Crear sala</b-link>
              </div>
              <div class="col-auto mt-2" v-if="roleId == 1 || roleId == 2 || roleId == 4 || roleId == 5">
                <b-link class="nav-link" to="precio-carton">Precio por carton</b-link>
              </div>
              <div class="col-auto mt-2" v-if="roleId == 1 || roleId == 2">
                <b-link class="nav-link" to="cartones">Cartones</b-link>
              </div>
              <div class="col-auto mt-2" v-if="roleId == 1 || roleId == 2">
                <b-link class="nav-link" to="jugadores">Jugadores</b-link>
              </div>
              <div class="col-auto mt-2" v-if="roleId == 1 || roleId == 2">
                <b-link class="nav-link" to="cuentas">Cuentas</b-link>
              </div>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import MainService from '@/services/MainService'

export default {
  name: 'Navbar',
  data () {
    return {
      imgProfile: null,
      roleId: null,
      user: null,
    }
  },
  created () {
    this.user = this.$store.getters['user']
    this.getImgProfile()
  },
  mounted () {
    this.roleId = this.$store.getters['role'] ? this.$store.getters['role'] : this.$session.get('user').role_id
  },
  methods: {
    getImgProfile () {
      const data = {
				route: 'user',
			}

			MainService.get(data)
			.then((response) => {
				const res = response.data
				if (res.statusCode == 0) {
					this.imgProfile = this.$store.state.url+''+res.imgProfile
				}
			})
			.catch((err) => {
				console.log('error', err)
			})
    },
    logout() {
      this.$store.dispatch("logout")
      this.$session.destroy()
    }
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

.bi-plus-circle-fill {
  color: #c62f3a!important;
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

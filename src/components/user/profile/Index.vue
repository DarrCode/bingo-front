<template>
  <div>
    <div class="card card-profile" style="padding: 0.5em 0.5em 0.5em;">
        <div class="d-flex flex-column flex-md-row justify-content-around">
              <center class="mt-1">
                <b-button 
                  v-b-tooltip.bottom.click="{ variant: 'success' }" 
                  :title="link" 
                  class="btn-bingo"
                  @click="copyLink()"
                >
                  Codigo de referido
                </b-button>
              </center> 
          <div>
             <input
                  v-on:focus="$event.target.select()" 
                  ref="clone" 
                  readonly 
                  :value="link"
                  style="opacity:0"
                />
          </div>
          <center>
            <b-dropdown right variant="link" no-caret>
              <template #button-content>
                <button class="btn btn-red">Configurar
                  <b-icon-gear-fill class="text-white"></b-icon-gear-fill>
                </button>
              </template>
              <b-dropdown-item @click="notifications()">
                <span v-if="profile.notifications">Desactivar </span>
                <span v-else>Activar </span>
                <span>notificaciones</span>
              </b-dropdown-item>
              <b-dropdown-item v-b-modal.change-password>
                Cambiar contraseña
              </b-dropdown-item>
              <b-dropdown-item @click="disableAccount()">
                Eliminar cuenta
              </b-dropdown-item>
            </b-dropdown>
          </center>
        </div>

        <ul class="list-group list-group-flush" v-if="$store.state.user">
          <li class="list-group-item">
            <span class="ms-0 ms-sm-3">
              <b>Nombre completo.</b>
            </span>
            <span class="float-end text-capitalize">{{ $store.state.user.name }} {{ profile.last_name }}</span>
          </li>
          <li class="list-group-item">
            <span class="ms-0 ms-sm-3">
            <b>Correo electronico.</b>
            </span>
            <span class="float-end">{{ $store.state.user.email }}</span>
          </li>
          <li class="list-group-item">
            <span class="ms-0 ms-sm-3">
              <b>Pais.</b>
            </span>
            <span class="float-end text-capitalize">{{ profile.country }}</span>
          </li>
          <li class="list-group-item">
            <span class="ms-0 ms-sm-3">
              <b>Fecha de registro.</b>
            </span>
            <span class="float-end">
              {{ $store.state.user.created_at | moment("DD/MM/YYYY") }} - {{ $store.state.user.created_at | moment("HH:mm:ss a") }}
            </span>
          </li>
        </ul>
    </div>

    <b-modal 
      id="change-password" 
      ref="change-password" 
      title="Cambio de contraseña" 
      content-class="shadow"
      class="p-0"
      hide-footer
    >
      <b-form @submit.prevent="changePassword">
        <div class="mb-3">
				<label class="form-label">Contraseña actual:</label>
				<b-form-input
					type="password"
					v-model="form.current_password"
					required
				></b-form-input>
			</div>
			<div class="mb-3">
				<label class="form-label">Nueva contraseña:</label>
				<b-form-input
					type="password"
					v-model="form.new_password"
					required
				></b-form-input>
			</div>

			<div class="mb-3">
				<label class="form-label">Confirmar contraseña:</label>
				<b-form-input
					type="password"
					v-model="form.new_confirm_password"
          autocomplete="off"
					required
				></b-form-input>
			</div>
			<div class="text-center">
				<a
					type="submit"
          @click="changePassword($e)" 
					class="btn btn-red"
					>
					Actualizar 
				</a>
			</div>
		</b-form>
    </b-modal>
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  data() {
    return {
      profile: {},
      link: '',
      form: {}
    }
  },
  mounted () {
      this.profile = this.$store.state.user.profile
      this.link = this.$store.state.user.referral_code
  },
  methods: {
    notifications () {
      const data = {
        route: `/user/profile/notifications/`,
      }
      MainService.put(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          if (res.notification) {
            this.$swal({
              icon: 'success',
              position: 'top-end',
              title: 'Notificaciones desactivadas',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            this.$swal({
              icon: 'success',
              position: 'top-end',
              title: 'Notificaciones desactivadas',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    },  
    copyLink() {
      this.$refs.clone.focus();
      document.execCommand('copy');

      this.$swal({
        icon: 'success',
        position: 'top-end',
        title: 'Codigo copiado',
        showConfirmButton: false,
        timer: 1500
      })
    },
    changePassword (e) {

      e.preventDefault()

      const data = {
        route: `/user/profile/change-password/`,
        params: {
          current_password: this.form.current_password,
          new_password: this.form.new_password,
          new_confirm_password: this.form.new_confirm_password
        }
      }

      MainService.post(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.$swal('Ok', 'Su contraseña ha sido cambiada', 'success')
          this.$refs['change-password'].hide()
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
    disableAccount (){
      this.$swal({
        title: 'Alto!',
        text: 'No podras revertir esta acción',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#c62f3a",
        confirmButtonText: 'Eliminar cuenta',
        cancelButtonText: 'Cancelar',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          const data = {
            route: `/user/profile/disableAccount/`,
          }
          MainService.put(data)
          .then((res) => {
            this.$swal('Cuenta desactivada', ':(', 'success')
            setTimeout(() => {
              this.$store.dispatch("logout");
              this.$session.destroy()
            }, 4000);
            this.index()
          })
          .catch((err) => {
            console.log('error', err)
          })
          
        }
      })
    }
  }
}
</script>
<style scoped>

.btn-secondary {
  background: none;
}
.tooltip.b-tooltip{
  font-size: 18px!important;
}

.tooltip.b-tooltip-success .tooltip-inner{
  background-color: #66623f!important;
}
</style>
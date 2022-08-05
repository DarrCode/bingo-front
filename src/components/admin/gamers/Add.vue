<template>
  <b-modal
    ref="addUser"
    centered
    hide-footer
    content-class="shadow"
    class="p-0"
    size="lg"
  >
    <template #modal-title>
      Registra una cuenta
    </template>
    <b-container>
      <b-row>
        <b-form @submit.prevent="addUser">
			<div class="mb-3">
				<label class="form-label">Nombre.</label>
				<b-form-input
					v-model="form.name"
					type="text"
					required
				></b-form-input>
			</div>
			
			<div class="mb-3">
				<label class="form-label">Correo electrónico.</label>
				<b-form-input
					v-model="form.email"
					type="email"
					placeholder="bingo@royalty.com"
					required
				></b-form-input>
			</div>

			<div class="mb-3">
				<label class="form-label">Contraseña.</label>
				<b-form-input
					type="password"
					v-model="form.password"
					placeholder="********"
					required
				></b-form-input>
			</div>
			<div class="mb-3">
				<label class="form-label">Seleccionar Rol.</label>
				<select @change="getRoles" v-model="form.rol" class="form-control">
          <option 
            v-for="(rol, index) of roles" 
            :key="index" 
            :value="rol.id"
          > 
            {{rol.name}} 
          </option>
        </select>
			</div>
			
			<div class="text-center">
				<b-button 
					type="submit" 
					class="btn-bingo"
				>
					Registrar cuenta
				</b-button>
			</div>
		</b-form>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import MainService from '@/services/MainService'

export default {
  data () {
    return {
      form:{
        name: '',
        email: '',
        password: '',
        rol: ''
      },
      roles: []
    }
  },
  mounted () {
    this.getRoles()
  },
  methods: {
    displayModal () {
      this.$refs['addUser'].toggle()
    },
    getRoles () {
      const data = {
        route: 'admin/roles',
      }

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.roles = res.roles
        }
      })
      .catch((err) => {
        console.log('error', err)
      }) 
    },
    addUser () {

      const data = {
        route: 'admin/gamer',
        params: {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          rol: this.form.rol
        }
      }

      MainService.post(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.$swal('OK', 'registrado','success')
          this.displayModal()
          this.$emit("addAccount", true)
          this.form = {}
        }
      })
      .catch((err) => {
        console.log('error', err)
      })       
    }
  }
}
</script>
<style>
@import url('../../../assets/css/Forms.css');

</style>
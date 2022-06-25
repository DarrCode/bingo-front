<template>
	<div>
		<div
      class="alert alert-danger"
      v-if="form.error"
    >
      {{ form.error }}
    </div>

		<div
      class="alert alert-success"
      v-if="form.success"
    >
      {{ form.success }}
    </div>

		<b-form @submit.prevent="submitHandler">
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
				<label class="form-label">Confirmar contraseña.</label>
				<b-form-input
					type="password"
					v-model="form.password_confirmation"
					placeholder="********"
					required
				></b-form-input>
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
	</div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
	data() {
		return {
			form: {
				name: '',
				email: '',
				password: '',
				password_confirmation: '',

				error: null,
				success: null
			},
		}
	},
	methods: {
		 submitHandler() {
				this.form.error = null

        const data = {
					route: '/signup',
					params: {
						name: this.form.name,
						email: this.form.email,
          	password: this.form.password,
						password_confirmation: this.form.password_confirmation
					}
				}
     		MainService.post(data)
      		.then((response) => {
        		const res = response.data

						if (res.success) {
								console.log(res);
								this.form.success = res.message
								setTimeout(() => {
									window.location.replace('/')
								}, 2000);
						} else if (!res.success) {
							if (res.error.email) {
								this.form.error = res.error.email[0]
							} 
							if (res.error.password) {
									this.form.error = res.error.password[0]
							}
						} 
					})
					.catch((e) => {
						console.log('error: ', e)
					})
      },
	}
}
</script>

<style>
	@import url('../../../assets/css/Forms.css');
</style>
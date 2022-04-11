<template>
  <b-form >
    <div class="mb-3">
			<label class="form-label">Nombre:</label>
			<b-form-input
				v-model="form.name"
				type="text"
				placeholder="bingo"
				required
			></b-form-input>
  	</div>
		
    <div class="mb-3">
			<label class="form-label">Correo electrónico:</label>
			<b-form-input
				v-model="form.email"
				type="email"
				placeholder="bingo@royalty.com"
				required
			></b-form-input>
  	</div>

		<div class="mb-3">
			<label class="form-label">Contraseña:</label>
			<b-form-input
				type="password"
				v-model="form.password"
				placeholder="********"
				required
			></b-form-input>
  	</div>
    <div class="mb-3">
			<label class="form-label">Confirmar contraseña:</label>
			<b-form-input
				type="password"
				v-model="form.password_confirm"
				placeholder="********"
				required
			></b-form-input>
  	</div>
		<div class="text-center">
			<b-button type="submit" class="btn-auth">BINGO</b-button>
		</div>
  </b-form>
</template>
<script>
export default {
	data() {
		return {
			form: {
				name: '',
				email: '',
				password: '',
				password_confirm: ''
			},
		}
	},
	methods: {
		 /*submitHandler() {
        this.form.button.disabled = true
				this.form.button.innerText = this.form.button.onEvent
				this.form.error = null

        const data = {
					route: '/login',
					params: {
						email: this.form.email,
          	password: this.form.password,
					}
				}
     		MainService.post(data)
      		.then((response) => {
        		console.log('aqui');
						const res = response.data
						if (res.statusCode === 0) {
							console.log(res);
						}
					})
					.catch((e) => {
						console.log(e)
					})
					.then(() => {
						console.log('ok');
					})
      },*/
	}
}
</script>

<style>
	@import url('../../../assets/css/FormsAuth.css');
</style>
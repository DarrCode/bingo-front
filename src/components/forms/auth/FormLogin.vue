<template>
	<div>
		<div
      class="alert alert-danger"
      v-if="form.error"
    >
      {{ form.error }}
    </div>

		<b-form @submit.prevent="submitHandler">
			<label class="mb-1">Correo electrónico:</label>		
			<b-form-input
					v-model="form.email"
					type="email"
					class="mb-3"
					placeholder="bingo@royalty.com"
			></b-form-input>

			<div class="mb-3">
				<label class="form-label">Contraseña:</label>
				<b-form-input
					type="password"
					v-model="form.password"
					placeholder="********"
					required
				></b-form-input>
				<div class="form-text text-end">
					<router-link to="/forgot-password" class="forgot" >¿Olvidaste tu contraseña?</router-link>
				</div>
			</div>
			<div class="text-center">
				<button 
					type="submit" 
					class="btn btn-bingo"
					:disabled="form.button.disabled"
					v-html="form.button.innerText"
					>
					BINGO
				</button>
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
          email: '',
          password: '',
					error: null,
					button: {
						disabled: false,
						innerText: 'Iniciar sesión',
						original: 'Iniciar sesión',
						onEvent: 'Iniciando sesión'
					}
        },
        forgotPass: true
      }
    },
    methods: {
      submitHandler() {
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
						const res = response.data
						
						if (res.statusCode === 1) {
							this.form.error = res.message
							this.form.button.disabled = false
							this.form.button.innerText = this.form.button.original
						} else if (res.statusCode === 3) {
							this.form.error = 'Ya existe una sesión activa, para poder ingresar nuevamente haz click en el botón (Ingresar) que fue enviando a tú correo: '+this.form.email
							this.form.button.disabled = false
							this.form.button.innerText = this.form.button.original
						} else if (res.statusCode === 0) {
							this.$session.start()
              this.$session.set('access_token', res.accessToken)
							this.$session.set('token_type', res.tokenType)
							this.$session.set('expires_at', res.expiresAt)
							
							window.location.href = '/home'
						}
						
					})
					.catch((e) => {
						console.error('Server error', e)
						this.form.button.disabled = false
						this.form.button.innerText = this.form.button.original
					})
      },
    }
}
</script>

<style>
	@import url('../../../assets/css/Forms.css');

	.forgot {
		cursor: pointer;
		color: #c62f3a;
		text-decoration: none;
	}
</style>
<template>
  <b-form  @submit.prevent="submitHandler">
		<div
      class="alert alert-danger"
      v-if="form.error"
    >
      {{ form.error }}
    </div>
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
				<a class="forgot" @click="changeToForgot">¿Olvidaste tu contraseña?</a>
			</div>
  	</div>
		<div class="text-center">
			<b-button 
				type="submit" 
				class="btn-auth"
				:disabled="form.button.disabled"
        v-html="form.button.innerText"
				>
				BINGO
			</b-button>
		</div>
  </b-form>
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
			changeToForgot() {
				this.$emit("changeToForgot", this.forgotPass);
			},
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
				window.location.href = '/'
     		MainService.post(data)
      		.then((response) => {
						const res = response.data
						// this.$session.set('access_token', res.accessToken)
						// this.$session.set('token_type', res.tokenType)
						// this.$session.set('expires_at', res.expiresAt)
						
					})
					.catch((e) => {
						console.log(e)
					})
      },
    }
}
</script>

<style>
	@import url('../../../assets/css/FormsAuth.css');

	.forgot {
		cursor: pointer;
		color: #c62f3a;
		text-decoration: none;
	}
</style>
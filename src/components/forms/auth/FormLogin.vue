<template>
  <b-form  @submit="onSubmit" @reset="onReset" v-if="show">
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
				<a class="forgot" to="">¿Olvidaste tu contraseña?</a>
			</div>
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
          email: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
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
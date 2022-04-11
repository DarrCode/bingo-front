<template>
  <b-form  @submit="onSubmit" >
	 <div class="mb-3">
			<label class="form-label">Correo electrónico:</label>
			<b-form-input
				v-model="form.email"
				type="email"
				placeholder="bingo@royalty.com"
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
          email: '',
        },
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
</style>
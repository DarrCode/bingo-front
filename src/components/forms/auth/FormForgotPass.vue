<template>
  <b-form @submit.prevent="sendEmail" >
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
			<b-button type="submit" class="btn-bingo">BINGO</b-button>
		</div>
  </b-form>
</template>
<script>
export default {
	data() {
      return {
        form: {
          email: '',
          error: false
        },
      }
    },
    methods: {
      sendEmail() {
        const data = {
					route: '/reset-password',
					params: {
						email: this.form.email,
					}
				}
			
     		MainService.post(data)
      		.then((response) => {
            console.log(response.data)
        }, error => {
            console.error(error)
        })
      },
    }
}
</script>

<style>
	@import url('../../../assets/css/Forms.css');
</style>
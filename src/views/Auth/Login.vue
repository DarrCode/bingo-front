<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="12" md="6">
        <b-card class="card-auth mt-5" >
          <b-card-text>
            <h1 class="text-center mb-4 title-auth">BINGO - ROYALTY</h1>
            <FormLogin />
            <div class="text-center mt-3 link-auth">
              ¿No tienes una cuenta? <router-link to="/register" style="color: #c62f3a">Regístrate</router-link>
            </div>
					</b-card-text>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
  export default {
    components: {
      FormLogin: () => import('@/components/forms/auth/FormLogin'),
    },
    mounted () {
      this.$session.destroy()
    }
  }
</script>
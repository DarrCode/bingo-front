<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="12" md="6">
        <b-card class="card-auth mt-5" >
          <b-card-text>
            <h1 class="text-center mb-3 title-auth">BINGO ROYALTY</h1>
            <h3 class="text-center text-white">Recupera tu cuenta</h3>
            <h6 class="text-center text-white mb-4">Ingresa tu correo electrónico para buscar tu cuenta.</h6>
            <FormForgotPass />
             <div class="text-center mt-3 link-auth">
              <router-link to="/login">Inicia sesión</router-link>
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
      FormForgotPass: () => import('@/components/forms/auth/FormForgotPass')
    }
  }
</script>
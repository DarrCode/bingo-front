<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="6">
        <b-card class="card-auth mt-5" >
          <b-card-text>
            <h1 class="text-center mb-4 title-auth">BINGO ROYALTY</h1>
            
            <FormLogin v-if="loginActive"/>
            <FormRegister v-if="!loginActive"/>

            <div v-if="loginActive" class="text-center mt-3 text-register">
              <a @click="changeAuth()">¿No tienes una cuenta? Regístrate</a>
            </div>
            <div v-if="!loginActive" class="text-center mt-3 text-register">
              <a @click="changeAuth()">Ya tienes una cuenta? Inicia sesion</a>
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
      FormRegister: () => import('@/components/forms/auth/FormRegister')
    },
    data () {
      return {
        loginActive: true
      }
    },
    mounted() {
      this.loginActive = true
    },
    methods: {
      changeAuth() {
        this.loginActive = !this.loginActive
      }
    }  
  }
</script>

<style>
.card-auth{
  background-color: transparent;
  border: 2px solid #66623f;
  border-radius: 0px;
  padding: 15px;
}
.title-auth {
  color: #c62f3a;
  border-top: 1.5px solid #66623f;
	border-bottom: 1.5px solid #66623f;
  -moz-border-image: -moz-linear-gradient(to right, #000000, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #000000);
  -webkit-border-image: -webkit-linear-gradient(to right, #000000, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #000000);
  border-image: linear-gradient(to right, #000000, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #66623F, #000000);
  border-image-slice: 1;
	letter-spacing: 4px;
}

.text-register {
  cursor: pointer;
  color: #949494;
}

.text-register:hover {
  text-decoration: underline;
}
</style>
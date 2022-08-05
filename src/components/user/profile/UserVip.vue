<template>
  <b-modal
<<<<<<< HEAD
      ref="user-vip"
      centered
      hide-footer
      content-class="shadow"
      size="lg"
      class="p-0"
    >
      <template #modal-title>
        Conviertete en usuario <span class="text-vip">VIP</span>
      </template>
      <b-container>
        <b-row>
          <div class="alert alert-warning" v-html="message"></div>
          <h4 class="text-center">Beneficios <span class="text-vip">VIP</span></h4>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Beneficio 1</li>
            <li class="list-group-item">Beneficio 2</li>
            <li class="list-group-item">Beneficio 3</li>
            <li class="list-group-item">Beneficio 4</li>
            <li class="list-group-item">Beneficio 5</li>
          </ul>
          <center>
            <button
              :disabled="disableBtn"
              class="btn btn-bingo mt-2 w-50"
              @click="userVip"
            >
              USUARIO VIP
            </button>
          </center>
        </b-row>
      </b-container>
    </b-modal>
    <!--b-modal
      ref="showDataAccount"
      centered
      hide-footer
      content-class="shadow"
      class="p-0"
      size="md"
    >
        <template #modal-title>
          Datos de la cuenta a transferir - <span class="text-red">{{account.type_account}}</span>
        </template>
        <b-container>
          <ul>
            <li>
              <b>Monto:</b> 100
            </li>
          </ul>
          <ul v-for="(attribute, index) of attributes" :key="index">
            <li :class="!attribute.email ? 'list-style' : ''">
              <span v-if="attribute.email">
                <b>Correo:</b> {{attribute.email}}
              </span>
            </li>
            <li :class="!attribute.direction ? 'list-style' : ''">
              <span v-if="attribute.direction">
                <b>Direccion:</b> {{attribute.direction}}
              </span>
            </li>
            <li :class="!attribute.wallet ? 'list-style' : ''">
              <span v-if="attribute.wallet">
                <b>Wallet:</b> {{attribute.wallet}}
              </span>
            </li>
            <li :class="!attribute.code_bank ? 'list-style' : ''">
              <span v-if="attribute.code_bank">
                <b>Banco:</b> {{attribute.code_bank}}
              </span>
            </li>
            <li :class="!attribute.cedula ? 'list-style' : ''">
              <span v-if="attribute.cedula">
                <b>cedula:</b> {{attribute.cedula}}
              </span>
            </li>
            <li :class="!attribute.phone ? 'list-style' : ''">
              <span v-if="attribute.phone">
                <b>phone:</b> {{attribute.phone}}
              </span>
            </li>
          </ul>
        </b-container>
    </!--b-modal-->
  </div>
=======
    ref="user-vip"
    centered
    hide-footer
    content-class="shadow"
    size="lg"
    class="p-0"
  >
    <template #modal-title>
      Conviertete en usuario <span class="text-vip">VIP</span>
    </template>
    <b-container>
      <b-row>
        <div class="alert alert-warning" v-html="message"></div>
        <h4 class="text-center">Beneficios <span class="text-vip">VIP</span></h4>
        <ul class="list-group list-group-flush">
          <li 
            v-for="(benefit, index) of benefits"
            :key="index"
            class="list-group-item"
          >
            {{ benefit.text }}
          </li>
        </ul>
        <center>
          <button
            :disabled="disableBtn"
            class="btn btn-bingo mt-2 w-50"
            @click="userVip"
          >
            USUARIO VIP
          </button>
        </center>
      </b-row>
    </b-container>
  </b-modal>
>>>>>>> 2e40b69bb81c6803700fff86c60888e498e0a183
</template>

<script>
import MainService from '@/services/MainService'

export default {
  data () {
    return {
      benefits: [
        { text: 'Generar Cartones manual' },
        { text: 'Listar cantidad de jugadas (ganadas, perdidas)' },
        { text: 'Cartones ganadores' },
        { text: 'Contacto a soporte' },
      ],
      balanceWallet: null,
      message: '',
      valueUserVip: null,
      disableBtn: false
    }
  },

  methods: {
    userVipInfo () { 
      this.$refs['user-vip'].toggle()

      const data = {
        route: '/prices',
      }
      
      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.valueUserVip = res.listPrice[2].amount
            
            this.message = `Para convertirte en usuario <b>VIP</b> tu balance debe ser de <b>${this.valueUserVip} Royalty</b>`
            this.balanceWallet = this.$store.state.user.wallet.balance
     
            if (this.balanceWallet < this.valueUserVip) {
              this.disableBtn = true
            }
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    userVip () {
      const data = {
        route: 'user/profile/user-vip',
      }
      
      MainService.put(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.$swal({
              icon: 'success',
              title: 'Usuario VIP', 
              html: "Felicidades ya eres miembro  <span class='text-vip'>VIP</span> de <b class='text-danger'>BINGO ROYALTY</b>"
            })
            this.$refs['user-vip'].toggle()
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }
}
</script>
<style>
.list-style {
  list-style: none;
}
</style>

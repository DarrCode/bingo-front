<template>
  <b-modal
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

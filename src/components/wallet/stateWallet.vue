<template>
  <b-card class="card-bingo">
    <div class="text-center">
      <h3 class="card-title">Wallet</h3>
      <h4>
        <b>Balance: </b>
        <i>{{ wallet.balance }}</i>
      </h4>
    </div>
  </b-card>
</template>
<script>
import MainService from '@/services/MainService'

export default {

  props: {
    updateBalance: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      wallet: {}
    }
  },
  mounted () {
    this.getWallet()
  },
  watch: { 
    updateBalance:  function(sendBalance) { 
      if (sendBalance) {
        this.getWallet()
      }
    }
  },
  methods: {
    getWallet () {
      const data = {
        route: 'user/wallet',
      }

      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.wallet = res.wallet
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }
}
</script>
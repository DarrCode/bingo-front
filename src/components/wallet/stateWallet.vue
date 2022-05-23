<template>
  <b-card class="card-bingo">
    <div class="text-center">
      <h3 class="card-title">Wallet</h3>
      <h4>
        <b>Balance: </b>
        <i>{{ wallet.balance }}</i> &nbsp;
        <button v-if="updateBalance" @click="refreshWallet" class="btn btn-sm btn-outline-primary">
          <b-icon-arrow-clockwise></b-icon-arrow-clockwise>
        </button>
      </h4>
    </div>
  </b-card>
</template>
<script>
import MainService from '@/services/MainService'

export default {
  data () {
    return {
      wallet: {}
    }
  },
  props: ['updateBalance'],
  mounted () {
    this.getWallet()
  },
  methods: {
    refreshWallet () {
      if (this.updateBalance) {
        this.getWallet()
      }
    },
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
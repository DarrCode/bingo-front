<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols="12" md="4">
        <StateWallet class="mb-4" :updateBalance="updateBalance"/>
        <TransferBalance class="mb-4" @refreshBalance="refreshBalance" />
      </b-col>
      <b-col cols="12" md="5">
        <PaymentRequest />
      </b-col>
    </b-row>
    
  </b-container>
</template>
<script>

export default {
  components: {
    StateWallet:     () => import('@/components/wallet/stateWallet'),
    RechargeWallet:  () => import('@/components/wallet/rechargeWallet'),
    TransferBalance: () => import('@/components/wallet/transferBalance'),
    PaymentRequest: () => import('@/components/wallet/paymentRequest'),
  },
  data () {
    return {
      updateBalance: false
    }
  },
  methods: {
    refreshBalance (data) {
      this.updateBalance = data
    }
  }
}
</script>
<style >
.card-bingo {
  border-radius: 0.5em;
  border: 2px solid var(--gold);
  background-color: rgb(8, 8, 8);
  font-size: 20px;
  color: #949494;
}
</style>

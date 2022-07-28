<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols="12" md="3">
        <StateWallet class="mb-4" :updateBalance="updateBalance"/>
        <TransferBalance class="mb-4" @refreshBalance="refreshBalance" />
      </b-col>
       <b-col cols="12" md="5">
        <RechargeWallet class="mb-4"/>
      </b-col>
      <b-col cols="12" md="4">
        <PaymentRequest />
      </b-col>
    </b-row>
    
  </b-container>
</template>
<script>

export default {
  components: {
    StateWallet:     () => import('@/components/user/wallet/stateWallet'),
    RechargeWallet:  () => import('@/components/user/wallet/rechargeWallet'),
    TransferBalance: () => import('@/components/user/wallet/transferBalance'),
    PaymentRequest:  () => import('@/components/user/wallet/paymentRequest')
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

<template>
  <div>
    <div class="card card-profile p-0">
      <div class="card-body">
        <h3 class="card-title text-center">
          Cuentas: 
          <span class="float-end">
            <button 
              @click="addAccount"
              class="btn btn-small btn-outline-primary"
            >
              Agregar
            </button>
          </span>
        </h3>
        <ul class="list-group list-group-flush" v-if="accounts.length">
          <li class="list-group-item" v-for="(account, index) of accounts" :key="index">
            <span class="float-start">
              {{ account.name }}
            </span>
            <span class="float-end">
              <button class="btn btn-small btn-outline-warning">editar</button>
              <button class="btn btn-small btn-outline-success mx-2">activar</button>
              <button class="btn btn-small btn-outline-danger">eliminar</button>
            </span>
          </li>
        </ul>
        <div v-else>
          <h5 class="text-center my-3">No tienes cuentas registrada.</h5>
        </div>
      </div>
    </div>
    <AddAccount ref="add-account" />
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  components: {
    AddAccount:  () => import('@/components/profile/accounts/resources/Add'),
  },
  data () {
    return {
      accounts: []
    }
  },
  mounted() {
    this.index()
  },
  methods: {
    index () {
      const data = {
        route: '/user/profile/accounts',
      }

      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.accounts = res.accounts
            console.log(this.accounts)
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    addAccount () {
      this.$refs['add-account'].displayModal()
    }
  }
}
</script>
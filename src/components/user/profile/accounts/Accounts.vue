<template>
  <div>
    <div class="card card-profile p-0">
      <div class="card-body">
        <h3 class="card-title text-center">
          Cuentas: 
          <span class="float-end">
            <button 
              @click="modalAddAccount"
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
              &nbsp; - &nbsp;
              {{ account.type_account }}
            </span>
            <span class="float-end">
              <button 
                @click="modalEditAccount(account)"
                class="btn btn-small btn-outline-warning" 
                title="Editar"
              >
                <b-icon-pencil></b-icon-pencil>
              </button>
              <button 
                class="btn btn-small mx-2" 
                :class="account.is_active ? 'btn-success' : 'btn-outline-success'"
                @click="activeAccount(account.id)"
                :title="account.is_active ? 'Desactivar' : 'Activar'"
              >
                 <b-icon-check2-square></b-icon-check2-square>
              </button>
              <button 
                @click="deleteAccount(account.id)"
                class="btn btn-small btn-outline-danger"
                title="Eliminar"
              >
                <b-icon-trash></b-icon-trash>
              </button>
            </span>
          </li>
        </ul>
        <div v-else>
          <h5 class="text-center my-3">No tienes cuentas registrada.</h5>
        </div>
      </div>
    </div>
    <AddAccount ref="add-account" @addAccount="eventAddAccount"/>
    <EditAccount ref="edit-account" @editAccount="eventEditAccount"/>
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  components: {
    AddAccount:  () => import('@/components/user/profile/accounts/resources/Add'),
    EditAccount:  () => import('@/components/user/profile/accounts/resources/Edit'),
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
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    activeAccount (id) {
      const data = {
        route: `/user/profile/accounts/active/${id}`,
        params: {
          is_active: true
        }
      }
      MainService.put(data)
      .then(() => {
        this.$swal('Ok', 'Cuenta actualizada', 'success')
        this.index()
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
    deleteAccount (id) {
      this.$swal({
          title: 'Alto!',
          text: 'No podras revertir esta acción',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: "#c62f3a",
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            const data = {
              route: `/user/profile/accounts/${id}`,
            }
            MainService.delete(data)
            .then((res) => {
              this.$swal('Eliminado', `${res.data.message}`, 'success')
              this.index()
            })
            .catch((err) => {
              console.log('error', err)
            })
           
          }
        })
    },
    eventAddAccount(ok) {
      if (ok) {
        this.index()
      }
    },
    modalAddAccount () {
      this.$refs['add-account'].displayModal()
    },
    eventEditAccount(ok) {
      if (ok) {
        this.index()
      }
    },
    modalEditAccount (account) {
      this.$refs['edit-account'].displayModal(account)
    }
  }
}
</script>
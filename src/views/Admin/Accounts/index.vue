<template>
  <div>
    <b-container>
      <b-row class="mt-3">
        <b-col cols="12" xl="8">
          <vue-good-table
            :columns="columns"
            :rows="rows"
            theme="nocturnal"
            styleClass="vgt-table striped"
            :search-options="{
              enabled: true
            }"
            :pagination-options="{
              enabled: true,
              mode: 'pages',
              perPage: 5,
            }"
          >
          <div slot="table-actions">
            <button 
              @click="modalAddAccount"
              class="btn btn-primary mx-2"
            >
              Agregar cuenta
            </button> 
          </div>
          <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'actions'">
                <button
                  @click="modalEditAccount(props.row)"
                  class="btn btn-small btn-warning text-white" 
                  title="Editar"
                >
                  <b-icon-pencil></b-icon-pencil>
                </button>
                <button 
                  class="btn btn-small mx-2 my-2" 
                  :class="props.row.is_active ? 'btn-success' : 'btn-outline-success'"
                  @click="activeAccount(props.row.id)"
                  :title="props.row.is_active ? 'Desactivar' : 'Activar'"
                >
                  <b-icon-check2-square></b-icon-check2-square>
                </button>
                  <button @click="deleteAccount(props.row.id)" class="btn btn-danger"> 
                  <b-icon icon="trash-fill"></b-icon>
                </button>
              </span>
              <span v-else>
                {{props.formattedRow[props.column.field]}}
              </span>
            </template>
          </vue-good-table>
        </b-col>
        <b-col cols="12" md="6"></b-col>
      </b-row>
    </b-container>
    <AddAccount ref="add-account" @addAccount="eventAddAccount"/>
    <EditAccount ref="edit-account" @editAccount="eventEditAccount"/>
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  components: {
    AddAccount:  () => import('@/components/admin/accounts/Add'),
    EditAccount: () => import('@/components/admin/accounts/Edit'),
  },
  data () {
    return {
      columns: [
        {
          label: 'ID',
          field: 'id'
        },
        {
          label: 'Nombre',
          field: 'name',
        },
        {
          label: 'tipo de cuenta',
          field: 'type_account',
        },
        {
          label: 'Estado',
          field: 'is_active',
          formatFn: this.formatBoolean,
        },
        {
          label: 'registro',
          field: 'created_at',
          type: 'date',
          dateInputFormat: 'yyyy-mm-dd',
          dateOutputFormat: 'dd/mm/yyyy',
        },
        {
          label: 'Accion',
          field: 'actions',
          tdClass: 'text-center'
        },
      ],
      rows: [],
    }
  },
  mounted () {
    this.getAccounts()
  },
  methods: {
    formatBoolean(value) {
      if (value) {
        return 'activo'
      } else {
        return 'inactivo'
      }
    },
    getAccounts () {
      const data = {
        route: '/admin/accounts',
      }

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.rows = res.accounts
          console.log(this.rows);
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
    eventAddAccount(ok) {
      if (ok) {
        this.getAccounts()
      }
    },
    eventEditAccount(ok) {
      if (ok) {
        this.getAccounts()
      }
    },
    modalAddAccount () {
      this.$refs['add-account'].displayModal()
    },
    modalEditAccount (id) {
      this.$refs['edit-account'].displayModal(id)
    },
    activeAccount (id) {
      const data = {
        route: `/admin/account/active/${id}`
      }
      MainService.put(data)
      .then(() => {
        this.$swal('Ok', 'Cuenta actualizada', 'success')
        this.getAccounts()
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
            route: `/admin/account/${id}`,
          }
          MainService.delete(data)
          .then((res) => {
            this.$swal('Eliminado', `${res.data.message}`, 'success')
            this.getAccounts()
          })
          .catch((err) => {
            console.log('error', err)
          })
        }
      })
    },
  }
}
</script>
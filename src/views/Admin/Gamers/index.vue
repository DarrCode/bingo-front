<template>
  <div>
    <b-container>
      <b-row class="mt-3">
        <b-col cols="12" xl="8">
          <div>
            <vue-good-table
              :columns="columns"
              :rows="rows"
              theme="nocturnal"
              styleClass="vgt-table striped"
              :fixed-header="true"
              :search-options="{
                enabled: true
              }"
              :pagination-options="{
                enabled: true,
                mode: 'pages',
              }"
            >
            <div slot="table-actions">
              <button 
                @click="addUser"
                class="btn btn-primary mx-2"
              >
                Crear usuario
              </button> 
            </div>
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'actions'">
                  <button 
                    class="btn btn-small btn-primary" 
                    @click="modalShowUser(props.row.id)"
                    title="Mas detalles"
                  >
                    <b-icon-eye></b-icon-eye>
                  </button>

                  <button 
                    class="btn btn-small mx-2 my-2" 
                    :class="props.row.is_active ? 'btn-success' : 'btn-outline-success'"
                    @click="deactiveUser(props.row.id)"
                    :title="props.row.is_active ? 'Desactivar' : 'Activar'"
                  >
                    <b-icon-check2-square></b-icon-check2-square>
                  </button>
                  <button class="btn btn-small btn-warning text-white" title="Editar">
                    <b-icon-pencil></b-icon-pencil>
                  </button>
                </span>
                <span v-else>
                  {{props.formattedRow[props.column.field]}}
                </span>
              </template>
            </vue-good-table>
          </div>
        </b-col>
        <b-col cols="12" md="6"></b-col>
      </b-row>
    </b-container>
    <AddUser ref="add-user" @addUser="eventAddUser"/>
    <ShowUser ref="show-user" />
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  components: {
    AddUser:  () => import('@/components/admin/gamers/Add'),
    ShowUser: () => import('@/components/admin/gamers/Show'),
  },
  data(){
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Correo',
          field: 'email',
        },
        {
          label: 'VIP',
          field: 'vip',
          formatFn: this.formatBoolean
        },
        {
          label: 'Activo',
          field: 'is_active',
          formatFn: this.formatBoolean
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
    };
  },
  mounted () {
    this.getGamers();
  },
  methods: {
    formatBoolean(value) {
      if (value) {
        return 'activo'
      } else {
        return 'inactivo'
      }
    },
    getGamers () {
      const data = {
        route: 'admin/gamers',
      }

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.rows = res.gamers
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
    eventAddUser(ok) {
      if (ok) {
        this.getGamers()
      }
    },
    addUser () {
      this.$refs['add-user'].displayModal()
    },
    modalShowUser (id) {
      this.$refs['show-user'].show(id)
    },
    deactiveUser (id) {
      const data = {
        route: `/admin/deactive/gamer/${id}`,
        params: {
          is_active: false
        }
      }
      MainService.put(data)
      .then((res) => {
        this.$swal('Ok', 'Usuario desactivado', 'success')
        this.getGamers()
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
  }
};
</script>
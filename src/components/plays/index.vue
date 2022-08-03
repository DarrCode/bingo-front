<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12">
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
              <b-link class="btn btn-primary mx-2" to="crear-sala">Crear sala</b-link>
            </div>
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'actions'">
                  <button
                    class="btn btn-sm btn-bingo"
                    :title="props.row.status === 'creada' ? 'Iniciar' : ''"
                    @click="starPlay(props.row.id)"
                    :disabled="props.row.status === 'en progreso' || props.row.status === 'finalizada'"
                  >
                    <span v-if="props.row.status === 'en progreso'">En progreso </span>
                    <span v-else-if="props.row.status === 'creada'">Iniciar </span>
                    <span v-else-if="props.row.status === 'finalizada'">Finalizada </span>
                    <b-icon-play-btn></b-icon-play-btn>
                  </button>
                  <button 
                    class="btn btn-sm btn-primary mx-2" 
                    title="Mas detalles"
                  >
                    <b-icon-eye></b-icon-eye>
                  </button>

                  <button 
                    class="btn btn-sm btn-warning text-white" 
                    title="Editar" 
                    :disabled="props.row.status === 'en progreso' || props.row.status === 'finalizada'"
                    v-if="$store.state.user.role_id == 1 || $store.state.user.role_id == 2 || $store.state.user.role_id == 5"
                  >
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
      </b-row>
    </b-container>
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  components: {
    // AddUser:  () => import('@/components/admin/gamers/Add'),
    // ShowUser: () => import('@/components/admin/gamers/Show'),
  },
  data(){
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Linea',
          field: 'line_play',
        },
        {
          label: 'Carton lleno',
          field: 'full_cardboard',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Inicia',
          field: 'start',
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
      nextPlay: {}
    };
  },
  mounted () {
    this.getPlays()
    this.showNextPlay()
  },
  methods: {
    starPlay (id) {
      const data = {
        route: `/play-assistant/meeting/${id}/game`,
      }

      MainService.put(data)
      .then((response) => {
        const res = response.data
         console.log(res);
        if (res.statusCode == 0) {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Jugada iniciada con exito!',
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(() => {
            this.$router.push('/jugada')
          }, 3000);
          
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
    getPlays () {
      const data = {
        route: '/play-assistant/meeting',
      }

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.rows = res.meetings
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
    // eventAddUser(ok) {
    //   if (ok) {
    //     this.getGamers()
    //   }
    // },
    // addUser () {
    //   this.$refs['add-user'].displayModal()
    // },
    // modalShowUser (id) {
    //   this.$refs['show-user'].show(id)
    // },
    // deactiveUser (id) {
    //   const data = {
    //     route: `/admin/deactive/gamer/${id}`,
    //     params: {
    //       is_active: false
    //     }
    //   }
    //   MainService.put(data)
    //   .then((res) => {
    //     this.$swal('Ok', 'Usuario desactivado', 'success')
    //     this.getGamers()
    //   })
    //   .catch((err) => {
    //     console.log('error', err)
    //   })
    // },
  }
};
</script>
<style>
.btn-bingo {
  color: var(--gold);
  text-transform: uppercase;
  font-weight: 800;
  border: 2px solid var(--gold);
}

.btn-bingo:hover {
  border: 2px solid rgb(130, 130, 130)!important;
}

.btn-bingo:focus {
  background-color: #141414;
}
</style>
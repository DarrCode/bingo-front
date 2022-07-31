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
                    class="btn btn-sm btn-success"
                    title="Iniciar"
                  >
                    <b-icon-play-btn></b-icon-play-btn>
                  </button>
                  <button 
                    class="btn btn-sm btn-primary mx-2" 
                    title="Mas detalles"
                  >
                    <b-icon-eye></b-icon-eye>
                  </button>

                  <button class="btn btn-small btn-warning text-white" title="Editar" v-if="$store.state.user.role_id == 1 || $store.state.user.role_id == 2 || $store.state.user.role_id == 5">
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
    showNextPlay (id) {
      const data = {
        route: `/play-assistant/meeting/${id}`,
      }

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.$emit("showNextPlay", res.meeting);
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

          this.rows.forEach(element => {
            let nextPlay = element
            if (nextPlay.status !== 'finalizada' && nextPlay.status !== 'en progreso') {
              this.showNextPlay(nextPlay.id)
            }
          });

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
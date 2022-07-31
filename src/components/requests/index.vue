<template>
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
</template>
<script>
import MainService from '@/services/MainService';

export default {
  props: {
    propsListRequest: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      requests: [],
      columns: [
        {
          label: 'Razon',
          field: 'reason',
        },
        {
          label: 'Monto',
          field: 'amount',
        },
        {
          label: 'Estatus',
          field: 'status',
        }
      ],
      rows: [
        { id:1, reason: '', amount: '', status: ''},
      ],
    }
  },
  watch: { 
    propsListRequest:  function(chargeRequest) { 
      if (chargeRequest) {
        this.getListRequest()
      }
    }
  },
  methods: {    
    getListRequest(){      
      const data = {
        route: '/supervisor/requests',
      }

      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.rows = res.result
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    showRequest(){
      console.log(12345978);
    }
  }
}
</script>
<style>
.vgt-table.nocturnal {
  background-color: #21201c!important;
}
</style>
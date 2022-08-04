<template>
    <b-row class="my-3">
      <b-col cols="12">
        <vue-good-table
              :columns="columns"
              :rows="rows"
              styleClass="vgt-table striped"
              theme="nocturnal"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'actions'">
                  <button 
                    class="btn btn-small btn-white" 
                    @click="modalShowPlay(props.row.id, props.row)"
                    title="Mas detalles"
                  >
                    Mas info
                  </button>
                </span>
                <span v-else>
                  {{props.formattedRow[props.column.field]}}
                </span>
              </template>
            </vue-good-table>
      </b-col>
    </b-row>
</template>
<script>
import moment from 'moment'
import tz from 'moment-timezone'
import MainService from '@/services/MainService'

export default {
  data () {
    return {
       columns: [
        {
          label: 'Nombre',
          field: 'name',
          formatFn: this.nameCardboard
        },
        {
          label: 'Premio',
          field: 'accumulated',
        },
        {
          label: 'Cartones x jugador',
          field: 'cardboard_number',
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
          label: 'Accion',
          field: 'actions',
          tdClass: 'text-center'
        },
      ],
      rows: []
    }
  },
  mounted () {
    this.PlaysDay()
  }, 
  methods: {
    PlaysDay () {
      const data = {
				route: '/user/meeting',
        params: {
          to: moment().format('yyyy-MM-DD'),
          from: moment().format('yyyy-MM-DD'),
          timeZone: moment().tz()
        }
			}

			MainService.get(data)
			.then((response) => {
				const res = response.data
				if (res.statusCode == 0) {
					this.rows = res.meeting
          console.log(this.rows);
				}
			})
			.catch((err) => {
				console.log('error', err)
			})
    }
  }
}
</script>
<style>
.list-group-item {
  background-color: #21201c;
  color: #fff;
}
</style>
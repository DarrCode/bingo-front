<template>
  <div>
    <h5 class="title">MIS SOLICITUDES</h5>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      theme="nocturnal"
      :row-style-class="rowStyleClassFn"
      :search-options="{
        enabled: true
      }"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        perPage: 5,
      }"
    >
    </vue-good-table>
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  data () {
    return {
      columns: [
        {
          label: 'Concepto',
          field: 'reason'
        },
        {
          label: 'Monto',
          field: 'amount',
        },
        {
          label: 'Estado',
          field: 'status',
        },
        {
          label: 'Tipo de solicitud',
          field: 'type_request.description',
        },
        {
          label: 'Fecha',
          field: 'created_at',
          type: 'date',
          dateInputFormat: 'yyyy-mm-dd',
          dateOutputFormat: 'dd/mm/yyyy',
        },
        
      ],
      rows: [],
    }
  },
  mounted () {
    this.getRequests()
  },
  methods: {
    rowStyleClassFn(row) {
      if (row.status == 'pendiente') {
         return 'text-pending'
      } else if (row.status == 'aprobado') {
        return 'text-aprove'
      } else {
        return 'text-rejected'
      }
    },
    getRequests () {
      const data = {
        route: '/user/requests',
      }

      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.rows = res.requestUser
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
  }
}
</script>
<style scoped>

.title{
  color: var(--gold);
}

.text-pending td{
  color: #ffc106!important;
}

.text-aprove td{
  color: #198754!important;
}

.text-rejected td{
  color: #dc3545!important;
}
</style>
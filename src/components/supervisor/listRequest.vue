<template>
  <div>
    <vue-good-table
      v-if="this.propsListRequest"
      :columns="columns"
      :rows="rows"
      theme="nocturnal"
      :search-options="{
        enabled: true
      }"
      :select-options="{ 
        enabled: true,
      }"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
      }"
      @on-row-click="showRequest"
    >
      <div slot="selected-row-actions">
        <button>Action 1</button>
        <button>Action 2</button>
      </div>
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
            console.log(this.rows);
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
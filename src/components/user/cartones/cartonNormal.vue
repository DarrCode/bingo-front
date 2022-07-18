<template>
  <div>
    <b-container>
      <b-row class="mt-3">
        <b-col cols="12">
          <div>
            <vue-good-table
              :columns="columns"
              :rows="rows"
              theme="nocturnal"
              :pagination-options="{
                enabled: true,
                mode: 'pages',
                perPage: 5,
              }"
            >
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'actions'">
                  <button 
                    class="btn btn-small btn-primary" 
                    @click="modalShowCardboard(props.row.cardboard)"
                    title="Mas detalles"
                  >
                    Ver cartón
                  </button>
                   <button 
                    class="btn btn-small btn-success ms-0 ms-md-2 mt-1 mt-xl-0" 
                    @click="buyCardboard(props.row.id)"
                    
                    title="Comprar cartón"
                  >
                    Comprar
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
    <ShowCardboard ref="show-cardboard" />
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  components: {
    ShowCardboard: () => import('@/components/user/cartones/showCardboard'),
  },
  data(){
    return {
      columns: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Nombre',
          field: 'serial',
          formatFn: this.nameCardboard
        },
        {
          label: 'Carton',
          field: 'cardboard',
          hidden: true,
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
    this.getCardboards();
  },
  methods: {
    nameCardboard() {
      return 'Bingo Royalty'
    },
    getCardboards () {
      const data = {
        route: 'user/cardboard/group',
      }

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.rows = res.listCardboards
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
    buyCardboard (id) {
      
      this.$swal({
        title: 'Alto!',
        text: 'Seguro que quieres comprar este cartón?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#c62f3a",
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          const data = {
            route: 'user/cardboard/group',
            params: {id}
          }
          MainService.post(data)
          .then((response) => {
            const res = response.data
            if (res.statusCode == 0) {
              this.getCardboards()
            }
          })
          .catch((err) => {
            console.log('error', err)
          })
        }
      })
    },
    modalShowCardboard (cardboard) {
      this.$refs['show-cardboard'].displayModal(cardboard)
    },
  }
};
</script>
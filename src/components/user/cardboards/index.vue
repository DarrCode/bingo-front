<template>
  <div>
    <b-container>
      <b-row class="mt-3">
        <b-col cols="12">
          <div v-if="rows.length">
            <vue-good-table
              :columns="columns"
              :rows="rows"
              styleClass="vgt-table striped"
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
                    class="btn btn-small btn-white" 
                    @click="modalShowCardboard(props.row.cardboard)"
                    title="Mas detalles"
                  >
                    Ver cartón
                  </button>
                   <button 
                    class="btn btn-small btn-bingo ms-2" 
                    @click="buyCardboard(props.row.id)"
                    title="Comprar cartón"
                    :disabled="btnDisable"
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
          <div v-else>
           <h2 class="text-danger text-center">No hay cartones creados</h2>
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
  name: 'CardboardsIndex',
  components: {
    ShowCardboard: () => import('@/components/user/cardboards/showCardboard'),
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
      btnDisable: false
    }
  },
  mounted () {
    this.getCardboards();
    if (this.$store.getters.user.wallet.balance ) {
      
    }
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
              this.$swal({
                title: 'Ey!',
                text: 'Tu compra ha sido exitosa',
                type: 'success',
                confirmButtonColor: "#c62f3a",
                confirmButtonText: 'Confirmar',
              })
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
}
</script>
<style>
.btn-white {
  color: #fff;
  font-weight: 800;
  border: 1.5px solid #fff;
}

.btn-bingo:hover {
  border: 2px solid rgb(130, 130, 130)!important;
}
</style>
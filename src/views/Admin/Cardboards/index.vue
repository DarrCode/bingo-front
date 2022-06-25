<template>
  <div>
    <b-container >
      <b-row class="mt-3">
        <b-col cols="12" md="4">
          <button 
            @click="generateCardboard"
            :disabled="dayElapsed > 0"
            class="btn btn-bingo-red text-white fw-bold mt-4"
          >
            GENERAR CARTONES <small v-if="dayElapsed"> dias restantes ({{dayElapsed}})</small> 
          </button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="12" md="4" v-if="cardboardsGroup">
          <div v-for="(group, index) of cardboardsGroup" :key="index" >
            <h4 class="text-white">
              Cartones
            </h4>
            <h5 class="text-white">
              Fecha de vencimiento: 
              <small class="text-red"> {{ group.expirationDate | moment('DD/MM/YYYY, h:mm:ssa') }}</small>
            </h5>
            <vue-good-table
              :columns="columns"
              :rows="rows"
              theme="nocturnal"
              :search-options="{
                enabled: true
              }"
              :pagination-options="{
                enabled: true,
                mode: 'pages',
              }"
            >
            <!--div slot="table-actions">
              <button 
                @click="modalAddAccount"
                class="btn btn-primary mx-2"
              >
                Agregar cuenta
              </button> 
            </!--div>
            <template-- slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'actions'">
                  <button class="btn btn-small btn-warning text-white" title="Editar">
                    <b-icon-pencil></b-icon-pencil>
                  </button>
                  <button 
                    class="btn btn-small mx-2" 
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
              </template-->
            </vue-good-table>
            <div class="tableFixHead">
              <table class="table table-dark table-striped">
                <thead>
                  <tr>
                    <th class="text-center" width="10">id</th>
                    <th class="text-center">Asignado</th>
                    <th class="text-center">Serial</th>
                    <th class="text-center">Ganador</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cardboard, indexCardboard) of JSON.parse(group.matrices[0].cardboards)" :key="indexCardboard">
                    <td class="text-center">{{cardboard.id}} </td>
                    <td class="text-center" v-if="cardboard.serial">
                      <b-icon icon="check-square-fill" class="text-success"></b-icon>
                    </td>
                    <td class="text-center" v-else>
                      <b-icon icon="x-square-fill" class="text-red"></b-icon>
                    </td>
                    <td class="text-center">
                        {{cardboard.serial}}
                    </td>
                    <td class="text-center" v-if="cardboard.winer">
                      <b-icon icon="check-square-fill" class="text-success"></b-icon>
                    </td>
                    <td class="text-center" v-else>
                      <b-icon icon="x-square-fill" class="text-red"></b-icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="8" v-if="cardboardsVipGroup">
          <h4 class="text-white">Cartones VIP</h4>
          <div v-for="(group, indexVip) of cardboardsVipGroup" :key="indexVip">
           
            <table class="table table-dark table-striped">
              <thead>
                <tr>
                  <th class="text-center">id</th>
                  <th class="text-center">Asignado</th>
                  <th class="text-center">Serial</th>
                  <th class="text-center">Cant. jugadas disponibles</th>
                  <th class="text-center">F. de vencimiento</th>
                  <th class="text-center">Ganador</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cardboard, indexCardboard) of JSON.parse(group.matrices[0].cardboards)" :key="indexCardboard">
                  <td class="text-center">{{cardboard.id}} </td>
                  <td class="text-center" v-if="cardboard.serial">
                    <b-icon icon="check-square-fill" class="text-success"></b-icon>
                  </td>
                  <td class="text-center" v-else>
                    <b-icon icon="x-square-fill" class="text-red"></b-icon>
                  </td>
                  <td class="text-center">
                      {{cardboard.serial}}
                  </td>
                  <td class="text-center"> {{cardboard.numberOfPlays}}</td>
                  <td class="text-center text-red">{{group.expirationDate | moment('DD/MM/YYYY, h:mm:ssa')}}</td>
                  <td class="text-center" v-if="cardboard.winer">
                    <b-icon icon="check-square-fill" class="text-success"></b-icon>
                  </td>
                  <td class="text-center" v-else>
                    <b-icon icon="x-square-fill" class="text-red"></b-icon>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  data(){
    return {
      cardboardsVipGroup: [],
      cardboardsGroup: [],
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
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
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
  mounted() {
    this.getCardboard()
  },
  methods: {
    generateCardboard(){
      const data = {
        route: 'admin/matrices',
      }

      MainService.post(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.getCardboard()
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Cartones creados correctamente',
            showConfirmButton: false,
            timer: 4000
          })
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
    getCardboard(){
      const data = {
        route: 'admin/matrices',
      }

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          const matrices = res.matrices

          this.cardboardsVipGroup = matrices.filter((e) => e.vip == true)
          this.cardboardsGroup = matrices.filter((e) => e.vip == false)
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    }
  }
}
</script>
<style scoped>
.tableFixHead          { overflow: auto; height: 500px; }
.tableFixHead thead th { position: sticky; top: 0; z-index: 1; }

</style>
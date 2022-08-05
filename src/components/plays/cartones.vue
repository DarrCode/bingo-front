<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body text-center">
            <h5>Mis cartones</h5>
            <div class="p-5" v-if="!$store.state.numbersOfPlay.loading">
              <Carousel
                :navigationEnabled="true"
                :perPage="1"
						    :paginationActiveColor="'#ffbb0f'"
                v-if="!$store.state.cardboards.loading">
              >
                <Slide v-for="(matriz, index) in $store.state.cardboards.data" :key="index">
                  <div class="card mb-2 mx-auto card-cartoons">
                    <table class="bingoBoard" cellspacing="10" cellpadding="5">
                      <span :id="`numbers_zone${index}`">
                        <tr :id="`header_area${index}`"></tr>
                        <tr :class="`b_row_${index}`"></tr>
                        <tr :class="`i_row_${index}`"></tr>
                        <tr :class="`n_row_${index}`"></tr>
                        <tr :class="`g_row_${index}`"></tr>
                        <tr :class="`o_row_${index}`"></tr>
                      </span>
                    </table>
                  </div>
                  <div class="text-white text-center" :id="renderCardboard(matriz.cardboard, index)">{{ matriz.serial }}</div>
                </Slide>
              </Carousel>
            <div class="text-center mt-4">
              <button class="btn btn-small btn-success text-white mx-2">Cantar linea</button>
              <button class="btn btn-small btn-success text-white mx-2">Cantar Carton lleno</button>
            </div>
            </div>
            <div class="p-5 " v-else>
              <span>
                <h6>No hay resultados</h6>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  data() {
    return {
      lettersBingo: ['B', 'I', 'N', 'G', 'O']
    }
  },
  components: {
    Carousel,
    Slide
  },
  methods: {
    checkNumber(lyrics, number) {
      const cells   = this.$store.state.numbersOfPlay.numbers
      let classCell = ''

      if (cells.length > 0) {
        for (let i = 0; i < cells.length; i++) {
          // if (cells[i].lyrics === lyrics) {
            if (cells[i].number === number) {
              classCell = 'number-active'
              break
            }
          // }
        }
      }

      return classCell
    },
    transpose(a) {
      return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) {
          return r[c]
        })
      })
    },
    defragArray(matriz) {
      let newMatrix       = []
      let onlyNumbers     = Object.values(matriz)
      let NewOnlyNumbers  = this.transpose(onlyNumbers)

      this.lettersBingo.forEach((lyrics, index) => {
        newMatrix[`${lyrics}`] = NewOnlyNumbers[index]
      })

      return newMatrix
    },
		async renderCardboard (param, index) {
			const json = JSON.parse(param)

			setTimeout(() => {
				let cardboard = document.getElementById(`numbers_zone${index}`)
				let headers   = document.getElementById(`header_area${index}`)

				this.lettersBingo.forEach(lyrics => {
					headers.insertAdjacentHTML('beforeend', `<th>${lyrics}</th>`)
				})

        let matriz = this.defragArray(json)

        Object.entries(matriz).forEach((item) => {
          item[1].forEach((number) => {
            let clase = `${item[0].toLowerCase()}_row_${index}`
            let row   = cardboard.querySelector(`tr.${clase}`)
            row.insertAdjacentHTML('beforeend', `<td class="${this.checkNumber(item[0], number)}">${number}</td>`)
          })
        })

				return index
			}, 500);
		}
  },
  async created() {
    await this.$store.dispatch('getMeetingsInPlay')
    await this.$store.dispatch('getCardboardInPlay')
  }
}
</script>

<style>
@import url('../../assets/css/cardboards.css');
/* Carousel style */

.VueCarousel-wrapper {
  height: 40vh;
}

.VueCarousel-slide {
  position: relative;
  color: #fff;
  font-family: Arial;
  font-size: 15px;
  text-align: center;
  min-height: 100px;
  width: 100px;
}

.VueCarousel-navigation-button {
	color: #ffbb0f !important;
}

.number-active {
  background: darkred;
}

/* End Carousel style*/
</style>
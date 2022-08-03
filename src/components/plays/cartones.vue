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
                        <tr :id="`header_area${index}`" ></tr>
                        <tr :class="`b_area${index}`"></tr>
                        <tr :class="`i_area${index}`"></tr>
                        <tr :class="`n_area${index}`"></tr>
                        <tr :class="`g_area${index}`"></tr>
                        <tr :class="`o_area${index}`"></tr>
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
      lettersBingo: ['B', 'I', 'N', 'G', 'O']
    }
  },
  computed: {
    ...mapState({
      numbersOfPlay: state => state.numbersOfPlay
    })
  },
  watch: {
    '$store.state.numbersOfPlay.numbers': async function (state) { 
      this.cardboards = []
      // await this.getCardboardInPlay()
      // state.loading = false
    }
  },
  components: {
    Carousel,
    Slide
  },
  methods: {
    checkNumber(lyrics, number) {
      const cells   = this.numbersOfPlay.numbers
      let classCell = ''

      if (cells.length > 0) {
        for (let i = 0; i < cells.length; i++) {
          if (cells[i].lyrics === lyrics) {
            if (cells[i].number === number) {
              classCell = 'number-active'
              break
            }
          }
        }
      }

      return classCell
    },
		async renderCardboard (param, index) {
			const json = [JSON.parse(param)]

			setTimeout(() => {
				let cardboard = document.getElementById(`numbers_zone${index}`)
				let headers = document.getElementById(`header_area${index}`)

				this.lettersBingo.forEach(lyrics => {
					headers.insertAdjacentHTML('beforeend', `<th>${lyrics}</th>`)
				})

				json.forEach((element) => {
					this.lettersBingo.forEach(lyrics => {
					  element[lyrics].forEach((number, i) => {
							let clase = `${lyrics.toLowerCase()}_area${index}`    
							let row = cardboard.querySelector(`tr.${clase}`)
              row.insertAdjacentHTML('beforeend', `<td class="${lyrics.toLowerCase()}${i + 1} ${this.checkNumber(lyrics, number)}">${number}</td>`)
						})
					})
				})

				return index
			}, 1000);
		}
  },
  async created() {
    await this.$store.dispatch('getMeetingsInPlay')
    await this.$store.dispatch('getCardboardInPlay')
  }
}
</script>

<style>
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

.card-cartoons {
	background-color: #000;
	border: 4px solid #66623f;
	border-radius: 5px;
	margin: 3px;
}

.card {
  background: #21201c;
  color: #fff;
}

.bingoBoard {
  font-size: 20px;
  background-color: transparent;
	font-family: "Arial", "sans-serif";
}

.bingoBoard tr td, .bingoBoard tr th {
	background-size: 2px 2px;
	padding: 16px;
	border: 1px solid #66623f;
	color: #cdcdcb;
}

.bingoBoard tr th {
	border: none;
	text-align: center;
}

.bingoBoard tr.first_line td {
 	border-top: none;
}

.bingoBoard tr td:nth-child(1) {
 	border-left: none;
}

.bingoBoard tr td:nth-child(5) {
 	border-right: none;
}

.bingoBoard tr td:nth-last-child(n){
	border-bottom: none;
}

.bingoBoard tr th {
  font-weight: 900;
  font-size: 35px;
  color: #949494;
}

.bingoBoard tr td {
  font-weight: bold;
  cursor: pointer;
  -webkit-transition: all 1s;
}
</style>
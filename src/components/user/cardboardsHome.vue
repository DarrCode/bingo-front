<template>
	<div>
		<b-container>
			<div class="row">
				<div class="col col-12 dinamyc-col" v-if="cardboards.length">
					<div class="p-5 " v-if="cardboards.length">
						<Carousel
							:navigationEnabled="true"
							:perPage="3"
							:paginationActiveColor="'#ffbb0f'"
						>
							<Slide class="mx-2" v-for="(matriz, index) in cardboards" :key="index">
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
            		</div>
					<div class="p-5 " v-else>
						<span>
							<h6>No hay resultados</h6>
						</span>
					</div>
				</div>
			</div>
		</b-container>
	</div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import MainService from '@/services/MainService'

export default {
  data() {
    return {
      cardboards: [],
      lettersBingo: ['B', 'I', 'N', 'G', 'O']
    }
  },
  components: {
    Carousel,
    Slide
  },
	created () {
		this.getCarboards()
	},
  methods: {
		getCarboards () {
			const data = {
				route: 'user/cardboards',
			}

			MainService.get(data)
			.then((response) => {
				const res = response.data
				if (res.statusCode == 0) {
					this.cardboards = res.cardboards
				}
			})
			.catch((err) => {
				console.log('error', err)
			})
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
				let cardboard 	= document.getElementById(`numbers_zone${index}`)
				let headers 	= document.getElementById(`header_area${index}`)

				this.lettersBingo.forEach(lyrics => {
					headers.insertAdjacentHTML('beforeend', `<th>${lyrics}</th>`)
				})

        		let matriz = this.defragArray(json)

				Object.entries(matriz).forEach((item) => {
					item[1].forEach((number) => {
						let clase = `${item[0].toLowerCase()}_row_${index}`
						let row   = cardboard.querySelector(`tr.${clase}`)
						row.insertAdjacentHTML('beforeend', `<td class="">${number}</td>`)
					})
				})

				return index
			}, 500);
		}
  }
}
</script>

<style>

.hooper {
  height: 100%;
}
.card-cartoons {
	background-color: #000;
	border: 4px solid #66623f;
	border-radius: 5px;
	margin: 3px;
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

/* End Carousel style*/

.card-cartoons {
	background-color: #000;
	border: 4px solid #66623f;
	border-radius: 5px;
	margin: 3px;
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
</style>
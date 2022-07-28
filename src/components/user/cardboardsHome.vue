<template>
	<div>
		<b-container>
			<div class="row">
				<div class="col col-12 dinamyc-col" v-if="cardboards.length">
					<flickity ref="flickity" :options="flickityOptions">
						<div class="carousel-cell" v-for="(matriz, index) of cardboards" :key="index">
							<div
								style="max-width: 20rem;"
								class="card mb-2 mx-auto card-cartoons"
							>
								<table class="bingoBoard" cellspacing="10" cellpadding="5">
									<span :id="`numbers_zone${index}`">
										<tr :id="`header_area${index}`"></tr>
										<tr :class="`b_area${index}`"></tr>
										<tr :class="`i_area${index}`"></tr>
										<tr :class="`n_area${index}`"></tr>
										<tr :class="`g_area${index}`"></tr>
										<tr :class="`o_area${index}`"></tr>
									</span>
								</table >
							</div>
							<div :id="renderCardboard(matriz.cardboard, index)" class="text-white text-center">{{ matriz.serial }}</div>
						</div>
					</flickity>
				</div>
			</div>
		</b-container>
	</div>
</template>
<script>
import MainService from '@/services/MainService'
import Flickity from 'vue-flickity';
 
export default {
	components: {
    Flickity
  },
	data () {
		return {
			loading: false,
			slide: 0,
			cardboards: [],
			cantCards: null,
			lettersBingo: ['B', 'I', 'N', 'G', 'O'],
			flickityOptions: {
			initialIndex: 1,
			prevNextButtons: true,
			pageDots: false,
			wrapAround: true
      }
		}
	},
	mounted () {
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
					this.cantCards = this.cardboards.length >= 3 ? 3 : this.cardboards.length
				}
			})
			.catch((err) => {
				console.log('error', err)
			})
		},
		async renderCardboard(param, index){
			return await this.cardboard(param, index)
		},
		async cardboard (param, index) {
			const json = [JSON.parse(param)]
			
			// let col = document.getElementsByClassName('dinamyc-col')
			// if (col) {
				
			// }
			setTimeout(() => {
				let cardboard = document.getElementById(`numbers_zone${index}`)
				let headers = document.getElementById(`header_area${index}`)

				this.lettersBingo.forEach(lyrics => {
					headers.insertAdjacentHTML('beforeend', `<th>${lyrics}</th>`)
				})
				json.forEach((element) => {
					this.lettersBingo.forEach(lyrics => {
					element[lyrics].forEach((item, i) => {
							let clase = `${lyrics.toLowerCase()}_area${index}`    
							let row = cardboard.querySelector(`tr.${clase}`)
										row.insertAdjacentHTML('beforeend', `<td class="${lyrics.toLowerCase()}${i + 1} number">${item}</td>`)
						})
					})  
				})
				return index
			}, 1000);
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
</style>
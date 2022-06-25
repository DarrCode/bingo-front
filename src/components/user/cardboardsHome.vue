<template>
	<div>
		<b-container>
			<b-row>
				<b-col v-if="cardboards.length">
					<hooper :itemsToShow="cantCards" :infiniteScroll="true">
						<slide v-for="(matriz, index) of cardboards" :key="index">
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
								</table>
							</div>
							<div 
								:id="renderCardboard(matriz.cardboard, index)"
								class="text-center text-white"
							>
								{{ matriz.serial }}
							</div>
						</slide>
					</hooper>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>
<script>
import MainService from '@/services/MainService'
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
	components: {
    Hooper,
    Slide
  },
	data () {
		return {
			cardboards: [],
			cantCards: null,
			lettersBingo: ['B', 'I', 'N', 'G', 'O']
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
		renderCardboard(param, index){
			setTimeout(() => {
				const json = [param]

				let cardboard = document.getElementById(`numbers_zone${index}`)
				let headers = document.getElementById(`header_area${index}`)
				
				this.lettersBingo.forEach(lyrics => {
					headers.insertAdjacentHTML('beforeend', `<th>${lyrics}</th>`)
				})
				this.$forceUpdate();
				// json.forEach((element) => {
				// 	this.lettersBingo.forEach(lyrics => {
				// 	element[lyrics].forEach((item, i) => {
				// 			let clase = `${lyrics.toLowerCase()}_area${index}`    
				// 			let row = cardboard.querySelector(`tr.${clase}`)
				// 						row.insertAdjacentHTML('beforeend', `<td class="${lyrics.toLowerCase()}${i + 1} number">${item}</td>`)
				// 		})
				// 	})  
				// })
			}, 50 );
			
			return index
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
<template>
	<b-container>
		<div class="row">
			<div class="col col-12 dinamyc-col">
				<div class="p-1" v-if="cardboards.length">
					<Carousel
						:navigationEnabled="true"
						:perPage="3"
						:paginationActiveColor="'#66623f'"
					>
						<Slide class="mx-2" v-for="(matriz, index) in cardboards" :key="index">
							<label><input type="checkbox" @change="setCardboardId($event, matriz)" ><span class="label"></span></label>
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
				</div>
				<div class="p-1" v-else>
					<h3 class="text-vip text-center">No tienes cartones disponibles</h3>
				</div>
			</div>
		</div>
	</b-container>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import MainService from '@/services/MainService'

export default {
  data() {
    return {
      cardboards: [],
      lettersBingo: ['B', 'I', 'N', 'G', 'O'],
			cardboardIdsSelected: []
    }
  },
  components: {
    Carousel,
    Slide
  },
	mounted () {
		this.getCarboards()
	},
  methods: {
		setCardboardId(e, id){
			//let countCardboards = this.cardboards.length
			console.log(e.target.checked, id);
		},
		getCarboards () {
			const data = {
				route: 'user/cardboards',
			}
			MainService.get(data)
			.then((response) => {
				const res = response.data
				if (res.statusCode == 0) {
					this.cardboards = res.cardboards
					if (this.cardboards.length) {
						this.$emit('cardboards', true)
					}
				}
			})
			.catch((err) => {
				console.log('error', err)
			})
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
@import url('../../../assets/css/cardboards.css');
/* Carousel style */

.VueCarousel-wrapper {
    height: 68vh;
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
	color: #66623f !important;
	top: 42%!important;
}

/* End Carousel style*/
input[type=checkbox] {
  display: none;
}
.label {
	width: 27px;
	height: 27px;
  border: 1px solid #000;
  display: inline-block;
  padding: 3px;
  background: url("../../../assets/images/plus-circle-outline.png") no-repeat left center; 
	padding-left: 15px;
}
input[type=checkbox]:checked + .label {
  background-image: url("../../../assets/images/cheque.png");
}
</style>

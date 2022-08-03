<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body text-center">
            <h5>Mis cartones</h5>
            <div class="p-5 " v-if="cardboards.length">
              <Carousel
                :navigationEnabled="true"
                :perPage="1"
						    :paginationActiveColor="'#ffbb0f'"
              >
                <Slide v-for="(matriz, index) in cardboards" :key="index">
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

import MainService from '@/services/MainService';

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
  created() {
    this.getCardboardInPlay()
  },
  methods: {
    getCardboardInPlay() {
      const data = {
        route: '/user/game',
      }

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.cardboards = res.cardboard
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

/* End Carousel style*/
</style>
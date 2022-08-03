<template>
  <div>
		<b-card class="mb-5 card-jugar">
		 	<b-card-text v-if="nextPlay">
				<b-row >
					<b-col>
						<h5 
							
							class="text-uppercase text-vip mt-3" 
							v-html="nextPlay.name"
						></h5>
					</b-col>
					<b-col class="top-right">
						<span class="text-white text-end">Acumulado</span>
						<span class="accumulated text-end color-royal">{{nextPlay.accumulated}}</span>
						<span class="royalty text-end color-royal">Royalty</span>
					</b-col>
				</b-row>
				<b-row class="my-3">
					<b-col>
						<label class="text-center">Cartones</label>
						<b-form-input size="sm" :value="nextPlay.cardboard_number" disabled></b-form-input>
					</b-col>
					<b-col>
						<label class="text-center">Línea</label>
						<b-form-input size="sm" :value="`${nextPlay.line_play} Royalty`" disabled></b-form-input>
					</b-col>
					<b-col>
						<label class="text-center">Cartón lleno</label>
						<b-form-input size="sm" :value="`${nextPlay.full_cardboard} Royalty`" disabled></b-form-input>
					</b-col>
				</b-row>

				<b-button @click="play()" :disabled="dateNow < nextPlay.start" block class="btn-jugar w-100">
					JUGAR 
				</b-button>
			</b-card-text>
		</b-card>
		
		<b-button to="/cartones-jugadas" block>
			<span class="text-button_jugada color-royal">Cartones y Jugadas</span>
			<img src="@/assets/images/jugadas.jpg" width="300" alt="">
		</b-button>
		<b-button to="/perfil" block>
			<span class="text-button_jugada color-royal">Perfil y Seguridad</span>
			<img src="@/assets/images/perfil.jpg" width="300" alt="">
		</b-button>
  </div>    
</template>
<script>
import MainService from '@/services/MainService';
import moment from 'moment'
export default {
	data () {
		return {
			nextPlay: null,
			dateNow: moment().format('YYYY-MM-DD hh:mm:ss'),
			cardboardIdsSelected: []
		}
	},
	created () {
		this.getNextPlay()
	},
	methods: {
		getNextPlay () {
			const data = {
				route: 'user/meeting',
			}

			MainService.get(data)
			.then((response) => {
				const res = response.data
				if (res.statusCode == 0) {
					this.nextPlay = res.meeting
				}
			})
			.catch((err) => {
				console.log('error', err)
			})
    	},
		async play () {
			if (this.cardboardIdsSelected) {
				console.log('tienen datos')
			}

			this.connectMeeting()
				.then((response) => {
					const res = response.data
					if (res.statusCode === 0) {
						this.$swal({
							icon: 'success',
							position: 'top-end',
							title: 'Conectado con exito!',
							showConfirmButton: false,
							timer: 2000
						})
						setTimeout(() => this.$router.push('jugada'), 5000)
					} else {
						const message = this.messageHandler(res.detail)

						this.$swal({
							icon: 'error',
							position: 'top-end',
							title: `${res.message}`,
							text: `${res.detail ? message : 'Mensaje no disponible'}`,
							showConfirmButton: false,
							timer: 2000
						})

						if (message === 'El usuario esta jugando actualmente o los cartones seleccionados no estan disponibles') {
							setTimeout(() => this.$router.push('jugada'), 2000)
						}
					}
				}).catch((err) => {
					console.log('error', err)
				})
		},
		async connectMeeting () {
			const data = {
				route: 'user/meeting',
				params: {
					cardboardIdsSelected: [1, 2]
				}
			}

			return MainService.post(data)
		},
		messageHandler (err) {
			if (err) {
				const object 		= Object.entries(err)
				const messageDetail = object[0][1][0] ? object[0][1][0] : 'Mensaje no disponible'
				const message 		= messageDetail.split(`${object[0][0]}`)[1] ? messageDetail.split(`${object[0][0]}`)[1] : messageDetail
				return message.trim()
			}

			return 'Mensaje no disponible'
		}
	}
}
</script>
<style>

.card-jugar {
	background-color: #151515;
	border: 1px solid #66623f;
}

.card-jugar .card-body {
  padding: 1rem 0.5rem;
}
.card.jugar {
	border:none;
}

.card.jugar .card-body {
  padding: 0;
}

.top-right {
	display: grid;
  top: 18px;
  right: 16px;
}

.top-right span:first-child{
	font-size: 12px;
}

.top-right span:first-child {
	margin-left: 30px;
}

.top-right .royalty {
	margin-top: -9px;
}

.accumulated {
	font-size: 34px;
}

.card-jugar label {
	font-size: 10px;
	color: #817a61;
	display: block;
}

.card-jugar .form-control, .card-jugar .form-control:disabled {
	background-color: #1a181a;
  border-radius: 25px;
  color: #fff;
  border: none;
	font-size: 10px;
  text-align: center;
  padding: 0.1rem 0.5rem;
}

.btn-secondary, .btn-secondary:hover, .btn-secondary:focus {
	background: none;
	border: none;
	box-shadow: none;
}

.text-button_jugada{
	position: absolute;
  margin-top: 38px;
  margin-left: 20px;
	font-size: 20px;
}

.btn-jugar {
	border-radius: 0;
	border-top: 1px solid #66623f;
	border-bottom: 1px solid #66623f;
	transition: all ease-in-out 50ms;
	letter-spacing: 2px;
	color: #c62f3a;
	font-size: 24px;
	font-weight: 600;

}

.btn-jugar:hover {
	border-radius: 0;
	border-top: 2px solid #66623f;
	border-bottom: 2px solid #66623f;
	color: #c62f3a;
}
</style>
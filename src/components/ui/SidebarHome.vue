<template>
  <div>
		<!--b-card class="mb-5 jugar">
		 <img src="../../assets/images/jugar.jpg" alt="Snow" style="width:100%;">
		 <b-card-text>
				<div class="bottom-left">Bottom Left</div>
				<div class="top-right">
					<span class="text-white">Acumulado</span>
					<span class="accumulated color-royal">3.500</span>
					<span class="royalty text-end color-royal">Royalty</span>
				</div>
				<div class="bottom-right">
					
				</div>
				<div class="centered">
					<b-row>
						<b-col>1 of 3</b-col>
						<b-col>2 of 3</b-col>
						<b-col>3 of 3</b-col>
					</b-row>
				</div>
			</b-card-text>
		</b-card-->
		<b-card class="mb-5 card-jugar">
		 	<b-card-text>
				<b-row>
					<b-col>1 of 3</b-col>
					<b-col class="top-right">
						<span class="text-white">Acumulado</span>
						<span class="accumulated text-end color-royal">3.500</span>
						<span class="royalty text-end color-royal">Royalty</span>
					</b-col>
				</b-row>
				<b-row class="my-3">
					<b-col>
						<label class="text-center">Precio del cartón</label>
						<b-form-input size="sm" value="1 Royalty" disabled></b-form-input>
					</b-col>
					<b-col>
						<label class="text-center">Línea</label>
						<b-form-input size="sm" value="120 Royalty" disabled></b-form-input>
					</b-col>
					<b-col>
						<label class="text-center">Cartón lleno</label>
						<b-form-input size="sm" value="2300 Royalty" disabled></b-form-input>
					</b-col>
				</b-row>

				<b-button block class="btn-jugar w-100">
					JUGAR
				</b-button>
				
			</b-card-text>
		</b-card>
		<b-button block>
			<span class="text-button_jugada color-royal">Cartones y Jugadas</span>
			<img src="../../assets/images/jugadas.jpg" width="300" alt="">
		</b-button>
		<b-button block>
			<span class="text-button_jugada color-royal">Perfil y Seguridad</span>
			<img src="../../assets/images/perfil.jpg" width="300" alt="">
		</b-button>
  </div>    
</template>
<script>
export default {
	
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

.top-right span:first-child, span:last-child{
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
	letter-spacing: 4px;
	color: #c62f3a;
	font-size: 20px;
	font-weight: 600;

}

.btn-jugar:hover {
	border-radius: 0;
	border-top: 2px solid #66623f;
	border-bottom: 2px solid #66623f;
	color: #c62f3a;
}
</style>
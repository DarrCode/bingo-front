<template>
  <b-modal
    ref="showCardboard"
    centered
    hide-footer
    content-class="shadow"
    class="p-0"
    size="md"
  >
    <template #modal-title>
      Carton seleccionado
    </template>
    <b-container>
      <b-row>
        <div
          style="max-width: 20rem;"
          class="card mb-2 mx-auto card-cartoons"
        >
          <table class="bingoBoard" cellspacing="10" cellpadding="5">
            <span id="numbers_zone">
              <tr id="header_area"></tr>
              <tr class="b_row"></tr>
              <tr class="i_row"></tr>
              <tr class="n_row"></tr>
              <tr class="g_row"></tr>
              <tr class="o_row"></tr>
            </span>
          </table>
        </div>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
export default {
  data() {
    return {
      lettersBingo: ['B', 'I', 'N', 'G', 'O']
    }
  },
  methods: {
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
    displayModal (param) {
      this.$refs['showCardboard'].toggle()

      setTimeout(() => {
        const json = param

        let cardboard = document.getElementById('numbers_zone')
        let headers   = document.getElementById('header_area')

        this.lettersBingo.forEach(lyrics => {
          headers.insertAdjacentHTML('beforeend', `<th>${lyrics}</th>`)
        })

        let matriz = this.defragArray(json)

				Object.entries(matriz).forEach((item) => {
					item[1].forEach((number) => {
						let clase = `${item[0].toLowerCase()}_row`
						let row   = cardboard.querySelector(`tr.${clase}`)
						row.insertAdjacentHTML('beforeend', `<td class="">${number}</td>`)
					})
				})
      }, 500);
    },
  }
}
</script>

<style>
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
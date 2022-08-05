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
      <h4 class="text-white">Carton seleccionado. Precio {{price}}</h4>
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
  props: {
    price: {
      type: String,
      default: ''
    }
  },
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
@import url('../../../assets/css/cardboards.css');
</style>
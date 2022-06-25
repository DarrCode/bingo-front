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
              <tr class="b_area"></tr>
              <tr class="i_area"></tr>
              <tr class="n_area"></tr>
              <tr class="g_area"></tr>
              <tr class="o_area"></tr>
            </span>
          </table>
        </div>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
export default {
  methods: {
    displayModal (param) {
      this.$refs['showCardboard'].toggle()

      setTimeout(() => {
        const json = [param]
        const letters = ['B', 'I', 'N', 'G', 'O']

        let cardboard = document.getElementById('numbers_zone')
        let headers = document.getElementById('header_area')

        letters.forEach(lyrics => {
          headers.insertAdjacentHTML('beforeend', `<th>${lyrics}</th>`)
        })

        json.forEach((element) => {
          letters.forEach(lyrics => {
          element[lyrics].forEach((item, index) => {
              let clase = `${lyrics.toLowerCase()}_area`    
              let row = cardboard.querySelector(`tr.${clase}`)
                    row.insertAdjacentHTML('beforeend', `<td class="${lyrics.toLowerCase()}${index + 1} number">${item}</td>`)
            })
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
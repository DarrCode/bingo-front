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
@import url('../../../assets/css/cardboards.css');
</style>
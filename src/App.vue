<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.css" />
    <Navbar v-if="$session.exists()" />
    <router-view/>
  </div>
</template>
<script>
export default {
  components: {
    Navbar: () => import('@/components/ui/Navbar'),
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  },
  beforeMount () {
    this.detectedDevice()
  },
  methods: {
    detectedDevice () {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        this.$swal({
          icon: 'warning',
          title: "Consejo",
          text: "Para tener una mejor experiencia gira tu dispositivo",
          showConfirmButton: true,
        })
      }
      else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        this.$swal({
          icon: 'warning',
          title: "Consejo",
          text: "Para tener una mejor experiencia gira tu dispositivo",
          showConfirmButton: true,
        })
      }
    }
  }
}
</script>

<style>
:root {
  --gold: #66623f;
}

input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

body, #app {
  background-color: rgb(4, 4, 4)!important;
}

.btn:focus {
  outline: none!important;
  box-shadow: none!important;
}

.text-red {
  color: #c62f3a!important;
}

.btn-bingo-red {
  background-color: #c62f3a!important;
}

.color-royal {
  color: #817a61;
}

.close {
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  border: 0;
  text-shadow: transparent;
  color: transparent;
  border-radius: 0.25rem;
  opacity: 0.5;
}
.close:hover {
  opacity: 0.75;
}
.close:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(106, 102, 67, .5);
  opacity: 1;
}
.card-bingo {
  border-radius: 0.5em;
  border: 2px solid var(--gold);
  background-color: rgb(8, 8, 8);
  font-size: 20px;
  color: #949494;
}

input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.modal-content {
  background-color: #19191a!important;
  color: #fff;
}

.modal-header {
  border-bottom: 1px solid var(--gold)!important;
}

.form-control:focus,
.form-check-input:focus {   
  border: var(--gold)!important;
  box-shadow: inset 0 0.1px 0.1px rgba(255, 255, 255, 0.075), 1px 1px 10px rgba(102, 98, 63, 0.8)!important;
  outline: 0 none!important;
}

.vgt-wrap.nocturnal .vgt-global-search__input .vgt-input,
 .vgt-wrap.nocturnal .vgt-global-search__input .vgt-select {
  background-color: #151515!important;
	border-radius: 25px!important;
	color: #817a61!important;
	border: none!important;
	padding: 0.6rem 1rem!important;
}

.vgt-table.nocturnal {
  border-radius: 25px!important;
  border: 1px solid #817a61!important;
}

.vgt-wrap.nocturnal .vgt-global-search,
.vgt-table.nocturnal th,
.vgt-table.nocturnal td,
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count__select{
  border-bottom: 1px solid #817a61!important;
  background: #21201c!important;
}

.vgt-wrap.nocturnal .vgt-wrap__footer,
.vgt-wrap.nocturnal .vgt-global-search{
  border: 1px solid #817a61!important;
  background: #21201c!important;
}

.text-vip {
  font-weight: bold;
  color: var(--gold);
  letter-spacing: 1.5px;
}
</style>

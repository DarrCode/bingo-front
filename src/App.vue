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
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  },
}
</script>

<style>
:root {
  --gold: #66623f;
}

body, #app {
  background-color: #000!important;
}

.btn:focus {
  outline: none!important;
  box-shadow: none!important;
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
</style>

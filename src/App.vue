<template>
  <div id="app">
    <div v-if="$route.name != 'Auth'">
      <Navbar />
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  components: {
    Navbar: () => import('@/components/ui/Navbar')
  }
}
</script>

<style>
#app {
  height: 100vh;
  background-color: #000;
}

.color-royal {
  color: #817a61;
}

</style>

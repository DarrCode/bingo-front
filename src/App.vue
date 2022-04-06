<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <router-view/>
  </div>
</template>
<script>
import MainService from './services/MainService';
export default {
  components: {
    Navbar: () => import('@/components/ui/Navbar')
  },
  mounted (){
    const data = {
      route: `/login`,
      params: {}
    }
     MainService.get(data)
      .then((response) => {
        console.log('aqui');
        const res = response.data
        if (res.statusCode === 0) {
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e)
      })
      .then(() => {
        console.log('ok');
      })
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

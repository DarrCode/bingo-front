<template>
  <div>
    sdsd
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  data () {
    return {
      gamer: {}
    }
  },
  methods: {
    show(id) {
      const data = {
        route: `admin/gamer/${id}`,
      }

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          console.log('show user', res);
          this.gamer = res.gamer
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
  }
}
</script>
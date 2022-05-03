<template>
  <div class="card card-profile" >
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <span class="ms-0 ms-sm-3">
          <b>Nombre completo.</b>
        </span>
        <span class="float-end text-capitalize">{{ profile.name }} {{ profile.last_name }}</span>
      </li>
      <li class="list-group-item">
        <span class="ms-0 ms-sm-3">
        <b>Correo electronico.</b>
        </span>
        <span class="float-end">{{ user.email }}</span>
      </li>
      <li class="list-group-item">
        <span class="ms-0 ms-sm-3">
        <b>Apodo.</b>
        </span>
        <span class="float-end">{{ profile.nick_name }}</span>
      </li>
      <li class="list-group-item">
        <span class="ms-0 ms-sm-3">
          <b>Pais.</b>
        </span>
        <span class="float-end text-capitalize">{{ profile.country }}</span>
      </li>
      <li class="list-group-item">
        <span class="ms-0 ms-sm-3">
          <b>Fecha de registro.</b>
        </span>
        <span class="float-end">
          {{ user.created_at | moment("DD/MM/YYYY") }} - {{ user.created_at | moment("HH:mm:ss a") }}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  data() {
    return {
      user: {},
      profile: {}
    }
  },
  mounted() {
    this.$store.dispatch("getUser");
    setTimeout(() => {
      this.user = this.$store.state.user
      this.getProfile()
    }, 500);
  },
  methods: {
    getProfile() {
      const data = {
        route: 'user/profile',
      }

      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.profile = res.profile[0]
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }
}
</script>
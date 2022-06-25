<template>
  <div class="card card-profile" >
    <ul class="list-group list-group-flush" v-if="$store.state.user">
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
        <span class="float-end">{{ $store.state.user.email }}</span>
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
          {{ $store.state.user.created_at | moment("DD/MM/YYYY") }} - {{ $store.state.user.created_at | moment("HH:mm:ss a") }}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      profile: {}
    }
  },
  mounted() {
    this.$store.dispatch("getUser")
    setTimeout(() => {
      this.profile = this.$store.state.user.profile
    }, 500);
  },
}
</script>
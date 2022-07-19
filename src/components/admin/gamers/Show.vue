<template>
  <div>
    <b-modal
      ref="show-user"
      centered
      hide-footer
      content-class="shadow"
      size="md"
      class="p-0"
    >
      <template #modal-title>
        #{{ gamer.id }} - <span class="text-vip">{{ gamer.name }} <span v-if="gamer.profile">{{ gamer.profile.last_name }}</span> </span>
      </template>
      <b-container>
        <b-row>
          <b-col cols="12">
            <center>
              <img
                v-if="imgProfile"
                class="img-profile mb-2"
                :src="imgProfile"  
                alt="Imagen de perfil"
              >
            </center>
          </b-col>
          <b-col cols="12" md="6">
            <ul>
              <li>
                <small>correo. </small>
                <p>{{gamer.email}}</p>
              </li>
              <li>
                <small>VIP. </small>
                <p v-if="gamer.vip">SI</p>
                <p v-else>NO</p>
              </li>
              <li>
                <small>Notificaciones. </small>
                <p v-if="gamer.notifications">Activas</p>
                <p v-else>Desactivadas</p>
              </li>
            </ul>
          </b-col>
          <b-col cols="12" md="6">
            <ul>
              <li v-if="gamer.wallet">
                <small>balance.</small>
                <p>{{gamer.wallet.balance}}</p>
              </li>
              <li>
                <small>Codigo referido.</small>
                <p>{{gamer.referral_code}}</p>
              </li>
              <li>
                <small>Registro.</small>
                <p>{{gamer.created_at}}</p>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  data () {
    return {
      gamer: {},
      imgProfile: ''
    }
  },
  methods: {
    show(id) {
      this.$refs['show-user'].toggle()

      const data = {
        route: `admin/gamer/${id}`,
      }

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          this.gamer = res.gamer
          this.imgProfile = this.$store.state.url+''+res.gamer.profile.profile_image
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
    },
  }
}
</script>
<style>
.img-profile {
  height: 90px;
  width: 90px;
  border-radius: 50%;
}
</style>
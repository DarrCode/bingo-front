<template>
  <div>
    <b-container class="py-5">
      <b-row >
        <b-col cols="12" lg="5" > 
          <div class="card card-profile text-center mb-3">
            <img 
              class="img-profile"
              :src="imageProfile ? `${url}${imageProfile}` : `${url}/storage/uploads/bnb.png`" 
              :alt="imageProfile"
             >
            
            <div class="card-body" v-if="$store.state.user">
                <h5 class="card-title" >{{ $store.state.user.name }}</h5>
                <p class="card-text" v-if="$store.state.user.vip">
                  <img src="../../assets/images/card-vip.png" width="60" height="60" alt="usuario vip">
                </p>
                <p class="card-text" v-else>
                  Conviertete en usuario <span>VIP</span> y disfruta de todos los beneficios que <span>BINGO ROYALTY</span> ofrece para ti
                </p>   
                <a href="#" class="btn btn-vip me-0 me-sm-5 mb-3 mb-sm-0">usuario VIP</a>
                <a @click="editProfile" class="btn btn-profile">Editar perfil</a> 
            </div>
          </div>
          <Accounts />
        </b-col>
        <b-col cols="12" lg="7">
          <ProfileIndex class="mb-3"/>
           Cartones
        </b-col>
      </b-row>
    </b-container>
    <ProfileEdit ref="edit-profile" />
  </div>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  components: {
    ProfileIndex: () => import('@/components/profile/Index'),
    ProfileEdit:  () => import('@/components/profile/Edit'),
    Accounts:  () => import('@/components/profile/accounts/Accounts'),
  },
  data () {
    return {
      imageProfile: null,
      url: process.env.VUE_APP_API_BASE
    }
  },
  mounted() {
    this.$store.dispatch("getUser")
    this.getImageProfile()
  },
  methods: {
    editProfile() {
      this.$refs['edit-profile'].getData()
    },
    getImageProfile() {
      const data = {
        route: 'user/profile',
      }

      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
          
            this.imageProfile = res.profile[0].profile_image
              console.log(`${this.url}${this.imageProfile}`);
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }
}
</script>

<style>
.card-profile{
  padding: 1.5em .5em .5em;
  border-radius: .5em;
  border: 2px solid var(--gold);
  background-color: rgb(8, 8, 8);
	font-size: 20px;
  color: #949494;
}

.card-profile .img-profile {
  height: 110px;
  width: 110px;
  border-radius: 50%;
}

.card-profile .card-text span:first-child {
  font-weight: bold;
  font-size: 22px;
  color: var(--gold);
  letter-spacing: 1.5px;
}

.card-profile .card-text span:last-child {
  font-weight: bold;
  font-size: 22px;
  color: #c62f3a;
  letter-spacing: 1px;
  transition: all 1ms ease-out;
}

.list-group .list-group-item{
  background: transparent!important;
  color: #949494;
}

.btn-vip {
  background-color: #c62f3a;
  text-transform: uppercase;
  font-weight: 800;
  color: #fff;
}

.btn-vip:focus {
  background-color: #823438;
}

.btn-profile {
  color: var(--gold);
  text-transform: uppercase;
  font-weight: 800;
  border: 2px solid var(--gold);
}

.btn-profile:focus {
  background-color: #141414;
}

.card-img-profile {
  width: 120px;
  height: 120px;
  border: 3px solid var(--gold);
  border-radius: 50%;
  margin: 0 auto;
}
</style>
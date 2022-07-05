<template>
  <div>
    <b-container class="py-5">
      <b-row >
        <b-col cols="12" lg="5" > 
          <div class="card card-profile text-center mb-3">
            <center>
              <img
                v-if="imgProfile"
                class="img-profile"
                :src="imgProfile"  
                alt="Imagen de perfil"
              >
            </center>
            
            <div class="card-body" v-if="$store.state.user">
              <h5 class="card-title" >{{ $store.state.user.name }}</h5>
              <p class="card-text" v-if="$store.state.user.vip">
                <img src="@/assets/images/card-vip.png" width="60" height="60" alt="usuario vip">
              </p>
              <p class="card-text" v-else>
                Conviertete en usuario <span class="text-vip">VIP</span> y disfruta de todos los beneficios que <span>BINGO ROYALTY</span> ofrece para ti
              </p>   
              <a 
                @click="userVip" 
                class="btn btn-vip me-0 me-sm-5 mb-3 mb-sm-0"
              >
                usuario VIP
              </a>
              <a @click="editProfile" class="btn btn-red">Editar perfil</a> 
            </div>
          </div>
          <Accounts />
        </b-col>
        <b-col cols="12" lg="7" >
          <ProfileIndex 
            class="mb-3 mt-3 mt-lg-0"
            :refreshProfile="refreshProfile"
          />
          <MyRequests 
            class="mb-3 mt-3 mt-lg-0"
          />
        </b-col>
      </b-row>
    </b-container>
    <ProfileEdit 
      ref="edit-profile" 
      @savedProfile="savedProfile"
    />
    <UserVip 
      ref="user-vip" 
    />
  </div>
</template>
<script>
export default {
  components: {
    ProfileIndex: () => import('@/components/user/profile/Index'),
    ProfileEdit: () => import('@/components/user/profile/Edit'),
    UserVip: () => import('@/components/user/profile/UserVip'),
    Accounts: () => import('@/components/user/profile/accounts/Accounts'),
    MyRequests: () => import('@/components/user/profile/Requests'),
  },
  data () {
    return {
      imgProfile: null,
      refreshProfile: false
    }
  },
  mounted() {
    this.$store.dispatch("getUser")
    setTimeout(() => {
      this.imgProfile = this.$store.state.url+''+this.$store.state.user.profile.profile_image
    }, 500)
  },
  methods: {
    savedProfile (data) {
      this.refreshProfile = data
    },
    editProfile () {
      this.$refs['edit-profile'].getData()
    },
    userVip () {
      this.$refs['user-vip'].userVipInfo()
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
  height: 90px;
  width: 90px;
  border-radius: 50%;
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

.btn-red {
  background-color: #c62f3a;
  text-transform: uppercase;
  font-weight: 800;
  color: #fff;
}

.btn-red:focus {
  background-color: #823438;
}

.btn-vip {
  color: var(--gold);
  text-transform: uppercase;
  font-weight: 800;
  border: 2px solid var(--gold);
}

.btn-vip:focus {
  background-color: #141414;
}
</style>
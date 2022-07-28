<template>
  <div class="home">
    <div class="loader" v-if="loader">
      <loader object="#66623f" color1="#ffffff" color2="#21201c" size="7" speed="2" bg="#343a40" objectbg="#999793" opacity="80" name="circular"></loader>
      <h1 class="text-center text-vip mt-5">Bingo Royalty</h1>
    </div>
    <b-container v-else>
      <b-row v-if="roleId == 3">
        <b-col cols="3">
          <SideHome />
        </b-col>
        <b-col cols="9">
          <Cardboards v-if="cardboards.length" />
          <Advertising v-else />
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col cols="3">
          <!--SideHome :nextPlayData="dataPlay" /-->
        </b-col>
        <b-col cols="12" xl="9">
          <Plays />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MainService from '@/services/MainService'

export default {
  name: 'Home',
  components: {
    SideHome: () => import('@/components/ui/SidebarHome'),
    Cardboards: () => import('@/components/user/cardboardsHome'),
    Advertising: () => import('@/components/user/advertising'),
    Plays: () => import('@/components/plays/index'),
    Requests: () => import('@/components/requests/index')
  },
  data () {
    return {
      roleId: null,
      propsListRequest: null,
      cardboards: [],
      dataPlay: {},
      loader: true
    }
  },
  beforeCreate () {
    setTimeout(() => {
      this.roleId = this.$session.get('user').role_id
      this.loader = false
    }, 5000);
  },
  methods: {
    getCarboards () {
			const data = {
				route: 'user/cardboards',
			}

			MainService.get(data)
			.then((response) => {
				const res = response.data
				if (res.statusCode == 0) {
					this.cardboards = res.cardboards
				}
			})
			.catch((err) => {
				console.log('error', err)
			})
		},
    listenRequest(info) {
      this.propsListRequest = info
    }
  }
}
</script>

<style>
.home {
  margin-top: 60px;
}
</style>

<template>
<div>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="3">
          <SideHome/>
        </b-col>
        <b-col cols="9">
          <Cardboards v-if="roleId == 3 && cardboards.length"/>
          <Advertising v-else />
        </b-col>
      </b-row>
    </b-container>
  </div>
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
  //  ListRequest: () => import('@/components/supervisor/listRequest')
  },
  data () {
    return {
      roleId: null,
      propsListRequest: null,
      cardboards: []
    }
  },
  mounted(){
    setTimeout(() => {
      this.roleId = this.$store.state.user.role_id
      this.getCarboards()
    }, 500);
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
          console.log(this.cardboards );
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

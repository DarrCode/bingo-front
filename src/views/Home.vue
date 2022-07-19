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
          <Advertising v-if="roleId == 3 && ! cardboards.length" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</div>
</template>

<script>
import MainService from '@/services/MainService'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      getRol: 'getRol',
    })
  },
 async mounted(){
    this.roleId = this.getRol
    if (this.roleId === 3) {
      this.getCarboards()
    }
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

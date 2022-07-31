<template>
  <div class="mt-3">
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="(play, index) of plays" :key="index">
        {{ play.name }} - {{ play.accumulated }}
      </li>
    </ul>
  </div>
</template>
<script>
import moment from 'moment'
import tz from 'moment-timezone'
import MainService from '@/services/MainService'

export default {
  data () {
    return {
      plays: []
    }
  },
  mounted () {
    this.PlaysDay()
  }, 
  methods: {
    PlaysDay () {
      const data = {
				route: '/user/meeting',
        params: {
          to: moment().format('yyyy-MM-DD'),
          from: moment().format('yyyy-MM-DD'),
          timeZone: moment().tz()
        }
			}

			MainService.get(data)
			.then((response) => {
				const res = response.data
				if (res.statusCode == 0) {
					this.plays = res.meeting
          console.log(this.plays);
				}
			})
			.catch((err) => {
				console.log('error', err)
			})
    }
  }
}
</script>
<template>
  <b-modal
    ref="detail"
    centered
    hide-footer
    content-class="shadow"
    size="lg"
    class="p-0"
  >
    <b-container>
      <b-row>
        <form>
          <div class="row g-3 mb-2 justify-content-center">
            <div class="col-12 col-sm-4">
              <div id="user-profile-img" class="shadow-sm">
                <img :src="profile.profile_image ? user.profile_image : 'https://picsum.photos/200/300'" :alt="profile.name">
              </div>
            </div>
            <div class="col-12 col-sm-8">
              <label for="formFile" class="form-label">Imagen de perfil.</label>
              <input 
                type="file" 
                class="form-control"
                id="customFile"
                ref="file"
                @change="onChange()"
              >
            </div>
          </div>
          <div class="row g-3 mb-2 align-items-center">
            <div class="col-12 col-sm-6">
              <label>Nombre.</label>
              <input type="text" class="form-control" :value="profile.name">
            </div>
            <div class="col-12 col-sm-6">
              <label>Apellido.</label>
              <input type="text" class="form-control" :value="profile.last_name">
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="col-12 col-sm-6">
              <label>Apodo.</label>
              <input type="text" class="form-control" :value="profile.nick_name">
            </div>
            <div class="col-12 col-sm-6">
              <label>Pais.</label>
              <input type="text" class="form-control" :value="profile.country">
            </div>
          </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import MainService from '@/services/MainService';

export default {
  data () {
    return {
      profile: {},
      file: '',
    }
  },
  methods: {
    getData () {
      this.$refs['detail'].toggle()

      const data = {
        route: '/user/profile',
      }

      MainService.get(data)
        .then((response) => {
          const res = response.data
          if (res.statusCode == 0) {
            this.profile = res.profile[0]
            console.log(this.profile)
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    onChange(e) {
      this.file = e.target.files[0];
    },
    formSubmit(e) {
      e.preventDefault();

      const axiosRequest = axios.create({
          baseURL: `${process.env.VUE_APP_API_URL}/`,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          responseType: 'arraybuffer'
      })

      axiosRequest.defaults.headers.common.Authorization = `${this.$session.get('token_type')} ${this.$session.get('access_token')}`


      let formData = new FormData();
      formData.append('file', this.file);

      const params = {
        data: formData
      }

      axiosRequest.post('/user/profile/edit', {params})
        .then(function (res) {
          this.success = res.data.success;
        })
        .catch(function (err) {
          console.log(err);
          this.output = err;
        });
    }
  }
}
</script>

<style>
label {
	font-size: 18px;
  color: #949494;
}

.form-control {
	background-color: #ececec;
	border-radius: 25px;
	color: #817a61;
	border: none;
	padding: 0.6rem 1rem;
}

#user-profile-img {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  border: 3px solid #E6E6E6;
  margin: 0 auto;
  transition: all .5s;
  cursor: pointer;
  position: relative;
}


#user-profile-img:hover {
  border: 3px solid var(--gold);
}

#user-profile-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 0 !important;
  padding: 0 !important;
}

</style>
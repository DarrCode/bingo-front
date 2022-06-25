<template>
  <b-modal
    ref="detail"
    centered
    hide-footer
    content-class="shadow"
    size="lg"
    class="p-0"
  >
    <template #modal-title>
      Edita tus datos personales
    </template>
    <b-container>
      <b-row>
        <form @submit.prevent="formSubmit" enctype="multipart/form-data">
          <div class="row g-3 mb-2 justify-content-center">
            
            <div class="col-12">
              <label for="formFile" class="form-label">Imagen de perfil.</label>
              <input 
                type="file" 
                class="form-control"
                id="customFile"
                ref="file"
                @change="onChange">
              
            </div>
          </div>
          <div class="row g-3 mb-2 align-items-center">
            <div class="col-12 col-sm-6">
              <label>Nombre.</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="profile.name" 
                required
              >
            </div>
            <div class="col-12 col-sm-6">
              <label>Apellido.</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="profile.last_name" 
                required
              >
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="col-12 col-sm-6">
              <label>Apodo.</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="profile.nick_name" 
                required
              >
            </div>
            <div class="col-12 col-sm-6">
              <label>Pais.</label>
              <input 
                type="text" 
                class="form-control"
                v-model="profile.country" 
                required
              >
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class=" mt-3 text-center btn btn-vip">Registrar datos</button>
          </div>
        </form>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import axios from 'axios'
import MainService from '@/services/MainService'

export default {
  data () {
    return {
      profile: {},
      profile_image: '',
      imagePreview: '',
      update: false
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
            this.profile = res.profile            
            this.imagePreview = this.profile.profile_image
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    onChange(e) {
      this.profile_image = e.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(this.profile_image)
      reader.onload = e => {
        this.imagePreview = e.target.result
      }
    },
    formSubmit() {
      const axiosRequest = axios.create({
        baseURL: `${process.env.VUE_APP_API_URL}/`,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })

      axiosRequest.defaults.headers.common.Authorization = `${this.$session.get('token_type')} ${this.$session.get('access_token')}`

      let data = new FormData()
      data.append("name", this.profile.name)
      data.append("last_name", this.profile.last_name)
      data.append("nick_name", this.profile.nick_name)
      data.append("country", this.profile.country)
      data.append("profile_image", this.profile_image)
      
      axiosRequest.post('/user/profile/store', data)
        .then((res) => {
          if (res.data.statusCode == 0) {
            this.update = true
            this.$refs['detail'].toggle()
          }
        })
        .catch((err) => {
          console.log('err', err)
        })

      if (this.update) {
        this.$swal({
          position: 'top-end',
          icon: 'success',
          title: 'Perfil editado con exito',
          showConfirmButton: false,
          timer: 1500
        })
      }
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
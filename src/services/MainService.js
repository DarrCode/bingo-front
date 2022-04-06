import http from '../../http-common'

class MainService {
  get (data) {
    const params = data.params
    return http.get(data.route, { params })
  }

  post (data) {
    return http.post(data.route, data.params)
  }

  formPost (data) {
    const params = Object.keys(data.params)
    const formData = new FormData()

    params.map((paramName) => {
      formData.append(paramName, data.params[paramName])
    })

    return http.post(data.route, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  put (data) {
    return http.put(data.route, data.params)
  }

  delete (data) {
    const params = data.params
    return http.delete(data.route, { params })
  }
}

export default new MainService()

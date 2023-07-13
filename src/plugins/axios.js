export default ({ $axios,  }, inject) => {
    $axios.setBaseURL('https://back.rakhat.a-lux.dev/api/')
    $axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    inject('api', $axios)
  }


  
export default function ({ $axios, $toast, error: nuxtError }) {
  $axios.onError((error) => {
    if (process.server) return
    switch (error.response.status) {
      case 422:
        Object.keys(error.response.data.errors).map((key) => {
          $toast.error(error.response.data.errors[key][0])
        })
        break
      case 400:
        $toast.error(error.response.data.message)
        break
      default:
        nuxtError({
          statusCode: error.response.status,
          message: error.message,
        })
    }
    return Promise.resolve(false)
  })
}

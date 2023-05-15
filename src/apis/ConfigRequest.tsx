import baseAxios from './ConfigAxios'

const CallApi = (url: string, method: string = 'get', params: any = {}, data: any = {}) => {
  return baseAxios({
    method: method,
    url: url,
    params: params,
    data: data
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export default CallApi

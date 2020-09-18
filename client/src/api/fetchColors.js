import {axiosWithAuth} from '../utils/axiosWithAuth'

export const fetchColors =() => {
    return axiosWithAuth()
    .get('/api/colors')
    .then(res => {
        return res
    })
    .catch (error => {
        console.log('error in fetch')
        return error
    })
}
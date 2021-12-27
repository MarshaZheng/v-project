import axios from 'axios'
export function getList(value) {
    return axios.post('/api/patient/fetchData', value)
}
import axios from 'axios'
export function getPatientList(value) {
    return axios.post('/api/patient/fetchData', value)
}

export function getPhysicianList(value) {
    return axios.post('/api/physician/fetchData', value)
}
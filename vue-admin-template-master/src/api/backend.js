import axios from 'axios'
export function getPatientList(value) {
    return axios.post('/api/patient/fetchData', value)
}

export function getPhysicianList(value) {
    return axios.post('/api/physician/fetchData', value)
}
export function getDeptList(value) {
    return axios.post('/api/dept/fetchData', value)
}

export function getHospitalList(value) {
    return axios.post('/api/hospital/fetchData', value)
}

export function nodeAlgorithm(value) {
    return axios.post('/api/algorithm/nodeSimilarity', value)
}
export function communityAlgorithm(value) {
    return axios.post('/api/algorithm/communityDiscovery', value)
}
export function pathAlgorithm(value) {
    return axios.post('/api/algorithm/relativePath', value)
}

export function getPathData(value) {
    return axios.post('/api/algorithm/getPathData', value)
}

export function expandNode(value) {
    return axios.post('/api/algorithm/expandNode', value)
}

export function fetchData(value) {
    return axios.post('/api/algorithm/fetchData', value)
}
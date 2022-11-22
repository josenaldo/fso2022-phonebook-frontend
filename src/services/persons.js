import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then((response) => {
        return response.data
    })
}

const create = (person) => {
    return axios.post(baseUrl, person).then((response) => {
        return response.data
    })
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (person, id) => {
    return axios.put(`${baseUrl}/${id}`, person).then((response) => {
        return response.data
    })
}

const searchByName = (name) => {
    return axios.get(`${baseUrl}/search/${name}`).then((response) => {
        console.log(response.data)
        return response.data
    })
}

const personServices = {
    getAll,
    create,
    remove,
    update,
    searchByName,
}

export { personServices }

import axios from 'axios'
const baseURL = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseURL)
        .then(response => response.data);

const createPerson = (obj) => axios.post(baseURL, obj)
        .then(response => response.data)

const updatePerson = (id, newObj) => axios.put(`${baseURL}/${id}`, newObj)
        .then(response => response.data)

const deletePerson = (id) => axios.delete(`${baseURL}/${id}`)
        .then(response => console.log(response))

export default {
    getAll,
    createPerson,
    updatePerson,
    deletePerson
}
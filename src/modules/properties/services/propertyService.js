import properties from '../data/properties'

export default {
    getAll() {
        return properties
    },

    getById(id) {
        return properties.find(p => p.id === parseInt(id))
    }
}
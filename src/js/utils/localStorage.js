const Store = require('electron-store')
const store = new Store()

class localStorage {
    constructor () {

    }
    
    write = (key, value) => {
        store.set(key, value)
        return value
    }

    read = (key) => {
        let val = store.get(key)
        if (val == 0) return 0
        else if (val == false) return false
        else return val || null
    }

    remove = (key) => {
        store.delete(key)
    }
}

module.exports = {
    localStorage: localStorage
}

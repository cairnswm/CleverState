const { DeepProxy } = require("./proxied.js")

let store

class objectStore  {

    constructor(initialState) {
        this._Store = new DeepProxy({ state: initialState }, this.handler(this.onChange));
        // this.showChange = (target, path, value, receiver) => {
        //     console.log('set', path.join('.'), '=', JSON.stringify(value));
        // }
        this._Store.onChange = (target, path, value, receiver) => this.onShowChange(target, path, value, receiver);
    }
    onChange (target, path, value, receiver) {        
        //console.log('set 2', path.join('.'), '=', JSON.stringify(value));
    }
    onShowChange (target, path, value, receiver) {        
        console.log('SHOW CHANGE', path.join('.'), '=', JSON.stringify(value));
    }
    
    handler (onChange) { return {
        set(target, path, value, receiver) {
            //onChange(target, path, value, receiver)                
            //console.log('set', path.join('.'), '=', JSON.stringify(value));
        },
    
        deleteProperty(target, path) {
            console.log('delete', path.join('.'));
        }
    }}
   
    list(header) { console.log(header,this._Store.state)};
    get state() {
        return this._Store.state;
    }
}

function getStore() {
    return store;
}

function createStore(initialState) {
    store = new objectStore(initialState)
    store.onChange = (target, path, value, receiver) => {
        console.log("onChange")
    }
    return store;
}

function storeUpdated(target, path, value, receiver) {
    console.log('set', path.join('.'), '=', JSON.stringify(value), "in" , target, "by", receiver);
}

module.exports = { createStore, store, getStore };
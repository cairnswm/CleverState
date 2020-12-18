const { DeepProxy } = require("./proxied.js")

let store

class objectStore  {
    constructor(initialState) {
        this._Store = new DeepProxy({ state: initialState }, this.handler(this.onChange));
        this._Store.onChange = (target, path, value, receiver) => this.onShowChange(target, path, value, receiver);
        this.storeid = 1;
        this.subscribers = [];
    }
    onShowChange (target, path, value, receiver) {        
        let p = [];
        this.subscribers.forEach((sub) => {
          if (path.join('.').indexOf(sub.name) === 0) {
            p.push(sub.func(target, path, value, receiver));
          }
        }); 
        return Promise.all(p);
    }
    replaceState(newState) {
      this._Store.state = {...newState}
    }
    
    handler (onChange) { return {
        set(target, path, value, receiver) {
        },
        deleteProperty(target, path) {
            console.log('delete', path.join('.'));
        }
    }}
   
    list(header) { console.log(header,this._Store.state)};
    get state() {
        return this._Store.state;
    }
    subscribe(item, fn, id) {
        if (!fn) {
          fn = item;
          item = "All";
        }
        if (!this.subscribers.find(f => f.func === fn)) {
          if (!id) {
            id = this.storeid++;
          }
          this.subscribers.push({ "name": item, "func" : fn, id: id });
          //console.log(this.subscribers)
          return id;
        } else {
          console.log("Function already added")
        }
    }
    unsubscribe(fn) {
        console.log("Removing ",fn)
        let newsubscribers;
        if (typeof fn === "function") {
          newsubscribers = this.subscribers.filter(function (f) {
            return f.func !== fn;
          });
        } else {
          newsubscribers = this.subscribers.filter(function (f) {
            return f.id !== fn;
          });
        }
        this.subscribers = newsubscribers
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
    state = store.state;
    return store;
}

function storeUpdated(target, path, value, receiver) {
    console.log('set', path.join('.'), '=', JSON.stringify(value), "in" , target, "by", receiver);
}

module.exports = { createStore, getStore };
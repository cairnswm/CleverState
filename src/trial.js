let CleverStore = require("./CleverState");

let store = CleverStore.createStore({ name: "William", age: "51" })

let f1 = store.subscribe("state.age",(target, path, value, receiver) => {        
    console.log('Subscriber:', path.join('.'), '=', JSON.stringify(value));
});

let f3 = store.subscribe("state",(target, path, value, receiver) => {        
    console.log('Changeing state:', path.join('.'), '=', JSON.stringify(value));
});
store.state.surname = "Cairns"

//store.state.person = { name: "Yolande", age: "50" }

store.replaceState({ name: "Yolande", age: "50" })




let store2 = CleverStore.getStore();
let f2 = store2.subscribe("state.age",(target, path, value, receiver) => {        
    console.log('Another Subscriber:', path.join('.'), '=', JSON.stringify(value));
});

store2.state.age = 51;
store2.state.age = 52;

store.unsubscribe(f1);


store.state.surname = "Cairns 2"
store2.state.age = 53;

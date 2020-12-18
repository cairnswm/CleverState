let liveState = require("./store4");

let store = liveState.createStore({ name: "William", age: "51" })

let f1 = store.subscribe("state.age",(target, path, value, receiver) => {        
    console.log('Subscriber:', path.join('.'), '=', JSON.stringify(value));
});
let f2 = store.subscribe("state.age",(target, path, value, receiver) => {        
    console.log('Another Subscriber:', path.join('.'), '=', JSON.stringify(value));
});
let f3 = store.subscribe("state.surname",(target, path, value, receiver) => {        
    console.log('Changeing surname:', path.join('.'), '=', JSON.stringify(value));
});
store.state.surname = "Cairns"

let st = liveState.getStore();

st.state.age = 51;
st.state.age = 52;

store.unsubscribe(f1);


store.state.surname = "Cairns 2"
st.state.age = 53;

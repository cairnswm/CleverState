let state = require("./store4");

let store = state.createStore({ name: "William", age: "51" })
//console.log(store);
//store.list("Created:");

let store2 = state.store;
//console.log("==========2==========")
//console.log(store);
store.state.surname = "Cairns"
//store.list("Changed");

let st = state.getStore();
//console.log("Store.state",st.state);
//st.list("Child");

st.state.age = 52;

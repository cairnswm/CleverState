const s = require("./store");
const c = require("./page");


const store = s.createState({ name: "William", age: 51 })


store.subscribe((state) => { console.log("Subscriber 1", state)});
store.subscribe((state) => { console.log("Subscriber 2", state)});
store.setState( {...store.state, surname: "Cairns" });

const child = c.DisplayStore();
store.subscribe((state) => { console.log("Subscriber 3", state)});

store.setState( {...store.state, middleName: "Morgan" });
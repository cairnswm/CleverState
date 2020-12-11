const s = require("./store2");
const c = require("./page2");
const cb = require("./page2b");


const store = s.createState("person", { name: "William", age: 51 })

console.log("Initial State",store.state["person"])
let sub1 = store.subscribe("person", async (state) => { console.log("Subscriber 1", state)});

store.list();
store.subscribe("person", async (state) => { console.log("Subscriber 2", state)}, sub1);

store.list();
store.setState("person", {...store.state["person"], surname: "Cairns" });



const child = c.DisplayStore();
store.list();
store.unsubscribe(sub1);
store.list();
//const child2 = cb.DisplayStore();
store.subscribe("person", async (state) => { console.log("Subscriber 3", state)});
const child2 = cb.DisplayStore();

store.list();

store.setState("person", {...store.state["person"], middleName: "Morgan" });

store.setState("person", {...store.state["person"], age: store.state["person"].age+1 });
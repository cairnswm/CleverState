const s = require("./store2");
const c = require("./page2");


const store = s.createState("person", { name: "William", age: 51 })

console.log("Initial State",store.state["person"])
store.subscribe("person", async (state) => { console.log("Subscriber 1", state)});
store.subscribe("person", async (state) => { console.log("Subscriber 2", state)});
store.setState("person", {...store.state["person"], surname: "Cairns" });

const child = c.DisplayStore();
const child2 = c.DisplayStore();
store.subscribe("person", async (state) => { console.log("Subscriber 3", state)});

store.setState("person", {...store.state["person"], middleName: "Morgan" });

store.setState("person", {...store.state["person"], age: store.state["person"].age+1 });
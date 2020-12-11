const s = require("./store2");

async function Display(state) {
    console.log("STATE!!",state.name+" "+state.middleName+" "+state.surname+ " is " + state.age + " years old") 
}

function DisplayStore() {
    console.log("Loading Child");
    let c = s.subscribe("person", (state) => Display(state))
    console.log("c.id",c);
}

module.exports = { DisplayStore }; 
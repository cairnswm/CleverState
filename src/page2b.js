const s = require("./store2");

async function Display2(state) {
    console.log("STATE2!!",state.name+" "+state.middleName+" "+state.surname+ " is " + state.age + " years old") 
}

function DisplayStore() {
    console.log("Loading Child");
    let c = s.subscribe("person", (state) => Display2(state))
    console.log("c.id",c);
}

module.exports = { DisplayStore }; 
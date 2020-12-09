const s = require("./store2");

function Display(state) {
    console.log(state.name+" "+state.middleName+" "+state.surname+ " is " + state.age + " years old") 
}

function DisplayStore() {
    console.log("Loading Child");
    s.subscribe("person", Display)
}

module.exports = { DisplayStore }; 
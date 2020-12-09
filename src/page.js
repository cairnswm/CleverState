const s = require("./store");

function DisplayStore() {
    console.log("Loading Child");
    s.subscribe((state) => { console.log("Child",state) })
}

module.exports = { DisplayStore }; 
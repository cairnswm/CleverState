const s = require("./proxied");
const store = require("./proxied").proxied;

store.deep.dark = "secret";
store.deep.level1 = {}
store.deep.level1.Level2 = {}
store.deep.level1.Level2.Level3 = {}
store.deep.level1.Level2.Level3.Level4 = {}
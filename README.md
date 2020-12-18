# CleverState

Live state management system. Changes in state from any source trigger events to any subscribers of the data item.

# Usage

```javascript
// Require the Store
let CleverStore = require("./CleverState");

// Create the Store
// Must be done first, ie on Program start
// Method createStore(initialstate)
let store = CleverStore.createStore({ name: "William", age: "51" })

// Subscribe to an item in the store - returns an ID that is used to unsubscribe
let f1 = store.subscribe("state.age",(target, path, value, receiver) => {        
    console.log('Subscriber:', path.join('.'), '=', JSON.stringify(value));
});

// Can also subscribe at a different level
// so changes to state.age or state.surname will both trigger 
let f3 = store.subscribe("state",(target, path, value, receiver) => {        
    console.log('Changeing state:', path.join('.'), '=', JSON.stringify(value));
});
// NOTE: Subscribing to changes on "state" trigger for all/any chnages on the state store

// Whenever a change is made in state, all matching subscriptions will be called
store.state.surname = "Cairns"

// Outputs:
/*
Changeing state: state.surname = "Cairns 2"
*/

// To replace the complete store use replaceStore
// This will trigger the state level event but no child events
store.replaceState({ name: "Yolande", age: "50" })

// It is possible to have multiple subscribers on the same state level
let f2 = store.subscribe("state.age",(target, path, value, receiver) => {        
    console.log('Subscriber 2 on state.age:', path.join('.'), '=', JSON.stringify(value));
});

// If the store has already been created, it should not be created again, instead use getStore to get a link to the existing store
let store2 = CleverStore.getStore();

// Adding subscribers to the new store item is done in the same way
let f2 = store2.subscribe("state.age",(target, path, value, receiver) => {        
    console.log('Another Subscriber:', path.join('.'), '=', JSON.stringify(value));
});

// If a subscription is no longer needed, e.g. a window has closed, the function should be unsubscribed for performance reasons

store.unsubscribe(f1);
```



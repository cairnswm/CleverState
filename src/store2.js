function subscribe(item,fn) {
    if (!fn) {
      fn = item;
      item = "All";
    }
    if (!this.subscribers) {
        console.warn("Store not ready for subscribers, subscription not registered", this.state)
        return null;
    }
    if (!this.subscribers.find(f => f.func === fn)) {
      this.subscribers.push({ "name": item, "func" : fn });
    }
  }
  
  function unsubscribe(fn) {
    this.subscribers = this.subscribers.filter(function (f) {
      return f.func !== fn;
    });
  }
  
  function setState(item, getState) {
    if (!getState) {
      getState = item;
      item = "All";
    }
    //console.log("Before setState",this.state[item]);
    console.log("Setting State");
    this.state[item] = (
        typeof getState === "function" ? getState(this.state[item]) : getState
    )
    //console.log("After setState",this.state[item]);
    
    p = [];
    this.subscribers.forEach((sub) => {
      if (sub.name === item) {
        p.push(sub.func(this.state[item]));
      }
    }); 
    return Promise.all(p);
  }
  
  function createState(item, initialState) {
      this.subscribers = [];
      this.state = [];
      this.state[item] = initialState;
      console.log("STORE IS CREATED", this.state);
    return {
      state: this.state,
      subscribers: this.subscribers,
      setState,
      subscribe,
      unsubscribe,
    };
  }
  
  module.exports = { createState, subscribe };
function subscribe(fn) {
    if (!this.subscribers) {
        console.warn("Store not ready for subscribers, subscription not registered")
        return null;
    }
    this.subscribers.push(fn);
  }
  
  function unsubscribe(fn) {
    this.subscribers = this.subscribers.filter(function (f) {
      return f !== fn;
    });
  }
  
  function setState(getState) {
    this.state = Object.assign(
      {},
      this.state,
      typeof getState === "function" ? getState(this.state) : getState
    );
    return Promise.all(this.subscribers.map((sub) => sub(this.state)));
  }
  
  function createState(initialState) {
      this.subscribers = [];
    return {
      state: initialState,
      subscribers: this.subscribers,
      setState,
      subscribe,
      unsubscribe,
    };
  }
  
  module.exports = { createState, subscribe };
/*!
 * broadcast.js - a simple pub/sub implementation
 * by Letian Zhang
 */

(function (window) {
  'use strict';

  var subscriptions = {},
      counter = 0;

  function publish(id) {
    if (typeof id !== 'string') {
      throw "Invalid ID";
    }

    var args = [].slice.call(arguments, 1),
        subscribers,
        subscriber;

    // if no such subscriber, simply ignore it
    if (!subscriptions[id]) {
      return;
    }

    subscribers = subscriptions[id];

    // Invoke callback one by one
    for (var i = 0; i < subscribers.length; i++) {
      subscriber = subscribers[i];
      subscriber.callback.apply(subscriber.context, args);
    }
  }

  function subscribe(id, callback, context) {
    if (typeof id !== 'string') {
      throw "Invalid ID";
    }
    if (typeof callback !== 'function') {
      throw "Invalid Callback";
    }
    if (typeof context === 'undefined') {
      context = null;
    }

    // If it's a new id
    if (!subscriptions[id]) {
      subscriptions[id] = [];
    }

    // Add this subscriber
    subscriptions[id].push({
      callback: callback,
      context: context,
      token: ++counter
    });

    return counter;
  }

  function unsubscribe(token) {
    var items;

    for (var id in subscriptions) {
      items = subscriptions[id];
      for(var i = 0; i < items.length; i++) {
        if (items[i].token === token) {
          items.splice(i, 1);
          return true;
        }
      }
    }

    return false;
  }

  // Export the object
  var broadcast = {
    publish: publish,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    // Short name
    pub: publish,
    sub: subscribe,
    unsub: unsubscribe
  };

  if (typeof define === 'function' && define.amd) {
    // AMD
    define(broadcast);
  } else {
    // browser global
    window.broadcast = broadcast;
  }

})(window);

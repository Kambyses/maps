/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define, $*/

define(function () {
  "use strict";

  var Events = function () {

    this.events = [];

  };

  Events.prototype = {

    on: function (event, handler, context, once) {
      var idx, len;
      if (typeof event === "object") {
        for (idx in event) {
          if (event.hasOwnProperty(idx)) {
            this.on(idx, event[idx], handler);    // here handler is actually context
          }
        }
        return this;
      }
      if (event.indexOf(",") !== -1) {
        event = event.split(",");
        for (idx = 0, len = event.length; idx < len; idx += 1) {
          event[idx] = $.trim(event[idx]);
          if (event[idx]) {
            this.on(event[idx], handler, context, once);
          }
        }
        return this;
      }
      this.events.push({
        "type":    event,
        "handler": handler,
        "context": context || this,
        "once":    once || false
      });
      return this;
    },

    one: function (type, handler, context) {
      return this.on(type, handler, context, true);
    },

    off: function (type, handler, context) {
      var idx, len = this.events.length, event, events = [];
      context = context || this;
      for (idx = 0; idx < len; idx += 1) {
        event = this.events[idx];
        if (event === type || event.type !== type ||
            (handler && event.handler !== handler) ||
            event.context !== context) {
          events.push(event);
        }
      }
      this.events = events;
      return this;
    },

    trigger: function (event, data) {
      var events, idx, len, once = [];
      if (typeof event === "object") {
        event.handler.call(event.context, {
          "type":    event.type,
          "data":    data,
          "context": event.context
        });
        if (event.once) {
          this.off(event.type, event.handler, event.context);
        }
        return;
      }
      if (typeof event === "string") {
        events = this.events;
        len    = events.length;
        for (idx = 0; idx < len; idx += 1) {
          if (events[idx].type === event) {
            this.trigger(this.events[idx], data);
            if (events[idx].once) {
              once.push(events[idx]);
            }
          }
        }
      }
      len = once.length;
      if (!len) {
        return;
      }
      for (idx = 0; idx < len; idx += 1) {
        this.off(once[idx]);
      }
    }

  };

  return Events;

});

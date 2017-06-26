/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define, window*/

define(function (require) {
  "use strict";
  
  var Class = require("Class");
    
  function Router() {
    
    this.options = {
      "values": {
        "route": null
      }
    };
    
    Class.apply(this, arguments);
  }
  
  Router.prototype = {
    
    initialize: function () {
      Class.prototype.initialize.apply(this, arguments);
      window.addEventListener("hashchange", this.onWindowHashChange.bind(this));
    },
    
    setValues: function () {
      var changed = Class.prototype.setValues.apply(this, arguments);
      if (changed) {
        this.events.trigger("change", changed);
      }
    },
    
    onWindowHashChange: function (event) {
      this.setValue("route", this.parseHash(event.target.location.hash));
    },
    
    parseHash: function (hash) {
      return (hash || window.location.hash || "").replace(/^#/, "");
    },
    
    start: function () {
      this.setValue("route", this.parseHash());
    }
    
  };
  
  Class.extend(Router);
  
  return new Router();
  
});
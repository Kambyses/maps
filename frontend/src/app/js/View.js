/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define*/

define(function (require) {
  "use strict";
  
  var
    Class    = require("Class"),
    router   = require("router"),
    template = require("text!../view/view.html");

    
  function View() {
    
    this.options = {
      "template": template,
      "values": {
        "route": router.parseHash(),
      }
    };
    
    Class.apply(this, arguments);
  }
  
  View.prototype = {
    
    initialize: function () {
      this.views = {};
      Class.prototype.initialize.apply(this, arguments);
    },
    
    setValues: function () {
      var changed = Class.prototype.setValues.apply(this, arguments);
      if (changed) {
        if (changed.route !== undefined) {
          this.show(changed.route);
        }
        this.events.trigger("change", changed);
      }
    },
    
    show: function (route) {
      console.log("show", route);
      switch (route) {
        case "home":
        case "leaflet.0.7.7":
        case "leaflet.1.0.3":
        case "mapbox-gl.0.38.0":
        case "openlayers.2.13.1":
        case "openlayers.4.2.0":
          if (this.views[route]) {
            $(this.views[route].element).show().siblings().hide();
            return;
          }
          require([ route ], function (View) {
            this.views[route] = new View({ "wrapper": this.element });
            this.show(route);
          }.bind(this));
          break;
        default:
          this.show("home");
          break;
      }
    }
    
  };
  
  return Class.extend(View);
  
});
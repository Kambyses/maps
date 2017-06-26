/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define*/

define(function (require) {
  "use strict";
  
  var
    Class    = require("Class"),
    template = require("text!../view/view.html");

    
  function View() {
    
    this.options = {
      "template": template,
      "values": {
        "route": null
      }
    };
    
    Class.apply(this, arguments);
  }
  
  View.prototype = {
    
    initialize: function () {
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
      switch (route) {
        case "leaflet.0.7.7":
          break;
        case "leaflet.1.0.3":
          break;
        case "mapbox-gl.0.38.0":
          break;
        case "openlayers2.13.1":
          break;
        case "openlayers4.2.0":
          break;
        default:
          route = "home";
          break;
      }
      this.element.innerHTML = route;
    }
    
  };
  
  return Class.extend(View);
  
});
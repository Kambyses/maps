/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define*/

define(function (require) {
  "use strict";
  
  var
    Class    = require("Class"),
    template = require("text!../view/mapbox-gl.0.38.0.html");

    
  function MapboxGL0380() {
    
    this.options = {
      "template": template
    };
    
    Class.apply(this, arguments);
  }
  
  MapboxGL0380.prototype = {
    
    initialize: function () {
      Class.prototype.initialize.apply(this, arguments);
    }
    
  };
  
  return Class.extend(MapboxGL0380);
  
});
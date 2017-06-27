/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define*/

define(function (require) {
  "use strict";
  
  var
    Class    = require("Class"),
    template = require("text!../view/leaflet.0.7.7.html");

    
  function Leaflet077() {
    
    this.options = {
      "template": template
    };
    
    Class.apply(this, arguments);
  }
  
  Leaflet077.prototype = {
    
    initialize: function () {
      Class.prototype.initialize.apply(this, arguments);
    }
    
  };
  
  return Class.extend(Leaflet077);
  
});
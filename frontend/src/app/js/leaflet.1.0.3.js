/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define*/

define(function (require) {
  "use strict";
  
  var
    Class    = require("Class"),
    template = require("text!../view/leaflet.1.0.3.html");

    
  function Leaflet103() {
    
    this.options = {
      "template": template
    };
    
    Class.apply(this, arguments);
  }
  
  Leaflet103.prototype = {
    
    initialize: function () {
      Class.prototype.initialize.apply(this, arguments);
    }
    
  };
  
  return Class.extend(Leaflet103);
  
});
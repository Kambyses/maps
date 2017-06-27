/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-27
 */

/*globals define*/

define(function (require) {
  "use strict";
  
  var
    Class    = require("Class"),
    template = require("text!../view/openlayers.4.2.0.html");

    
  function OpenLayers420() {
    
    this.options = {
      "template": template
    };
    
    Class.apply(this, arguments);
  }
  
  OpenLayers420.prototype = {
    
    initialize: function () {
      Class.prototype.initialize.apply(this, arguments);
    }
    
  };
  
  return Class.extend(OpenLayers420);
  
});
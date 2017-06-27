/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-27
 */

/*globals define*/

define(function (require) {
  "use strict";
  
  var
    Class    = require("Class"),
    template = require("text!../view/openlayers.2.13.1.html");

    
  function OpenLayers2131() {
    
    this.options = {
      "template": template
    };
    
    Class.apply(this, arguments);
  }
  
  OpenLayers2131.prototype = {
    
    initialize: function () {
      Class.prototype.initialize.apply(this, arguments);
    }
    
  };
  
  return Class.extend(OpenLayers2131);
  
});
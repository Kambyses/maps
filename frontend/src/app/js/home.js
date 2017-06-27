/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define*/

define(function (require) {
  "use strict";
  
  var
    Class    = require("Class"),
    template = require("text!../view/home.html");

    
  function Home() {
    
    this.options = {
      "template": template
    };
    
    Class.apply(this, arguments);
  }
  
  Home.prototype = {
    
    initialize: function () {
      Class.prototype.initialize.apply(this, arguments);
    }
    
  };
  
  return Class.extend(Home);
  
});
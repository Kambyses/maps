/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define, window*/

define(function (require) {
  "use strict";
  
  require("css!../css/style.css");
  
  var
    Class    = require("Class"),
    router   = require("router"),
    Navi     = require("Navi"),
    View     = require("View"),
    template = require("text!../view/wrapper.html");

    
  function App() {
    
    this.options = {
      "template": template
    };
    
    Class.apply(this, arguments);
  }
  
  App.prototype = {
    
    initialize: function () {
      Class.prototype.initialize.apply(this, arguments);
    
      this.navi = new Navi({ "wrapper": this.element });
      this.view = new View({ "wrapper": this.element });
      this.router = router;
      
      router.events.on("change", this.onRouteChange.bind(this));
      router.start();
    },
    
    onRouteChange: function (event) {
      this.view.setValue("route", event.data.route);
    }
    
  };
  
  Class.extend(App);
  
  window.app = new App();
  
});
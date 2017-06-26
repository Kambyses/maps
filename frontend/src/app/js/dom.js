/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define, $, document*/

define(function () {
  "use strict";

  var dom = {

    appendView: function (options) {
      options = options || {};
      var
        wrapper     = options.wrapper || document.body,      // DOM node
        element     = options.element || null,               // string selector
        template    = options.template || null,              // string HTML
        placeholder = options.placeholder || null;           // replaceable string

      if (typeof wrapper === "string") {
        wrapper = document.querySelector(wrapper);
      }

      if (template) {
        template = template.replace(/\/\*\*[\s\S]*?\*\//, "").replace(/<!--[\s]*?-->/, "");
        if (placeholder) {
          $(placeholder, wrapper).replaceWith(template);
        } else {
          $(wrapper).append(template);
        }
      }

      return element ? $(element, wrapper)[0] : $(wrapper).children(":last")[0];
    }

  };

  return dom;

});
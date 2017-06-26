/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals define, $*/

define(function (require) {
  "use strict";

  var
    Events = require("Events"),
    dom    = require("dom");


  function Class(options) {

    this.options = $.extend(true, {
      "element":          null,
      "placeholder":      null,
      "wrapper":          null,
      "template":         null,
      "values":           {},
      "dataSource": {
        "read": {
          "url":          null,
          "type":         "GET",
          "dataType":     "json",
          "data":         null
        },
        "update": {
          "url":          null,
          "type":         "POST",
          "dataType":     "json",
          "contentType":  "application/json",
          "data":         null
        }
      }
    }, this.options || {}, options || {});

    this.values = {};

    this.initialize();
  }

  Class.extend = function (Constructor) {
    var key, prototype;
    prototype = Object.create(this.prototype);
    for (key in Constructor.prototype) {
      if (Constructor.prototype.hasOwnProperty(key)) {
        prototype[key] = Constructor.prototype[key];
      }
    }
    Constructor.prototype = prototype;
    Constructor.extend = Class.extend;
    return Constructor;
  };

  Class.prototype = {

    initialize: function () {
      this.events = new Events();
      this.initializeView();
      this.setValues(this.options.values || {});
    },

    initializeView: function () {
      if (!this.element && (this.options.element || this.options.template)) {
        this.element = dom.appendView(this.options);
      }
    },

    getValue: function (name) {
      return this.get(name);
    },

    setValue: function (name, value) {
      var values = {};
      values[name] = value;
      return this.setValues(values);
    },

    getValues: function () {
      return this.values;
    },

    setValues: function (values) {
      var options = this.options.values || {};

      $.each(values, function (name, value) {
        if (value === null && options[name] !== undefined) {
          values[name] = options[name];
        }
      });

      return this.set(values, this.values);
    },

    resetValues: function () {
    },

    updateView: function () {
    },

    get: function (name, defaultValue, context) {
      var key;
      name = name.split(".");
      key  = name.shift();
      context = context || this.values;
      if (name.length !== 0 && context[key]) {
        return this.get(name.join("."), defaultValue, context[key]);
      }
      return context[key] === undefined || context[key] === undefined === null ? defaultValue : context[key];
    },

    set: function (values, context) {
      var changes = null;
      values  = values || {};
      context = context || this.values;
      if (typeof context === "string") {
        this.values[context] = this.values[context] || {};
        context = this.values[context];
      }
      $.each(values, function (name, value) {
        if (value && typeof value === "object" && !$.isArray(value) && context[name]) {
          value = this.set(value, context[name]);
          if (value) {
            changes = changes || {};
            changes[name] = value;
          }
        } else {
          if (value !== context[name]) {
            context[name] = value;
            changes = changes || {};
            changes[name] = value;
          }
        }
      }.bind(this));
      return changes;
    }

  };

  return Class;

});

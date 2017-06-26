/**
 * @author: jevgeni.virves@gmail.com
 * @since: 2017-06-26
 */

/*globals require*/

require.config({
  "baseUrl":       "app/js",
  "urlArgs":       null,
  "waitSeconds":   300,
  "supressErrors": false,
  "paths": {
    "app":          "app",
    "jquery":       "../../vendors/jquery/jquery-3.2.1.min",
    "css":          "../../vendors/require/css.min",
    "text":         "../../vendors/require/text.min",
    "json":         "../../vendors/require/json.min"
  },

  "shim": {
    "app":          { "deps": [ "jquery" ] }
  }

});

require(["app"]);

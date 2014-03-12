/* global alert, $, _, couchr */

$(function () {
    'use strict';

    var getConfig = _.partial(couchr.get, '/_api/plugins/plugin%2Fmoin');
    var setConfig = _.partial(couchr.put, '/_api/plugins/plugin%2Fmoin');

    function updateConfig(obj, callback) {
        getConfig(function (error, doc) {
            if (error) {
                // ignore note found errors
                if (error.status !== 404) {
                  return alert(error);
                }

                doc = {config: {}};
            }
            doc.config = _.extend(doc.config, obj);
            setConfig(doc, callback);
        });
    }

    // set initial form values
    getConfig(function (error, doc) {
        var property;
        if (error) {
            // ignore note found errors
            if (error.status !== 404) {
              return alert(error);
            }

            doc = {config: {}};
        }
        for (property in doc.config) {
          $('[name="'+property+'"').val(doc.config[property]);
        }
    });

    // save config on submit
    $('#moinForm').submit(function (event) {
        var cfg = {};
        event.preventDefault();

        $('#moinForm [name]').each(function() {
          var name = this.name;
          cfg[name] = this.value;
        });

        updateConfig(cfg, function (error) {
            if (error) {
                return alert(error);
            }
            else {
                alert('Config saved');
            }
        });
        return false;
    });

});

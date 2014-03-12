'use strict';

var Gauges = require('node-gauges');
var async = require('async');

var getTemplate = require('../../lib/get_template');
var template = getTemplate('gauges');


function gauges (hoodie, config, callback) {
  var client = Gauges.createClient(hoodie.config.get('gauges.apikey'));
  var day = config.since;

  client.gauges(function(error, data) {
    var gauges;
    var gaugesIds;

    if (error) {
      return callback(error);
    }

    // http://get.gaug.es/documentation/reference-listing/gauges/
    try {
      gauges = JSON.parse(data).gauges;
      gaugesIds = gauges.map(function(g) {return g.id; });
    } catch(err) {
      console.log('JSON.parse error 1');
      console.log(data);
      return callback(err);
    }

    async.map(gauges, function(gauge, callback) {
      client.referrers(gauge.id, {date: day}, function(error, result) {
        if (error) {
          return callback(error);
        }

        try {
          gauge.referrers = JSON.parse(result).referrers;
          gauge.referrers = gauge.referrers.splice(0, 10);
          callback();
        } catch(err) {
          console.log('JSON.parse error 2');
          console.log(result);
          return callback(err);
        }
      });
    }, function(error) {
      if (error) {
        return callback(error);
      }

      callback(null, {
        name: 'gauges',
        text: template(gauges),
        data: gauges
      });
    });
  });
}

module.exports = gauges;

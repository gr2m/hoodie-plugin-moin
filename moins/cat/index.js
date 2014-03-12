'use strict';

var request = require('request');
var url = require('url');
var getTemplate = require('../../lib/get_template');
var template = getTemplate('cat');

// expects config:
//
//     since: '2014-01-01'
//     organizationName: 'hoodiehq'
//

function cat(hoodie, config, callback) {

  request('http://thecatapi.com/api/images/get?format=src&type=gif&category=funny', function (error, response/*, body*/) {
    var obj = {
      url: url.format(response.request.uri)
    };

    callback(null, {
      name: 'cat',
      text: template(obj),
      data: obj
    });
  });
}

module.exports = cat;

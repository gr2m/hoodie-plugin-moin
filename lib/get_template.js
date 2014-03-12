'use strict';

var fs = require('fs');
var handlebars = require('handlebars');
var path = require('path');

function getTemplate (name) {
  var filePath = path.resolve(__dirname, '../moins/'+name+'/template.hbs');
  return handlebars.compile(fs.readFileSync(filePath).toString());
}

module.exports = getTemplate;

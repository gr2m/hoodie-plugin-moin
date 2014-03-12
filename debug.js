'use strict';

var async = require('async');

// MOINs
var andbang = require('./moins/andbang');
var cat = require('./moins/cat');
var gittip = require('./moins/gittip');
var twitter = require('./moins/twitter');
var gauges = require('./moins/gauges');
var githubOrganizationIssues = require('./moins/github-organization-issues');
var moins = [cat, gittip, twitter, andbang, gauges, githubOrganizationIssues];

var testTask = {
  since: '2014-01-26',
  organizationName: 'hoodiehq'
};

function run (moin, callback) {
  moin(testTask, callback);
}

moins = [andbang];
async.map(moins, run, function(error, results) {
  if(error) {
    console.log('ERROR');
    return console.log(error);
  }

  console.log(results);
});

// cat(testTask,function(error, result) {
//   if(error) {
//     console.log('ERROR');
//     return console.log(error);
//   }

//   console.log('DONE');
//   console.log(result);
// });

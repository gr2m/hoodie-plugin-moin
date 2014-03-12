'use strict';

// Hoodie Moin Task worker.
// pickes up new moin tasks, collects data
// and writes it into todays moin object.

var async = require('async');
var addOrUpdate = require('./lib/add_or_update');
var sendMoinmail = require('./lib/send_moinmail');

// MOINs
// var andbang = require('./moins/andbang');
var cat = require('./moins/cat');
var gittip = require('./moins/gittip');
var twitter = require('./moins/twitter');
var gauges = require('./moins/gauges');
var githubOrganizationIssues = require('./moins/github-organization-issues');
var moins = [cat, gittip, twitter, /*andbang, */gauges, githubOrganizationIssues];

module.exports = function(hoodie, doneCallback) {
  hoodie.task.on('mointask:add', handleNewMoinTask);

  function handleNewMoinTask(dbName, moinTask) {
    console.log('new moin task!', moinTask);

    var onSuccess = function(obj){
      if (moinTask.sendEmail) {
        sendMoinmail(hoodie, obj);
      }
      hoodie.task.success(dbName, moinTask);
    };
    var onError = function(error) {
      console.log(error);
      hoodie.task.error(dbName, moinTask, error);
    };

    function run (moin, callback) {
      moin(hoodie, moinTask, callback);
    }

    async.map(moins, run, function(error, results) {
      if (error) {
        return onError(error);
      }
      var db = hoodie.database(dbName);
      var id = moinTask.since.replace(/-/g, '');
      var obj = {
        results: results
      };

      console.log('creating moin object ...');
      addOrUpdate(db, 'moin', id, obj, function(error) {
        if (error) {
          return onError(error);
        }

        obj.id = id;
        console.log('moin object created ...');
        onSuccess(obj);
      });
    });

  }

  doneCallback();
};

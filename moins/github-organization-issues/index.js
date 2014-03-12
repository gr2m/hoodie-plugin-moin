'use strict';

var github = require('octonode');
var parseIssue = require('../../lib/github/parse_issue');
var getTemplate = require('../../lib/get_template');
var template = getTemplate('github-organization-issues');

// expects config:
//
//     since: '2014-01-01'
//     organizationName: 'hoodiehq'
//
function githubOrganizationIssues(hoodie, config, callback) {
  var since = config.since;
  var client = github.client();
  var search = client.search();

  search.issues({
    q: 'user:'+config.organizationName+'+updated:'+[since, since].join('..'),
    per_page: 100
  }, function(error, results) {

    if (error) {
      return callback(error);
    }

    var issues = results.items.map( parseIssue );
    var obj = {};

    obj.closedIssues = issues.filter(function(issue) {
      return issue.closedAt > since;
    });
    obj.openedIssues = issues.filter(function(issue) {
      return issue.createdAt > since && !issue.closedAt;
    });

    callback(null, {
      name: 'github-organization-issues',
      text: template(obj),
      data: obj
    });
  });
}

module.exports = githubOrganizationIssues;

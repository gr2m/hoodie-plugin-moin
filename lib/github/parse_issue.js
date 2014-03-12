'use strict';

var parseUser = require('./parse_user');
var parseLabels = require('./parse_labels');

function parseIssue (issue) {
  // { url: 'https://api.github.com/repos/hoodiehq/hoodie.js/issues/221',
  //   labels_url: 'https://api.github.com/repos/hoodiehq/hoodie.js/issues/221/labels{/name}',
  //   comments_url: 'https://api.github.com/repos/hoodiehq/hoodie.js/issues/221/comments',
  //   events_url: 'https://api.github.com/repos/hoodiehq/hoodie.js/issues/221/events',
  //   html_url: 'https://github.com/hoodiehq/hoodie.js/pull/221',
  //   id: 25943785,
  //   number: 221,
  //   title: 'hoodie.task.add doesn\'t trigger start event',
  //   user:
  //    { login: 'gr2m',
  //      id: 39992,
  //      avatar_url: 'https://gravatar.com/avatar/24fc194843a71f10949be18d5a692682?d=https%3A%2F%2Fidenticons.github.com%2Fffacbb7db90628bfcc8be667616dfcc7.png&r=x',
  //      gravatar_id: '24fc194843a71f10949be18d5a692682',
  //      url: 'https://api.github.com/users/gr2m',
  //      html_url: 'https://github.com/gr2m',
  //      followers_url: 'https://api.github.com/users/gr2m/followers',
  //      following_url: 'https://api.github.com/users/gr2m/following{/other_user}',
  //      gists_url: 'https://api.github.com/users/gr2m/gists{/gist_id}',
  //      starred_url: 'https://api.github.com/users/gr2m/starred{/owner}{/repo}',
  //      subscriptions_url: 'https://api.github.com/users/gr2m/subscriptions',
  //      organizations_url: 'https://api.github.com/users/gr2m/orgs',
  //      repos_url: 'https://api.github.com/users/gr2m/repos',
  //      events_url: 'https://api.github.com/users/gr2m/events{/privacy}',
  //      received_events_url: 'https://api.github.com/users/gr2m/received_events',
  //      type: 'User',
  //      site_admin: false },
  //   labels:
  //    [ { url: 'https://api.github.com/repos/hoodiehq/hoodie.js/labels/bug',
  //        name: 'bug',
  //        color: 'fc2929' } ],
  //   state: 'closed',
  //   assignee: null,
  //   milestone: null,
  //   comments: 0,
  //   created_at: '2014-01-20T20:19:24Z',
  //   updated_at: '2014-01-20T20:20:38Z',
  //   closed_at: '2014-01-20T20:20:38Z',
  //   pull_request:
  //    { html_url: 'https://github.com/hoodiehq/hoodie.js/pull/221',
  //      diff_url: 'https://github.com/hoodiehq/hoodie.js/pull/221.diff',
  //      patch_url: 'https://github.com/hoodiehq/hoodie.js/pull/221.patch' },
  //   body: '' }

  var issueUrl = issue.url.replace('https://api.github.com/repos/', '');

  return {
    id: issue.id,
    url: 'https://github.com/' + issueUrl,
    number: issue.number,
    title: issue.title,
    user: parseUser(issue.user),
    labels: parseLabels(issue.labels),
    assignee: parseUser(issue.assignee),
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    closedAt: issue.closed_at,
    body: '',
    comments: issue.comments,
    repo: issueUrl.replace(/\/issues\/\d+/, '')
  };
}

module.exports = parseIssue;
